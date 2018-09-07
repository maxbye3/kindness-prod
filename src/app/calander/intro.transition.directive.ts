import { Directive } from '@angular/core';
import { PretentiousComponent } from '../pretentious.component';
import { SonnyDialogue } from '../sonny.dialogue.component';
import { CalComponent } from './cal.component';
import { BoatComponent } from '../settings/theme/boat.component';

declare var $: any;

@Directive({})

export class calanderIntroTransition {

  private calyCount = 0;


  constructor(
    private sonnyDialogue : SonnyDialogue,
    private pretentiousComponent : PretentiousComponent,
    private calComponent : CalComponent,
    private boatComponent : BoatComponent
  ) {}

    /*
    * INT CALANDER
    * In calander mode then slide up to done
    */
    intCal(){
      // ENTER CALANDER
      // $('html, body').animate({scrollTop:0}, 'slow');
      $('.calView').fadeOut('fast');

      $('.goToCal,.orTxt, .intentionTask, .completeContainer').show();

      $('.sliderComponent').hide();
      
      this.calComponent.intTask();
      $('.kindnessCal').attr('kindnessView','false'); // stop cal from appearing
      $("html, body").animate({ 
        scrollTop: $(document).height() 
      }, 1000);
      
      this.boatComponent.graphicCheck();
      
      // removes hands and thorns that screws up pretentious theme
      $(".handsContainer,.thornContainer").fadeOut("slow");
      
      setTimeout(() => {      
        document.getElementById("calyGif").style.display = "block";
        document.getElementById("calyGif").style.opacity = "1";
        $('.calView').show();
      },500)
      
      // Cal Count
      this.calyCount++;
      this.setupCaly();
      
      $('.square,.more,#backKindness').css('color','black'); // change text colours to correct in cal mode
      
      $('.helpMenu').hide();
      $('.goToCal').hide();
      
       
    }

 /*
  * SETUP CALY
  * The number of times you return to window
  * Caly will get more and more annoyed
  */
  setupCaly(){
    if($(".calyDiv").attr("winning") == "true"){
      this.calyCount = 1;
    }
    switch(this.calyCount){
    case 1:      
      this.calComponent.calyState("intro");
    break;
    case 2:
      $("#calyIdle").attr('idle','false');
      $("#calyIdle").css("opacity","0").hide();
      document.getElementById("calyCall").style.display = "none";
      this.calComponent.calyState("return-phone");
    break;
    default:
      $('.calView .speechDiv').hide();
      $("#calyIdle").css("opacity","0").hide();
      clearTimeout(this.calComponent.calyTimeout);
      document.getElementById("calType").innerHTML = ""; // remove text from bubble
      document.getElementById("calyGif").style.right = "-200px"; 
      document.getElementById("calType").innerHTML = "";
      document.getElementById("calyGif").style.display = "none";
      document.getElementById("calyPhone").style.display = "none";
      document.getElementById("calyCall").style.display = "block";
      this.calComponent.calyState("");
    break;
    }
  }


}