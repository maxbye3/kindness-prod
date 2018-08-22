import {Component} from '@angular/core';
import {TourComponent } from './tour.component';
import {KindnessGenerator} from './generator/kindness-generator.component'
import { Cordova } from './cordova.directive';
import { ThemeComponent } from './theme.component';

declare var jQuery: any;


@Component({
    selector: 'intro-screen-component',
    templateUrl: 'app/intro-screen-component.html',
    styleUrls: ['app/intro-screens.component.css'],
    providers: [ ThemeComponent, TourComponent, Cordova, KindnessGenerator ]
})

export class IntroScreens {

// Welcome, this app helps you be more mindful of your actions by getting you to record a daily kindness.
// Your data is private, stored only on your device. So it's not about trying to be the world's nicest person in the universe.
// Up for a challenge? Why not not try the 10 Day Compassion Challenge?
// No challenge, no problem. You can always choose to do it later. Try and rack up a daily combo of kindness anyway.
// Excellent, I like your spirit. Try and rack up a daily combo of kindness, good luck amigo.

   public challengeAccepted;   
   private introStep;
   private idleInterval = [];

   constructor(
       private tourComponent : TourComponent,
       private cordova : Cordova,
       private themeComponent : ThemeComponent,
       private kindnessGenerator : KindnessGenerator
   ) {    
     this.introStep = 1; // set initial tour step      
   }

  /*
   * WHERE TO START
   * Decides whether to start with main suggestion mode
   * Or suggestion already selected 
   */
  _startWhere(){

    
    jQuery(".sonnyContainer").attr("present",'false');
    // var customKindness = localStorage.getItem('cutomIntention');
    // var intentionNum = parseInt(localStorage.getItem('intentionNum'));
    // var intention = localStorage.getItem('intention');
    // var isIntentionCustom = localStorage.getItem('isCustom');
    if(jQuery('#kindnessView').attr('kindnessComplete') != 'true'){
      var intention = localStorage.getItem('intention');
      if(intention == 'true'){              
        document.getElementById('kindnessView').className = "";  
        document.getElementById('kindnessView').className += " intro";
      }
      else{ // go to suggestion mode
        jQuery('#doneView').hide()
        this.kindnessGenerator.intGenerator();
        jQuery("#kindnessView").hide();
      }
    }
  }


   /*
   * SKIP
   * Skips the intro screens
   * Same function plays at end of intro screens
   * Don't want to interfere with compassion challanege
   * @param BOOL hasSkipped - mess with challenge
   */
   skipButton(hasSkip){

       if(hasSkip){
         // set compassion challenge to no
         localStorage.setItem("compassionChallenge", "no"); 
         jQuery('.weeklyCompassion').click(); // start notifications    

       }       
       jQuery(".introContainer").hide();  
       this.cordova.onResume();
       this._startWhere();
   }
   
   iosProb(){
     this.themeComponent.setTheme('summer');
   }
   /*
   * INT INTRO
   * Determines whether to launch intro screen or compassion screens
   */
   intIntro(){


     this.iosProb();
    
      if( jQuery(window).scrollTop() != 0){ // then in cal mode
            jQuery('html, body').animate({scrollTop:0});
      }

      var introNecessary = localStorage.getItem("kindnessArray")
      if(introNecessary == null || introNecessary == ""){
        jQuery('#introScreen').css({'-webkit-appearance': 'none','box-shadow':'0 0 0 '+ jQuery(window).height() +'px #4caf50;','-webkit-box-shadow':'0 0 0 '+ jQuery(window).height() +'px #4caf50', '-moz-box-shadow' : '0 0 0 '+ jQuery(window).height() +'px #4caf50'});
      }
      else{
         jQuery(".introContainer").hide(); 
         this.cordova.onResume(); 
         this._startWhere();         
      }
   }

