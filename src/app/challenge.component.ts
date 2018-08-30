import {Component, OnInit,  ElementRef, Input } from '@angular/core';
declare var $ : any;


@Component({
  selector: 'challenge-component',
  templateUrl: '',
  styleUrls: [''],
  directives: [],
  providers: []
})

export class ChallengeComponent implements OnInit{
    
    constructor(){}

    ngOnInit(){}
    
   /* CHECK FAILURE
   * if user has failed compassion challenge
   * check if user is even doing challenge
   * ensure you cannot fail day one
   */
   checkFailure(dateArray,today){
    // you cannot fail day one  
    var userGrade;
    if(localStorage.getItem("compassionChallenge") == '1'){
        userGrade = false;
    }
    for(var i = 0; i < dateArray.length; i++){        
        today;                       
        dateArray[i];
        
        // remove char before date day
        var str = dateArray[i];
        str = str.substring(str.indexOf("/") + 1);

        // remove char after date day
        str = str.split("/").shift();
        
        if(today == 1){
          localStorage.setItem("compassionIteration",'true');
          userGrade = false;

        }

        if(parseInt(str) + 1 == today || parseInt(str) == today){
          localStorage.setItem("compassionIteration",'true');
          userGrade = false;
        }

        if(userGrade == false){
          localStorage.setItem("compassionIteration","false");
        }
        else{
          localStorage.setItem("compassionIteration","true");
        }
      }  
      
      this.stopCompassion();
                   
   }
   
   /*
   * ITERATE COMPASSION (CHALLENGE NUMBER)   
   * Check if on compassion challenge
   * If compassion challenge then iterate the number
   * Compassion iteration is now not possible
   * Re-initiliase Compassion
   */
   iterateCompassion(){      
      if( localStorage.getItem("compassionIteration") != "true"){
          return;
      }
      var compassionNum = this.checkCompassion(); 
      if(compassionNum){
        var iterateNum = parseInt(compassionNum) + 1;
        localStorage.setItem("compassionChallenge", String(iterateNum));
        localStorage.setItem("compassionIteration",'false');
        this.intCompassion();
      }
   }

   /*
   * REVERT SUCCESS
   * Cosmetic only
   * Kindness challenge iterates on success
   * This needs to wind back the counter
   */
   revertSuccess(){
    var compassionNum = this.checkCompassion(); 
    if(compassionNum && $('#kindnessView').attr('kindnessComplete') ==  'true'){
      var compassionTxt = String(parseInt(compassionNum) - 1);
      $(".compassionNum").show().html(compassionTxt);   
    }    
   }
   
   /*
   * CHECK COMPASSION
   * Check if compassion local storage
   * Return false if compassion challenge off
   * Return compassion day otherwise
   */
    checkCompassion(){
        
        var compassionNum = localStorage.getItem("compassionChallenge");
        // console.log('check compassion: ');
        // console.log(compassionNum);
        if(compassionNum == null || compassionNum == "null" || compassionNum == "no"){
            $(".compassion-radio").removeClass("compassion-radio--clicked");
            return false;
        }
        else{ 
            // if( $('#kindnessView').attr('kindnessComplete') ==  'true' ){ // kindness done
            //     return parseInt(compassionNum) - 1;
            // }
            return compassionNum;
        }
    }
   
