import { Directive } from '@angular/core';
import { PretentiousComponent } from '../pretentious.component';
import { SonnyDialogue } from '../sonny.dialogue.component';

declare var $: any;

@Directive({})

export class calanderOutroTransition {

  private calyCount = 0;

  constructor(
    private sonnyDialogue : SonnyDialogue,
    private pretentiousComponent : PretentiousComponent
  ) {}

    /*
    * EXIT CALANDER
    * In calander mode then slide up to done
    */
    exitCal(){
      $('#sonnyIcon').show();   
      
      // if settings
      // $(".settings").show().css("animation","settingsOutro 1s");

      $('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
      $('.helpMenu').show();
      $('.goToCal').show();

       $('.sliderComponent').show();
       if($('#sonnyGif').attr('char') == 'badBro'){ 
          // launch bad bro dialogue
          this.pretentiousComponent.intBad('greet');
        }
        else {
          $('.handsContainer').hide();
          setTimeout(() => { 
            $('.handsContainer').hide();
          }, 500);
          this.sonnyDialogue.greeting();
        }   

                   
      $('.kindnessCal').attr('kindnessView','true'); // stop cal from appearing                  
      
      // removes hands and thorns that screws up pretentious theme
      $(".handsContainer,.thornContainer").fadeIn("slow");
      
      var calyPhone = <HTMLImageElement>document.getElementById("calyPhone");
      calyPhone.style.display = "none";      
      document.getElementById("calBubble").style.opacity = "0";
      document.getElementById("calyGif").style.display = "none";     
      
      // remove caly again
      $("#calyGif").css("opacity","0").hide();
      
      $("html, body").animate({ 
        scrollTop: "0px"
      }, 1000);  
      
      // DELETE CONTENTS OF SPEECH BUBBLE
      setTimeout(() => { 
        // remove caly again
        $("#calyGif").css("opacity","0").hide();
      
      
        document.getElementById("calType").innerHTML = '';
        $("#calyIdle").css("opacity","0").hide();      
      }, 1000);
      
      $("#calyIdle").css("opacity","0").hide();  
      $('.helpMenu, .goToCal').show(); // is this got rid of in enterance?


      setTimeout(() => {
          $(".settings").hide();        
      }, 500);  
    }


}