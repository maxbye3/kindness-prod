import {Component} from '@angular/core';
import {SonnyDialogue} from './sonny.dialogue.component';
import {SonnyHelp} from './help.component';
import {GoCalComponent} from './go.cal.component';
import {KindnessService} from './kindness.service';
import {SonnyComponent} from './sonny.component';
import {TimeService} from './time.service';
import {ChallengeComponent} from './challenge.component';
import { PretentiousComponent } from './pretentious.component'
import { AlternativeKindness } from './alternativeHome/alternateKindnessView.component'
declare var jQuery: any;

@Component({
  selector: 'kindness-submitted',
    template: `
    
  `,
  styleUrls: ["app/sonny.dialogue.component.css"],
  providers: [
    KindnessService,
    GoCalComponent,
    SonnyComponent,
    SonnyDialogue,
    ChallengeComponent,
    PretentiousComponent,
    TimeService,
    SonnyHelp
  ]
})


export class SubmitKindnessComplete{
     
    constructor(
      private challengeComponent : ChallengeComponent,
      private pretentiousComponent : PretentiousComponent,
      private goCalComponent:GoCalComponent,      
      private kindnessService:KindnessService,
      private sonnyComponent:SonnyComponent,
      private sonnyHelp:SonnyHelp,
      private alternativeKindness : AlternativeKindness,
      private sonnyDialogue:SonnyDialogue,
      private timeService : TimeService      
    ) {}
  
    public timeLeft = 24 - this.timeService.returnTime();
       
    /*
    * CHECK SUBMISSION
    */
    kindessSubmit(){
      jQuery('.classicView').attr('classic','false');
      jQuery('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
      // document.getElementById("submitCheck").style.display = "block";   
      var inputPerson = <HTMLInputElement>document.getElementById("inputPerson");
      var inputKindness = <HTMLInputElement>document.getElementById("inputKindness");
      
      if(inputKindness.value == ""){
        // No Kindness Entered
        document.getElementById("kindnessText").style.color = "red"; 
        // document.getElementById("whoText").style.color = "black";  
        inputKindness.placeholder = "Please enter a kindness!";
      }
      else{
        this.kindnessSuccess(); // winning animation
      }
    }

    /*
    * CHECK REPEAT
    * If no date in the date array then inject new kindnness otherwise everything breaks
    * If$('#kindnessView').attr('kindnessComplete','true') from timeService
    * Then replace the last kindness
    * Else save as last kindness
    */
    checkRepeat(){
       var inputKindness = <HTMLInputElement>document.getElementById("inputKindness");
       if (localStorage.getItem("dateArray") == ''){ // if no date array
          // save as new kindness
          this.kindnessService.saveData(inputKindness.value);// call in the service to deal with data
          this.challengeComponent.iterateCompassion(); // iterate challenge
          jQuery('#kindnessView').attr('kindnessComplete','true'); // mark first day as done
          inputKindness.value = '';
          return;
       }
  
        if( jQuery('#kindnessView').attr('kindnessComplete') ==  'true' ){
          // replace last kindness
          var kindnessArray = JSON.parse(localStorage.getItem("kindnessArray"));
          kindnessArray[0] = inputKindness.value;
          localStorage.setItem("kindnessArray", JSON.stringify(kindnessArray)); 

          // // allow cheating (compassion challenge day 1 -> 2 if on day 1)
          // var compassionNum = localStorage.getItem("compassionChallenge");
          // if(compassionNum == '1'){
          //    this.challengeComponent.iterateCompassion(); // iterate challenge 
          // }
          inputKindness.value = '';

          return;
        }  
       // save as new kindness
       this.kindnessService.saveData(inputKindness.value);
       this.challengeComponent.iterateCompassion(); // iterate challenge
       jQuery('#kindnessView').attr('kindnessComplete','true');
       inputKindness.value = '';
    }

    /*
    * SUBMISSION SUCCESSFUL
    * Check if sonny is present & launch winning animation
    * Go to winning view
    */
    kindnessSuccess(){ 
    
     if(this.sonnyComponent.sonnyPresent == false){
          this.pretentiousComponent.winning();          
     }
     else{
          this.sonnyDialogue.introSonny('winning');  
     }      
     jQuery(".compassionDay").attr('firstCompassion','false');
     this.checkRepeat();     
     jQuery("#doneView").show();
     this.sonnyHelp.transitionViews("kindnessView","doneView");

     if(jQuery('#sonnyGif').attr('char') == 'badBro'){ 
      jQuery('.compassionSelect').hide();
    }
    else{
      jQuery('.compassionSelect').show();

     }
    }

    /*
    * BACK TO KINDNESS
    * Determine Sonny or BadBro
    * Create equivalent dialogue
    * Change views back to kindness
    */
    backToKindness(){      
      this.challengeComponent.revertSuccess();
      jQuery('#kindnessView').show();
      if(this.sonnyComponent.sonnyPresent == false){
        this.pretentiousComponent.replaceTask();          
      }
      else{
        this.sonnyComponent.sonnyState('intro','sonny'); 
        
        if(jQuery('#kindnessView').attr('kindnessComplete') ==  'true'){  // first time              
          this.sonnyDialogue.sonnySpeech(["Replace today's kindness with an even better one below!"]);  
        }
        else{
          this.sonnyDialogue.sonnySpeech(["Nice work! Today's kindness has been replaced!"]);  
        }
      }      
      this.sonnyHelp.transitionViews("doneView","kindnessView");
      this.alternativeKindness.backToKindness()
    }    
}