   /*
    * IS COMPASSION(?)    
    * Check local storage for compassion challenge
    * if true - remove square radio in settings 
    * If false return
    * If true change:
    * .challengeTxt, 
    * heart image (#kindnessText img) to cup
    * append compassionNum to the top of cup image
    */
    intCompassion(){
      var compassionNum = this.checkCompassion(); 
      var compassionSettings = parseInt(compassionNum);
      $('#speechBubble').css('opacity','1');
      $('.sonnyDialogue').show();
      
      if(compassionSettings != 1){
          compassionSettings = compassionSettings - 1; 
      }      
      
      if(compassionNum){         
        $("#kindnessText img").attr("src","./img/icons/achievement.png");
        $(".challengeTxt").html('Stop Compassion Challenge on day ' + compassionSettings);

        if( $('#kindnessView').attr('kindnessComplete') ==  'true' ){ // kindness done
            $(".compassionNum").show().html(compassionSettings);
        }
        else{
            $(".compassionNum").show().html(compassionNum);
        }

        
        $(".compassionDay").show();
        /* CHANGE THE MARGIN 0F .compassionNum
        * If .compassionNum == 1 then margin-left  = 14.5
        * If .compassionNum == 10 then margin-left  = 5.5
        * If .compassionNum == anything else then margin-left  = 11.5
        */
        
        if(compassionNum == '1'){
            $(".compassionNum").css('margin-left','7.5px');
        }
        else if(compassionNum == '10'){
            $(".compassionNum").css('margin-left','0.5px');
        }
        else{
            $(".compassionNum").css('margin-left','4.5px');
        }
     } 
  }
   
    
  /*
   * COMPASSION PHRASES
   * Set compassionMsg to shown
   * Switch statement of phrases that Sonny should say
   * @return STRING phrase - what dialogue sonny should be saying
   */
   compassionPhrases(num){
    
     localStorage.setItem("compassionMsg","shown"); 
     
     $(".thankyou").hide(); // by default hide
     
    if($(".compassionDay").attr('firstCompassion') == 'true' || localStorage.getItem("compassionIteration") == "true"){ // compassion messages
      
     // Keep track on how far into compassion challenge people get 
     $('#sonnyGif').attr('onclick', 'analytics("Compassion_Doing_' + num + '")').click(); 
     $(".compassionDay").attr('firstCompassion','false');
    //  console.log('Compassion not done');
     switch(parseInt(num)) {
        case 1:
          return ['Trying out the Compassion Challenge are we?','The challenge is to record 5 consecutive kindnesses!','This is Day 1. Good luck!'];
        case 2:
            return ['Day 2 of the challenge!! Good going champ!'];
        case 3:
            return ['Day 3 on the Compassion Challenge!!','The kindness is strong in this one..'];
        case 4:
            return ['Day 4 on the Compassion Challenge!!','Almost there! You got this!!'];
        case 5:
            $(".thankyou").show();
            $(".thankyou").attr('challengeComplete','true');
            return ['Day 5!! Last day of the challenge!','Perform one more kindness to reap a super nifty reward!!'];
        // case 6:
        //     return ['Excellent! You\'re on day 6!','Keep at it, you\'re doing great!'];
        // case 7:
        //     return ['Day 7! Almost there buddy!','Just three days left!!'];
        // case 8:
        //     return ['Day 8!! ];
        // case 9:
        //     return ['My gosh!! You got one day left!!','The Compassion Challenge is coming to an end.','I hope you got a lot out of it!!']; 
        // case 10:            
        //     return ['Compassion Challenge complete!!','Fill in today\'s kindness to reap the reward!'];
        case 6:
           $(".challengeTxt").html('Start compassion challenge');
           $(".compassion-radio").toggleClass("compassion-radio--clicked");
           localStorage.setItem("compassionChallenge","no");        
           $("#kindnessText img").attr("src","./img/icons/heart.png");
           $(".compassionDay,.compassionNum").hide();  
           $(".thankyou").show();
           $(".thankyou").attr('challengeComplete','true');
           return ['Thanks again for completing the Compassion Challenge!','It really means a lot that you gave the app your time.','Feel free to try the challenge again anytime!!'];
       }
       
       // set compassion to do attr for analytics
       $('#sonnyIcon').attr('analytics', 'compassion_done'+num);
    }

    else{  
        //,'Nice work spreading that positive karma!!' 'Looks like you\'re picking up a good rhythm!!',
        // Keep track on how far into compassion challenge people get 
        var analytics = parseInt(num) - 1;
        $('#sonnyGif').attr('onclick', 'analytics("Compassion_Complete_' + analytics + '")').click();        
        console.log('Compassion done');
        switch(parseInt(num)) {        
        case 1:          
          return ['Look\'s like you\'ve completed Day 1 of the compassion challenge!!','Hopefully, the first day of ten!!'];
        case 2:
          return ['Day one of the compassion challenge accomplished!!'];
        case 3:
          return ['Second day complete, great job friend'];
        case 4:
          return ['Two more kindnesses and then this Challenge is done and dusted!!']; 
        case 5:
            // return ['Day three down!!'];    
          return ['Day four complete! High-five amigo!!','At least, I would give you a high-five if someone had drawn me hands...','Anyway, good job friend. You\'re doing great!!'];
        case 6:
            $(".challengeTxt").html('Start compassion challenge');
            $(".compassion-radio").toggleClass("compassion-radio--clicked");
            //localStorage.setItem("compassionChallenge","no");        
            $("#kindnessText img").attr("src","./img/icons/heart.png");
            $(".compassionDay,.compassionNum").hide();  
            $(".thankyou").show();
            $(".thankyou").attr('challengeComplete','true');
          return ['Wow!! You did it!!','Click the Thank You to receive a special thanks!!'];
        // return ['You\'re four days in','It doesn\'t look like you\'ve even broken a sweat']
        // case 7:
        //     return ['Four kindnesses left!!','Stick with it!!'];
        // case 8:
        //     return ['Day seven complete! Slick work friend', 'Three more kindnesses left!!'];
        // case 9:
        //     return ['Two more kindnesses and then this Challenge is done as dusted', 'Nice going budbud!!']; 
        // case 10:
        //     return ['Last kindness tomorrow!','Let\'s make it one to remember!!'];
        // case 11:
        //    $(".challengeTxt").html('Start compassion challenge');
        //    $(".compassion-radio").toggleClass("compassion-radio--clicked");
        //    //localStorage.setItem("compassionChallenge","no");        
        //    $("#kindnessText img").attr("src","./img/icons/heart.png");
        //    $(".compassionDay,.compassionNum").hide();  
        //    $(".thankyou").show();
        //    $(".thankyou").attr('challengeComplete','true');
        //    return ['Wow!! You did it!!','Click the Thank You to receive a special thanks!!'];
       }       
     }
   }
   
   /*
   * START COMPASSION (CHALLENGE)
   * Ask user if they really want to stop with alert
   * If no return
   * If yes set storage to 'no'
   * Reset day so kindness can be performed
   */
   startCompassion(){
    // start compassion challenge
    $(".compassion-radio").toggleClass("compassion-radio--clicked");
    localStorage.setItem("compassionIteration",'true');
    localStorage.setItem("compassionChallenge","1");
    
    this.intCompassion();
    $('.dailyCompassion').click(); // notifications
    $(".compassionDay").attr('firstCompassion','true');
   }
   /*
   * STOP COMPASSION (CHALLENGE)
   * Stop all that compassion malarky
   * Get sonny to commxent
   */
   stopCompassion(){
     var doingCompassion = this.checkCompassion(); 
     if(doingCompassion == false){
       return;
      }    
      localStorage.setItem("compassionChallenge", "no"); 
      $(".challengeTxt").html('Start compassion challenge');
      $(".compassion-radio").toggleClass("compassion-radio--clicked");
      localStorage.setItem("compassionChallenge","no");        
      $("#kindnessText img").attr("src","./img/icons/heart.png");
      $(".compassionDay,.compassionNum").hide();   
      // get sonny to comment
      $('.sonnyDialogue').attr('challengeFailed','true');    
      $('.weeklyCompassion').click(); // notifications
   }
}