   /*
   * CHALLENGE EXPLAINED
   * Changes the text of screen 3 to explain better what compassion challenge is
   * Removes btn 3
   */
   challengeExplained(){       
       jQuery(".btn3").hide();       
       // change text
       document.getElementById("introTxt").innerText = "Challenge yourself to perform 5 acts of kindness across 5 days to unlock unkind/greedy mode";           
   }
   
   
   sonnyAnimations(){
            // analytics as introduction page
            var sonnyImg = <HTMLImageElement>document.getElementById("sonnyIntro");  
            jQuery("#sonnyIntro").opacity = 0;
            sonnyImg.src = "./img/sonny/intro.gif";
            
            setTimeout(() => { 
              //console.log("sonny's intro");
              jQuery("#sonnyIntro").opacity = 1;
              sonnyImg.src = "./img/sonny/intro.gif"; 
            
              // Sonny bounce            
              setTimeout(() => {  
                  if(jQuery("#sonnyIntro").attr('animation') != 'false') 
                  sonnyImg.src = "./img/sonny/bounce.gif"; 
              }, 2500);
              
              setTimeout(() => {  
                  if(jQuery("#sonnyIntro").attr('animation') != 'false') 
                  sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
              }, 6700);
              
              setTimeout(() => {
                  if(jQuery("#sonnyIntro").attr('animation') != 'false') 
                  sonnyImg.src = "./img/sonny/idle-look.gif?t=" + new Date().getTime();
              }, 10700); //idle
              
              // Sonny idle animation
              setTimeout(() => {
                  if(jQuery("#sonnyIntro").attr('animation') != 'false'){
                      sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
                      this.idleInterval[4] = setTimeout(() => {
                          sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
                      }, 6000); 
                  }
              }, 15700);
            }, 1000);
   }
   
   btnClick1(){ 
       this.introStep++; 
       switch(this.introStep) {
            case 1:
                    this.intro();
                break;
            case 2:
                    this.intro();
                break;
            case 3:
                    this.intro();
                break;
            case 4:
                    this.intro();                     
                break;
            case 5:
                // turn weekly notificatons on
                this.intro();
                jQuery('.weeklyCompassion').click();           
            break;
            case 6:
                    this.challengeAccepted = true;
                    localStorage.setItem("compassionChallenge", "1");
                    this.intro();    
                    jQuery('.dailyCompassion').click();          
                break;
             case 7:
                    this.tourComponent.intTour();               
                break;  
            case 8:
                    this.tourComponent.intTour();                 
                break;    
        }        

   }
   
   btnClick2(){
         this.introStep++;  
        switch(this.introStep) {
        case 1:
             this.intro();
            break;
        case 2:
             this.intro();
            break;
        case 3:
            this.challengeAccepted = false;
             this.intro();            
            break;
        case 4:
             this.intro();            
            break;
        case 5:
            // turn weekly notificatons off (just do nothing)
            this.intro();            
        break;

        case 6:
             this.intro();
             localStorage.setItem("compassionChallenge", "no");
            break;
        case 7:
            this.skipButton(false);
            break;
        case 8:
            this.skipButton(false);
            break;  
            
         case 9:
            this.skipButton(false);
            break;  
          
    }
   
   }

