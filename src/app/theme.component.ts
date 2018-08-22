import {Directive, ElementRef} from '@angular/core';
import {PretentiousComponent} from './pretentious.component';
import {SonnyComponent} from './sonny.component';
import {SonnyDialogue} from './sonny.dialogue.component';
import {ChallengeComponent} from './challenge.component';
import {BoatComponent} from './boat.component';
import {TimeService} from './time.service';
import { GeneratorBackend } from './generator.component';
declare var jQuery: any;

@Directive({
  selector: 'theme-component',
  providers:[GeneratorBackend, BoatComponent, ChallengeComponent, PretentiousComponent, SonnyComponent, SonnyDialogue, TimeService]  
})

export class ThemeComponent {
    private furnitureImg;
    public showStyle = false;
    public theme;
    public selectedBackground;
     
    constructor(
      private pretentiousComponent: PretentiousComponent,
      private generatorBackend : GeneratorBackend,
      private sonnyComponent : SonnyComponent,
      private sonnyDialogue : SonnyDialogue,
      private timeService : TimeService,
      private challengeComponent : ChallengeComponent,
      private boatComponent : BoatComponent
    ) {}
    
   /*
   * RESET SONNY
   * Totally reset either sonny or Bad Bro
   */
    resetSonny(){
      
      if(this.sonnyComponent.sonnyPresent == false){
        // reset Bad Bro
        jQuery(".sonnyContainer").attr("outroAllowed",'false');
        this.pretentiousComponent.intBad('greet');
        
     }
     else{
        // reset Sonny
        //this.sonnyDialogue.greeting();
                  
     }      
    }
  
    
   setTheme(theme){
      jQuery('kindness-generator-component').hide();
      jQuery('#sonnyIcon').css("right","0px");  // slide sonnyIcon in
      var introNecessary = localStorage.getItem("compassionChallenge"); // if undefined then do screens       
      if(introNecessary != null){
        if(theme == "pretentious"){

          this.removeAllThemesBar(theme);
          var is_iPad = navigator.userAgent.match(/iPad/i) != null;
          if(is_iPad){
            jQuery('.sonnyChar').css('top','60px');
          }
          this.pretentiousComponent.intScene(); 
          jQuery('.birdContainer').show();         
        }
        else  {
          this.seasonTheme(theme);
          jQuery('.birdContainer').hide();
        }
      }
      this.generatorBackend.checkIntention(); // find if intention has been done     
   }
   
    /*
    * SUMMER SCENE
    * Set all generator parameters to false
    * Launch Sonny
    * Setup parameters for winter or summer
    */ 
    seasonTheme(theme){   
        jQuery(".skipContainer").attr('theme',theme);             
        // hide so nothing shown & set all generator parameters to false
        jQuery('kindness-generator-component, compassion-flow-component').hide();        
        jQuery(".settingsMenuItem img").attr('src','./img/icons/sonny.png');
        jQuery('.narcissimTxt').html('Tired of being nice?');

        var is_iPad = navigator.userAgent.match(/iPad/i) != null;
        if(is_iPad){
          jQuery('.sonnyChar').css('top','50px');
        }

        this.sonnyComponent.sonnyPresent = true;
  
        jQuery('.summerShip').show();
        jQuery('.pretentiousShip').hide();
        
        jQuery('.callChar p .icon img').attr('src','./img/icons/more-skinny.png');
        
        //remove badBro
        jQuery("badBroStatic").hide();
        clearInterval(this.sonnyComponent.idleAnimation); // idle animations        
        jQuery('#sonnyGif,#sonnyStatic').show().attr('char' , 'sonny'); // idle animations
      
        // launch Sonny
        this.sonnyComponent.sonnyState("intro","sonny");
        this.sonnyDialogue.greeting();
        jQuery(".sonnyDialogue").show();
        jQuery(".badBroDialogue").hide();
      
        // hide pretentious stuff
        jQuery(".preventThorns,.preventThornsGrad,.calBg,.badBroDialogue").hide();
        this.removeAllThemesBar(theme);
        this.pretentiousComponent.removeScene();
        this.theme = theme;
        this.selectedBackground = theme;
        //document.getElementById("themeSelected").innerHTML = theme;
        
        this.furnitureImg = './img/scenes/'+theme+'.gif?t=' + new Date().getTime();
        jQuery('.furniture').attr('src','./img/scenes/summer.gif?t=' +  + new Date().getTime());
        if(theme == "summer"){
          this.boatComponent.moveBoat('summer');
          document.getElementById("birdContainer").style.display = "block";
          document.getElementById("boatContainer").style.display = "block";
          document.getElementById("winterHouse").style.display = "none";
          document.getElementById("snowContainer1").style.display = "none";
          document.getElementById("snowContainer2").style.display = "none";  
          jQuery("#themeSelected").html('summer'); 
        }
        else if(theme == "winter"){
          this.boatComponent.moveBoat('winter');
          document.getElementById("birdContainer").style.display = "none";
          document.getElementById("boatContainer").style.display = "none";
          document.getElementById("winterHouse").style.display = "block";
          document.getElementById("snowContainer1").style.display = "block";
          document.getElementById("snowContainer2").style.display = "block";
          jQuery("#themeSelected").html('winter'); 
        }
        
        this.challengeComponent.intCompassion();
    }
    
    /*
    * SONNY COMMENT
    * Sonny comments on theme change
    */
    sonnyComment(){   
      jQuery("#sonnyGif").attr('animating','true');     
      var badBro = "<img src='./img/icons/badBro.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'>";      
      this.sonnyDialogue.sonnySpeech(["Change theme by clicking on one below","Pretentious theme will bring up "+ badBro]);
      jQuery(".sonnyContainer").attr("outroAllowed","false");
    }
    
   /*
    * Changing the theme
    */
    changeTheme() {                  
      return this.theme;
    }
    
    /*
    * GO BACK
    * Go back to main screen
    */
    back(){
      // show everything
      jQuery('kindness-generator-component, #kindness-generator, #doneView').css('opacity','1');
      setTimeout(() => { 
        jQuery('kindness-generator-component, #kindness-generator, #doneView').css('opacity','1');
        if(jQuery('.sliderComponent').css('display') === 'block'){
          jQuery('#kindnessView').hide();
        }
      }, 500);
      jQuery('kindness-generator-component').show();  
      
      document.getElementById('themeChange').className = "";  
      document.getElementById('themeChange').className += " outro";

      if(jQuery('#kindnessView').css('display') == 'none'){
        var classname = 'doneView';
      }
      else if(jQuery('#doneView').css('display') == 'none'){
          classname = 'kindnessView';
      }
      
      this.timeService.dayCheck(classname); 
    }

    selectButton(theme){
      this.selectedBackground = theme;
      jQuery('.sonnyDialogue').attr('theme',theme);
      this.setTheme(this.selectedBackground);
      return 'rgba(0,0,0,0.05)';
    }
    // theme change (end)
    
    removeAllThemesBar(theme){
      // max add spring and autumn when they are made
      jQuery(".theme").removeClass("winter pretentious summer");
      jQuery(".theme").addClass(theme);    
    }
}

