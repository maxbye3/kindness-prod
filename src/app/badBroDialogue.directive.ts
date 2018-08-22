import {Component, OnInit,  ElementRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { TimeService } from './time.service';
import { ChallengeComponent } from './challenge.component';
import { SonnyComponent } from './sonny.component';
import { SonnyDialogue } from './sonny.dialogue.component';
declare var jQuery: any;

@Component({
  selector: 'bad-bro',
  templateUrl: '',
  styleUrls: [''],
  providers: [SonnyDialogue, SonnyComponent, TimeService, ChallengeComponent]
})

@Injectable()
export class BadBroDialogue implements OnInit{

    constructor(
        private timeService : TimeService,
        private sonnyComponent : SonnyComponent,
        private sonnyDialogue : SonnyDialogue,
        private challengeComponent : ChallengeComponent
    ) {
    }

    ngOnInit(){}
    
    /*
    * BAD BRO DIALOGUE
    * Bad Bro chatting animation
    * Once finished talking either:
      * Remain
    */
    dialogue(action, phraseArray){  
        if(jQuery('#sonnyStatic').attr('char') == 'sonny'){
            return;
        }

      jQuery(".sonnyContainer").show();
      if(jQuery('.sonnyContainer').attr('introallowed') == 'true'){
         this.sonnyComponent.sonnyState('intro','badBro');
         setTimeout(() => {
             jQuery('.sonnyContainer').attr('introallowed','false');
             this.dialogue(action, phraseArray);
         }, 2300);
      }
      else{
         this.sonnyComponent.sonnyState('talking','badBro');            
      
        // make the hand cover                
        var ctx = this;


        jQuery(".badBroDialogue").css('opacity','1').show().typed({
          strings: phraseArray,
          typeSpeed: 0,
          showCursor: false,
          backDelay: 750,
          backSpeed: 0,
          loop: false, // loop on or off (true or false)
          loopCount: false, // number of loops, false = infinite            
          callback: function () {
              if (action == 'winning') {
                  return;
              }

              if (action) {
                  ctx.badBroAction(action);
              }
              

              
              if(jQuery('kindness-generator-component').attr('sonnyOut') == 'true'){
                   /*
                   * BadBro spits and exits
                   */
                   var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");      
                   sonnyImg.src = "./img/badBro/sneezing.gif?t=" + new Date().getTime();
                   setTimeout(() => {   
                     sonnyImg.src = "./img/badBro/exit.gif?t=" + new Date().getTime();
                   },2000); 



                   /*
                    * SONNY ASK
                    * Sonny jumps up and asks if you want to go back or continue
                    */                    
                    jQuery('kindness-generator-component').attr('sonnyOut','false'); // ensure sonny does not jump up again                    
                    
                    setTimeout(() => {                                           
                        // jQuery('.badBroDialogue').fadeOut();
                        ctx.sonnyDialogue.introSonny('generator');  
                        // sonny starts
                        jQuery('#sonnyStatic').attr('char','sonny');
                        jQuery('sonnyGif, .sonnyDialogue, .sonnyContainer').show();
                        jQuery('.preventHands, .control').hide();                            
                        // ctx.sonnyComponent.sonnyState('intro','sonny');
                        setTimeout(() => {
                            jQuery('.stillNasty,.backToKindness').fadeIn();
                        },7000);                                
                    },5500); 
                                    
              }
              
              phraseArray = [];                
              return;
          }
        });
      }  
    } 
    
    /*
    * BAD BRO ACTIONS
    * Once dialogue has been said
    * Before Bad Bro departs he has the option to spit or leave immediatly
    * @param STRING action - laugh, spit or '' (just leave)
    */
     badBroAction(action){
     
        if(jQuery('#sonnyStatic').attr('char') == 'sonny'){
            return;
        }
        
        var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");      
        if(action == 'exit'){
            stillTalking('exit',this);    
        }
        else if (action == 'spit'){
            stillTalking('spit',this);                          
        }
        else if (action == 'idle'){
            this.sonnyComponent.sonnyState('idle','badBro');           
        }

        /*
        * STILL TALKING
        * Stop BadBro if talking
        */
        function stillTalking(type,ctx){
            var wordcountOld = jQuery('.badBroDialogue').html().length;
            setTimeout(() => {  
                var wordcountNew = jQuery('.badBroDialogue').html().length;
                if(wordcountNew != wordcountOld){
                    return; // as different dialogue is now being spoken
                }
                else{
                    if(jQuery('#sonnyStatic').attr('char') != 'sonny'){ // careful here as sneeking into sonny animation
                      sonnyImg.src = "./img/badBro/sneezing.gif?t=" + new Date().getTime();
                    }
                    ctx.resetText();
                }
            }, 2000); // sonny stays 
        }
    }  
    
    /* 
    * RESET TEXT 
    * Bad Bro exit
    *  Removes dialogue
    */
    resetText(){
            jQuery(".sonnyContainer").attr("outroAllowed","true");
            this.sonnyComponent.sonnyState("exit","badBro");
            jQuery(".badBroDialogue").fadeOut(); 
                 
    }  
    
    
   /*
    * GREETING
    * Can BadBro jump in?
    * Couple of things to Bad Bro to say on intro based on states
    * States:
    *   1. Number of kindnesses done (first time or random generic message presented)
    *   2. Whether a kindness has already been done
    *   3. Whether compassion challenge is happeneing
    */
    greeting(){
        var sonnyIcon = "<img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'>";
        var kindnessComplete = 1; // MAX CHECK IF FIRST TIME
        var hour = this.timeService.returnTime();
        
        // Can BadBro Jump In?         
        setTimeout(() => {  
            jQuery(".sonnyContainer").attr("outroAllowed","true");                   
        }, 3500);
        
        // check if compassion challenge is being done
        var compassionNum = this.challengeComponent.checkCompassion(),
        compassionShown = localStorage.getItem("compassionMsg");
        // if(compassionNum){ // && compassionShown != 'shown' 
        //   var sonnyDialogue = this.challengeComponent.compassionPhrases(compassionNum);            
        // }
        if(kindnessComplete == 0){ // if first time                          
          // this.sonnySpeech(["Howdy, welcome to the app!","Click on " + sonnyIcon + " if you want to repeat the tour or need anything."]);
          this.dialogue('spit', ["Yo punk! What's happenin'","Welcome to the app and all that.."]); 
        }
        else{ // bunch of other things Sonny could say
            var random = Math.floor(Math.random() * (3 - 1 + 1) + 1); // spits back a number between 1 & 3
            if (hour < 11){ // before 11am               
                switch(random) {
                case 1:
                   this.dialogue('spit' , ["Sup rebel..","Honestly, you shouldn't be up at this hour..","Punks don't get up till noon"]);
                   break;
                case 2:
                   this.dialogue('spit' , ["Better be up these wee hours because you were partying too hard the night before","This mode ain't for you if you're the type whose into early beddy-byes..."]);
                   break;
                case 3:
                   this.dialogue('exit' , ["Another day to crush and blow minds!!","Show the world what you're made of!!"]);
                   break;
                }
            }
            else if (hour < 15){ // before 2pm
                switch(random) {
                case 1:
                    this.dialogue('exit' , ["Eating lunch is for losers..","Eat rocks!! More nutritious and more awesome!!"]);
                    break;
                case 2:
                    this.dialogue('exit' , ["At lunch-time, I like to change themes and beat up " + sonnyIcon , "Never has any lunch money or food worth stealing."]);
                    break;
                case 3:
                    this.dialogue('spit',["Whatever work you're currently doing...",  "Give up on it", "It ain't worth your time"]);
                    break;
                }
            }
            else if (hour < 25){ // before midnight
                switch(random) {
                case 1:
                    this.dialogue('exit', ["What's happenin' baller?", "Be mean until you make it big. Then you have the right to be mean."]);
                    break;
                case 2:
                    this.dialogue('spit',["Here's some bedtime advice my papa gave to me:","Love yourself and hate everyone else"]);
                    break;
                case 3:              
                    this.dialogue('exit',["Party harder than the night", "And remember this sage advice:", "Never. Don't. Party."]);
                    break;
                }
            }               
               
        } 
        
    } // greeting 
    
}