   intro(){
       
    //console.log("intro step: "+this.introStep);
   
    jQuery(".introContainer").show();        
    
    switch(this.introStep) {
       case 2:
            // stop sonny animation
            jQuery("#sonnyIntro").attr('animation','false'); 
            jQuery("#otherChars").show();
            this.introStep = 2;
            jQuery(".btn").hide().html("Got it");
            
            // clear all the previous animations
            for (var i = 0; i <= 4; i++) { 
              clearTimeout(this.idleInterval[i]);
            }
            
            // background css
            document.getElementById("charContainer").style.background = "linear-gradient(#D6EDED,#EAF7FF,#FFF)";
            document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw #C8523B";
            jQuery('.iosFix').css('background','#C8523B');
             
            // change text
            document.getElementById("introTxt").innerText = "None of us have enough time, I get it. But performing a kindness is quick, simple and makes you feel pretty good. What's to lose?";            
            // document.getElementById("introTxt").innerText = "In this app, There are over one hundred ideas. Ya' know, if you're ever stuck or bored or whatever ";
            
            // sonny exits  
            var sonnyImg = <HTMLImageElement>document.getElementById("sonnyIntro");          
            sonnyImg.src = "./img/sonny/exit.gif?t=" + new Date().getTime(); 
      
            var calImg = <HTMLImageElement>document.getElementById("otherChars"); 
            
            jQuery("#otherChars").css({"width":"215px","margin-left":"-150px","margin-top":"30px"}); 
            var timeout = 1000;
            // caly animation
            this.idleInterval[0] = setTimeout(() => {
              
              calImg.src = "./img/caly/intro.gif?t=" + new Date().getTime();
            }, 1405 + timeout); 
            
            this.idleInterval[0] = setTimeout(() => {
           
                //   jQuery("#sonnyIntro").hide();   

              jQuery("#otherChars").css({"margin-left":"115px"});
              
              calImg.src = "./img/caly/intro.gif?t=" + new Date().getTime();
              jQuery("#otherChars").attr('onPhone','false');
            }, 1500 + timeout); 
            this.idleInterval[1] = setTimeout(() => {  
              jQuery(".btn").fadeIn();
              calImg.src = "./img/caly/blink.gif?t=" + new Date().getTime(); 
            }, 3000 + timeout);
            this.idleInterval[2] = setTimeout(() => {  
              clearTimeout(this.idleInterval[5]);
              calImg.src = "./img/caly/idle.gif?t=" + new Date().getTime(); 
            }, 4000 + timeout);
            this.idleInterval[3] = setTimeout(() => { 
              clearTimeout(this.idleInterval[6]); 
              calImg.src  = "./img/caly/phone-intro.gif";
              jQuery("#otherChars").attr('onPhone','true');
            }, 8500 + timeout);
            this.idleInterval[4] = setTimeout(() => {
              clearTimeout(this.idleInterval[7]);  
              calImg.src  = "./img/caly/phone.gif"; 
            }, 14000 + timeout);
        break;
        case 3:
             // clear all the previous animations
            for (var i = 0; i <= 4; i++) { 
              clearTimeout(this.idleInterval[i]);
            }
  
            // background css
            document.getElementById("charContainer").style.background = "linear-gradient(#D6EDED,#EAF7FF,#FFF)";
            document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw #4caf50";
            jQuery('.iosFix').css('background','#4caf50');
            
            // change text            
            document.getElementById("introTxt").innerText = "Need ideas? There's over 100 packed into this app. Try your hand at the flow of compassion with audio exercises by Prof. Paul Gilbert.";
            // document.getElementById("introTxt").innerText = "Up for a challenge? Why not try the 10 Day Compassion Challenge?";

            jQuery(".btn").hide().html("Continue");

            var calImg = <HTMLImageElement>document.getElementById("otherChars");            
            // caly walks out
            var cupIntroTime;
            if(jQuery("#otherChars").attr('onPhone') == 'true'){ // caly on phone needs to get off
                calImg.src = "./img/caly/phone-outro.gif";
                cupIntroTime = 3500;
                setTimeout(() => {
                    calImg.src  = "./img/caly/intro.gif"; 
                    jQuery("#otherChars").css({"margin-left":"340px"}); // walks right
                }, 2500);
            }
            else { // if not on phone then walk out normally
                calImg.src  = "./img/caly/intro.gif"; 
                jQuery("#otherChars").css({"margin-left":"340px"}); // walks right
                cupIntroTime = 1000;
            }
            
            jQuery("#sonnyIntro").css({"margin-left":"250px"});

            // compasion cup
            this.idleInterval[0] = setTimeout(() => {
                jQuery('#otherChars').hide().css({'margin-left':'0px','margin-top':'0px'});
                jQuery("#star12").show();           
                jQuery("#sonnyIntro").css({"top":"25px","margin-left":"0px"});
                jQuery(".btn").fadeIn();

                this.idleInterval[1] = setTimeout(function(){ 
                    jQuery("#star12").fadeIn('slow');
                }, 3000);    
                var trophy = <HTMLImageElement>document.getElementById("sonnyIntro");                               
                trophy.src = "./img/icons/achievement.png";                      
                jQuery("#sonnyIntro").css({"width":"175px","left":"-35%"});
                    
            }, cupIntroTime);
        break;

        case 4:

        // image change
        jQuery("#sonnyIntro").attr('src','./img/icons/notification.gif')
        jQuery("#sonnyIntro").css({ 'width':'150px', 'margin-top':'-5px','left':'-25%' });
        
        // background css
        document.getElementById("charContainer").style.background = "linear-gradient(rgb(217, 138, 218), #EAF7FF,#FFF)";
        document.getElementById("introScreen").style.boxShadow = "rgb(103, 58, 183) 0px 0px 0px 140vw";
        jQuery('.iosFix').css('background','rgb(103, 58, 183)');
        
        // change text            
        document.getElementById("introTxt").innerText = "Turn on notifications? They will help you stay on track!";
        
        jQuery(".btn").hide().html("Good idea!");
        jQuery(".btn2").hide().html("No thanks");
        
        
        // compasion cup
        this.idleInterval[0] = setTimeout(() => {
         jQuery("#sonnyIntro").css({ 'z-index': '200' });
         jQuery(".btn, .btn2").fadeIn();   
         
        //  var ua = navigator.userAgent.toLowerCase();
        //  var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        //  if(isAndroid) {
        //    // Do something!
        //    // Redirect to Android-site?
        //    jQuery(".btn").hide().html("Coming soon");
        //    jQuery(".btn2").hide();
        //  }
       }, 1000);
   break;
   
        case 5:
            
            // clear all the previous animations
            for (var i = 0; i <= 2; i++) { 
              clearTimeout(this.idleInterval[i]);
            }
            jQuery("#sonnyIntro").css({ 'z-index': '-1' });
            var badBro = <HTMLImageElement>document.getElementById("otherChars"); 
            badBro.src  = "./img/badBro/intro.gif"; 

            jQuery(".btn3").hide().html('5 days of wha?');
            jQuery(".btn2").hide().html("Maybe Later");
            jQuery(".btn").hide().html("Challenge Accepted");

            
            // background css
            document.getElementById("charContainer").style.background = "linear-gradient(#ffc98d,#fffad2,#fff)";
            document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw #f6805c";
            jQuery('.iosFix').css('background','#f6805c');
             
            // change text
            document.getElementById("introTxt").innerText = "Perform 5 kindnesses in 5 consecutive days to unlock the unkind version of this app!!";
            // document.getElementById("introTxt").innerText = "Want to unlock the unkind version of this app? You'll need to perform 5 kindness in consecutive days first!!";               
            
            
            jQuery("#sonnyIntro").css({"margin-top":"300px"});//cup dissapear
            
            this.idleInterval[0] = setTimeout(() => {
            jQuery('#otherChars').show();            
            }, 900);
            this.idleInterval[0] = setTimeout(() => {
                jQuery("#sonnyIntro").hide();
                jQuery("#otherChars").show().css({"width":"540px","left":"-78%"});                
                jQuery(".btn, .btn2, .btn3").fadeIn();
             
             this.idleInterval[1] = setTimeout(() => {
                badBro.src  = "./img/badBro/laughing.gif?t=" + new Date().getTime(); 
                this.idleInterval[2] = setTimeout(() => {
                    badBro.src  = "./img/badBro/idle.gif?t=" + new Date().getTime();  
                }, 7700);
              }, 2300);            
            }, 1000);
        break;
        case 6:
            
            // clear all the previous animations
            for (var i = 0; i <= 2; i++) { 
              clearTimeout(this.idleInterval[i]);
            }
            
            // background css
            document.getElementById("charContainer").style.background = "linear-gradient(#D6EDED,#EAF7FF,#FFF)";
            document.getElementById("introScreen").style.boxShadow = "0 0 0 140vw rgb(221, 176, 176)";
            jQuery('.iosFix').css('background','rgb(221, 176, 176)');
             
            // change text
            if(jQuery(window).height() >= 750){ // if on phone then don't show this
            document.getElementById("introTxt").innerText = "Good luck fella' \n";
            }
            else{
            document.getElementById("introTxt").innerText = "";    
            }
            document.getElementById("introTxt").innerText += "This app is all about perseverance. Stick with it and you'll make this world a little kinder";
            jQuery(".btn2").hide().html("Let's do it");
            jQuery(".btn").hide().html("Take the tour");
            jQuery(".btn3").hide();
            
            this.idleInterval[0] = setTimeout(() => {
              jQuery(".btn2").fadeIn();
            }, 1000);
            
            //badBro dissapear
            var badBro = <HTMLImageElement>document.getElementById("otherChars");
            badBro.src  = "./img/badBro/exit.gif"; 
            this.idleInterval[0] = setTimeout(() => {
                jQuery("#otherChars").hide();
                
            }, 3900);
            this.idleInterval[1] = setTimeout(() => {

                jQuery("#sonnyIntro").fadeIn("2000").css({"width":"175px","left":"-88px","top":"60px","margin-top":"0px"}); 
                var heart = <HTMLImageElement>document.getElementById("sonnyIntro");                
                heart.src  = "./img/icons/heart.png";                      
            }, 2000);
            
        break;
    }
  }
}