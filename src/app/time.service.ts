import {Directive, ElementRef} from '@angular/core';
import { Injectable } from '@angular/core';
import {ChallengeComponent} from './challenge.component';
import { AlternativeKindness } from './alternativeHome/alternateKindnessView.component';


declare var $ : any;

@Directive({        
    providers: [ChallengeComponent, AlternativeKindness]
})

@Injectable()
export class TimeService  {
   
    constructor(
        private challengeComponent : ChallengeComponent
    ) {}
    

    /* 
    * RETURN TO MAIN
    * If Cal then slide up
    * If in settings then go back
    */
    returnMain(){
        // check if we're at top of page
        if( $(window).scrollTop() != 0){ // then in cal mode
            $('html, body').animate({scrollTop:0}, 'slow');
            $('.calView').fadeOut('fast');
        }

        if($('#settingsView').css('display') != 'none'){
            $('#sonnyIcon').show();   
            $(".settings").show().css("animation","settingsOutro 1s");

            setTimeout(() => {
                $(".settings").hide();        
            }, 500);  
        }
    }

    /*
    * BACK TO DONE
    */
    backToDone(){

      if($('#kindnessView').attr('kindnessComplete') == 'true'){
        $('.missionView').hide();
        $('.classicView').hide();

        // show done view
        $('#doneView').show();
        document.getElementById("doneView").className = "";  
        document.getElementById("doneView").className += " intro";
      }

      // $('.kindnessCal img').attr('src','./img/icons/caly.svg');

    }


    /*
    * Check for new day
    * If kindness generator or compassion flow true then don't reset app just return
    * Go through date array and compare dates with today's
    * If there isn't a match then:
      * Check if iteration is possible
    * If there is a match then:
      * Kindness has already been done today 
    * @param dayCheck - STRING - what view is currently present (kindnessView)
    */
    dayCheck(classname){
      
        // FUDGING - completion of kindness challenge       
        // localStorage.setItem("dateArray", '["15/9/2017", "14/9/2017", "13/9/2017"]');
        // localStorage.setItem("kindnessArray",'["Challenge 10","Challenge 9","Challenge 8"]');
        // localStorage.setItem("compassionChallenge","5");
        
        // FUDGING - kindness compassion to 10:       
        // localStorage.setItem("dateArray", '["6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017", "6/6/2017"]');
        // localStorage.setItem("kindnessArray",'["Challenge 10 this is a lot of data just to test it has been cut off","Challenge 9","Challenge 8","Challenge 7","Compassion 6","Compassion 5","Compassion 5","Compassion 3","Compassion 2","Compassion 1"]');

        /*
        * RESET MODE
        * If left on either compassion or kindness generator then resume from there
        * Disable the attr
        * Don't do rest of time service
        */
        function resetMode(mode){
            if($('#' + mode).attr('active') == 'true'){
                $('#' + mode).show();
                return;
            }
        }
        resetMode('kindness-generator');
        resetMode('compassion-flow');
        this.returnMain();
        $('.goToCal,.orTxt, .intentionTask, .completeContainer').show();

        // update clock time to midnight
        $('.hoursLeft').html(24 - this.returnTime());

        // always start as nice guy
        $('.narcissimTxt').html('Tired of being nice?');
        $(".settingsMenuItem img").attr('src','./img/icons/sonny.png');
        $(".kindnessCal").show();
        $('.speechDiv').show();

        $('#sonnyGif').attr('mentioned','true');

        $(".square-radio").removeClass("square-radio--clicked");

        // don't go to custom kindness screen
        $('#kindnessView').attr('customKindness','false');

        // change #sonnyIcon
        $('#sonnyIcon img').attr('src','./img/icons/more.png');
        $('#sonnyIcon img').css('margin-top','0px');
        $('#sonnyIcon p').html('more');
        
        // sonny icon when clicked goes to settings
        $('#sonnyIcon').attr('settings','true');
        
        // change .kindnessCal
      //  $('.kindnessCal img').attr('src','./img/caly/chatIdle.png');
       $('.kindnessCal p').html('check progress');
       $('.kindnessCal .menuItem').css('padding','2px 5px');
      //  $('.kindnessCal img').css('marginTop',($('.goToCal').height()  ) - ($('.goToCal img').height()  ));
       // add class to calander
       $('.kindnessCal .menuItem').addClass('goToCal');       
       // sonny click goes to calander
       $('.kindnessCal .menuItem').attr('goCal','true');
        
        if(!localStorage.getItem("kindnessArray")){
            var emptyArr = [],
            dateArray = [];            
        } 
        else{
            dateArray = JSON.parse(localStorage.getItem("dateArray"));
        }
        
        $(".sonnyContainer").attr("destroyBubble","false");                       
        var matched = false;
        
        for (var i = 0; i <= dateArray.length; i++) {          
            if(dateArray[i] == this.formatDateNow() && !matched){
                // console.log('done view');
                $('#kindnessView').attr('kindnessComplete','true');
                matched = true;
                
                // if theme undefined then go to summer
                var theme = $(".skipContainer").attr('theme');
                if(!theme){                    
                    $(".skipContainer").attr('theme','summer');                 
                } 
                
                // force the screen to #doneView
                $('#kindnessView').hide();   
                
                // remove kindness view
                document.getElementById(classname).className = "";  
                document.getElementById(classname).className += " outro";
                
                this.backToDone();

                // $("doneView").attr('welcome','true');
                $('#kindnessView').fadeOut();
                return;
           }
           else if(!matched){ // new day or regular day  
                // console.log('kindness view');          
                $('#kindnessView').attr('kindnessComplete','false');
                matched = true;  
                    
                // go to summer theme
                $(".skipContainer").attr('theme','summer'); 
                
                // remove kindness view                    
                document.getElementById(classname).className = "";  
                document.getElementById(classname).className += " outro";

                // remove done view
                $('#doneView').hide();
                // $('#kindnessView').show();
                document.getElementById("kindnessView").className = "";  
                document.getElementById("kindnessView").className += " intro";
                $("#kindness-generator").show();
                document.getElementById("kindness-generator").className = "";  
                document.getElementById("kindness-generator").className += " intro";


                $(".compassionDay").attr('firstCompassion','true');

                // analytics as page one
                $('#sonnyGif').attr('onclick', 'analytics("Kindness_To_Do")').click(); 
                                
                var today = this.returnDate(); // new Date();
                var dd = today.getDate();
                var hasfailed = this.challengeComponent.checkFailure(dateArray, dd);
                if(hasfailed != true){ // user has failed
                    localStorage.setItem("compassionIteration","false");    
                }    
                localStorage.setItem("compassionIteration","true")                                            
            }             
        }
    }
    
    returnDay(){
       return new Date().getDay();
    }
    
    returnTime(){
       return new Date().getHours();
    } 
    
    returnDate(){
       return new Date();
    }   
    
     /*
    * Format date.now() into day/month/year
    */
    formatDateNow(){
     var today = this.returnDate(); // new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();
    
    if(dd<10){
        dd=0+dd;
    } 
    if(mm<10){
        mm=0+mm;
    } 
    
    return mm+'/'+dd+'/'+yyyy; 
    }

   
}