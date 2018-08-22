import {Component} from '@angular/core';
import { CalComponent } from './cal.component';
import { BoatComponent } from './boat.component';
declare var jQuery: any;

@Component({
  selector: 'go-cal',
    template: ``,
  styleUrls: ['app/app.component.css'],
  providers: [CalComponent, BoatComponent]
})


export class GoCalComponent{
  private calComponent;
  private calyCount = 0;


    constructor(
      calComponent: CalComponent,
      private boatComponent: BoatComponent

    ) {
        this.calComponent = calComponent;
    }


   /*
    * Go To Calander View
    */
    toCal(){
      
      jQuery('.goToCal,.orTxt, .intentionTask, .completeContainer').show();

      jQuery('.sliderComponent').hide();
      jQuery('.calView').show();
      this.calComponent.intTask();
      jQuery('.kindnessCal').attr('kindnessView','false'); // stop cal from appearing
      jQuery("html, body").animate({ 
        scrollTop: jQuery(document).height() 
      }, 1000);
      
      this.boatComponent.graphicCheck();

      // removes hands and thorns that screws up pretentious theme
      jQuery(".handsContainer,.thornContainer").fadeOut("slow");
      
      setTimeout(() => {      
      document.getElementById("calyGif").style.display = "block";
      document.getElementById("calyGif").style.opacity = "1";
      },500)
      
       // Cal Count
       this.calyCount++;
       this.setupCaly();
       
       jQuery('.square,.more,#backKindness').css('color','black'); // change text colours to correct in cal mode
       
       jQuery('.helpMenu').hide();
       jQuery('.goToCal').hide();

       return;
    }

  /*
  * SETUP CALY
  * The number of times you return to window
  * Caly will get more and more annoyed
  */
  setupCaly(){
    if(jQuery(".calyDiv").attr("winning") == "true"){
      this.calyCount = 1;
    }
    switch(this.calyCount){
    case 1:      
      this.calComponent.calyState("intro");
    break;
    case 2:
      jQuery("#calyIdle").attr('idle','false');
      jQuery("#calyIdle").css("opacity","0").hide();
      //console.log("caly phone");
      document.getElementById("calyCall").style.display = "none";
      this.calComponent.calyState("return-phone");
    break;
    default:
      jQuery('.calView .speechDiv').hide();
      jQuery("#calyIdle").css("opacity","0").hide();
      //console.log("caly gone");
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