import {Component, ElementRef, OnInit,Injectable} from '@angular/core';
import { SonnyComponent } from './sonny.component';
import { SubmitKindnessComplete } from './submit-kindness.component';
import { PretentiousComponent } from './pretentious.component';
import { SonnyDialogue } from './sonny.dialogue.component';
import { TourComponent } from './tour.component';
import { ThemeComponent } from './theme.component';
import {checkDayDirective} from './data/checkDay.directive';

declare var jQuery: any;


@Component({
    selector: 'sonny-help',
    template: ``,
    styleUrls: ["app/sonny.dialogue.component.css"],
    directives: [TourComponent,SonnyDialogue],
    providers: [checkDayDirective, ThemeComponent, SonnyComponent,PretentiousComponent, SonnyDialogue]
})

@Injectable()
export class SonnyHelp implements OnInit {

    private hoursLeft;
   
    constructor(      
        private checkDayDirective : checkDayDirective,
        private themeComponent : ThemeComponent,
        private sonnyDialogue: SonnyDialogue, 
        private sonnyComponent: SonnyComponent,
        private pretentiousComponent : PretentiousComponent
        ) {
        this.sonnyDialogue = sonnyDialogue
        this.sonnyComponent = sonnyComponent;
    }

    ngOnInit() {
        //calculate the number of hours left
        this.hoursLeft = this.calculateHoursLeft();       
    }


     /*
    * OUTRO/INTRO TRANSITION
    * Add outro animation to different parameters
    * If going into helpView then disable call button
    * If #themeChange present then remove
    * clearout any timeout from last view
    * There seems to be some sort of check later for jQuery("#doneView") so let's hide it if screen2
    */
    transitionViews(screen1,screen2){
        jQuery(".sonnyContainer").attr("destroyBubble","false");
        if(screen2 == "helpView"){
            jQuery('#sonnyIcon').css("right","-100px"); // get out of here
        }
        else { jQuery('#sonnyIcon').css("right","0px"); }
        
        // exit screen 1
        document.getElementById(screen1).className = "";  
        document.getElementById(screen1).className += " outro";

        // enter screen 2
        document.getElementById(screen2).className = "";  
        document.getElementById(screen2).className += " intro";
        
        // check for doneView
        if(screen1 == "doneView"){
            jQuery("#doneView").hide();
        }
    }
  
    

  /*
  * Int Help View
  * Check if BadBro present and deal some damage if he is.
  * Otherwose, change the views from kindness / finished to help
  */
  helpView() {       
    // is badBro present
    if(this.sonnyComponent.sonnyPresent == false){        
        this.pretentiousComponent.intBad('help');
        jQuery('#sonnyIcon').hide();
    }
    else{
        this.sonnyDialogue.introSonny('help');      
    }    
      this.transitionToHelp();
  }
   
  /*
  * Transition to help
  * If regular screen then translate regular screen to help
  * If theme change then remove theme
  */
  transitionToHelp(){       
   if(jQuery('#themeChange').css('display') != 'none'){
        // exit screen 1
        document.getElementById('themeChange').className = "";  
        document.getElementById('themeChange').className += " outro";
    }   
      
   //if done screen detected then transition from tht screen otherwise
    var victoryTrue = jQuery("#doneView").css("display");
    if (victoryTrue != "none") {
        // transition from done view to helpView
        this.transitionViews('doneView', 'helpView');
    }
    else {
        // transition from kindness view to help view
        this.transitionViews('kindnessView', 'helpView');
    }        
  }
  
    /*
    * Calculate the hourse left
    */
    calculateHoursLeft(){
        var d = new Date();
        var n = d.getHours();
        var hoursLeft = 24 - n;
        return hoursLeft;
    }



    /*
    * BACK TO KINDNESS VIEW
    * Check if badBro or sonny
    * Out you go
    */
    goBack(page){ 
        
        this.checkDayDirective.dayCheck('kindnessView');
        if(this.sonnyComponent.sonnyPresent == false){
          this.pretentiousComponent.goBack();
        }
        else{
          this.sonnyDialogue.sonnySpeech(["Click <img src='./img/icons/sonny.svg' style='height: 20px; border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'> if you need anything else!!"]);  
        }
        
        setTimeout(() => {  
            jQuery(".sonnyContainer").attr("outroAllowed","true");        
        }, 3500);           
                  
        if(page == "help")
            this.transitionViews("helpView","kindnessView");
        else
            this.transitionViews("contactView","kindnessView");
    }

    /*
    * EXAMPLE KINDNESS
    */
    giveExample(){    
        document.getElementById("typed").innerHTML = "okay.. let me think..";

        // console.log("provide kidness example");

        this.transitionViews("helpView","kindnessView");
        
        // sony asks if this okay
        this.sonnyDialogue.sonnySpeech(["Here's something you could do.. Feel free to edit the act if it's not quite right.."]);



        // placeholders edited        
        (<HTMLInputElement>document.getElementById("inputPerson")).value = "folks";
        (<HTMLInputElement>document.getElementById("inputKindness")).value = "call them and catch up";        
    }

   /* 
    * CONTACT ME
    */
    contactme(){
        document.getElementById("typed").innerHTML = "Great! Let me just find the forms.."; 
        this.transitionViews("helpView","contactView");

        // sony contact disclaimer
        this.sonnyDialogue.sonnySpeech(["Using the fields below you can contact the developer directly, who thinks he's a being from the moon.",
        "I know.. It's a bit strange. I think it's some psychological miswiring. Luckily, we're working through it.",
        "Seriously though, thanks for taking the time.", "All feedback is used to improve the app."]);
    }
    /*
    * WHAT ON EARTH WHY IS THIS EVEN HERE?!
    */
    launchBirds(){

    }

}