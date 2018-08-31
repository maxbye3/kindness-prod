import {Component, ElementRef} from '@angular/core';
import {BoatComponent} from './settings/theme/boat.component';
import {SonnyComponent } from './sonny.component'
import { BadBroDialogue } from './badBroDialogue.directive'
import {WeatherComponent } from './settings/theme/weather.component'
 
declare var jQuery: any;

@Component({
  selector: 'pretentious-component',  
  providers: [BadBroDialogue, BoatComponent,SonnyComponent, WeatherComponent]
})

export class PretentiousComponent {
    
    private moveDecor;
    
    constructor(
      private boatComponent : BoatComponent,
      private sonnyComponent : SonnyComponent,
      private badBroDialogue : BadBroDialogue,
      private weatherComponent : WeatherComponent
      ) {
      }
    
    /*
    * REMOVE SCENE 
    */
    removeScene(){
      jQuery("#kindness #kindnessText").html('<img _ngcontent-svj-1="" src="./img/icons/heart.png" width="40px"> Kindness');
      // remove interval
      clearInterval(this.moveDecor);   
      // need to creae pretentious graphics container containes hands and thorns
      jQuery(".pretentiousContainer").html("<div class='thornContainer'></div><div class='handsContainer'></div>");
   
       // UI Changes
      jQuery(".preventHands").hide();
      jQuery(".furniture").show();
      
      jQuery('#kindness').removeClass('evilTxt');

      // Text Change
      jQuery(".intention").html("make an intention")
      jQuery(".orTxt").removeClass("pretentiousTxt");
      jQuery("#whoText").removeClass("pretentiousTxt").html('<img src="./img/icons/heart.png" width="40px"> For Who');
      
      jQuery("#kindnessText").removeClass("pretentiousTxt").html('\
      <span class="compassionNum" style="margin-left: 14.5px; margin-top: 2px;"></span>\
      <span class="compassionDay">DAY</span>\
      <img src="./img/icons/heart.png" style="height: .75em; margin-right: 3px;">\
      Today\'s mission \
      ');
      
      /* CHANGE kindnessCal STYLE
       * Change colour to white
       * Move to top left of screen
      */
      jQuery('.menuItem').css({"-webkit-filter": "invert(0%)",'filter':'invert(0%)'})
      jQuery(".kindnessCal").css({"top":"auto","bottom":"0px","right": "0px"});
      // jQuery(".kindnessCal .menuItem img").css({"-webkit-filter": "invert(100%)","filter": "invert(100%)"});
      jQuery(".themeButton").removeClass("pretentiousTxt pretentiousSubmit");
      jQuery('#inputPerson').attr('placeholder','Who did you do a kindness for?');
      jQuery('#inputKindness').attr('placeholder',"What was today's kindness?");
      jQuery(".thornContainer").hide();     
      jQuery(".handsContainer").hide();

      // mock going straight into evil mode
      // $('#sonnyIcon').click();
      // $('.square-radio').click();

    }
    
    /*
    * Replace Task
    * From submit-kidness
    * Just forward to badBro
    */
    replaceTask(){
      this.badBroDialogue.dialogue('exit',["You accomplish something even more narcissistic?!","Enter it below..."]);
      jQuery(".sonnyContainer").attr("outroAllowed",'true');
    }
    
    /*
    * GO BACK
    * From help component 
    * Just forwards to badBro dialogue
    */
    goBack(){
      var badBroIcon = "<img src='./img/icons/badBro.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; filter: invert(100%);'>";
      this.badBroDialogue.dialogue('exit',["I'm out. Hit " + badBroIcon + " if you're hard enough..."]);
      jQuery(".sonnyContainer").attr("outroAllowed",'true');
    }
    
    /*
    * CHANGE THEME
    * BadBro remarks on you changing the teme
    */
    changeTheme(){           
       this.badBroDialogue.dialogue('exit',["Changing the theme?","Nothing is cooler than this one.."]);            
    }
    
    /*
    * WINNING
    * From submit-kindness 
    * Just forwards to badBro with random
    */
    winning(){
      var badBroIcon = "<img src='./img/icons/badBro.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px; filter: invert(100%);'>";
      
        var random = Math.floor(Math.random() * (3 - 1 + 1) + 1); // spits back a number between 1 & 3
        switch(random) {
        case 1:
            this.badBroDialogue.dialogue('winning',["Whatever..."]);
            break;
        case 2:
            this.badBroDialogue.dialogue('winning',["Party hard!!"]);
            break;
        case 3:
            this.badBroDialogue.dialogue('winning',["Crushed it!!"]);
            break;
        }
      
      this.weatherComponent.rainSkulls();
      var laughOnce = true;
      // force a sonny laugh
      var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");      
        setTimeout(() => {
        
          if(laughOnce){
            sonnyImg.src = "./img/badBro/laughing.gif?t=" + new Date().getTime();
            laughOnce = false;
          }
        }, 100);
      
        
      setTimeout(() => {
        jQuery(".sonnyContainer").attr("outroAllowed",'true');
        this.badBroDialogue.badBroAction('exit');
        laughOnce = true;
      }, 4500);

    }
    
    /*
    * ENTER BAD BRO    
    * Check if Sonny is present and make him exit and then introduce badBro
    * @param STRING - action - forwarded over to sonnyGone
    */
    intBad(action){
      // try initial sonny check      
      if(this.sonnyComponent.sonnyPresent == false){
        this.sonnyGone(action);
      }              
      else{
        // wait for sonny to go
        var waitingForSonny  = setInterval(() => {          
            if(this.sonnyComponent.sonnyPresent == false){
              // intro badBro
              clearTimeout(waitingForSonny); // clear timeout
              this.sonnyGone(action);
            }
        }, 500);
      }  
    }
    
    /*
      * SONNY GONE
      * Change help menu to badBro
      * If sonny is gone
      * Check if BadBro can introduction animation - skip if can't
      * Whether to greet first time or help
      * @param STRING - action - 'greet' or 'help' depending on state
      */     
      sonnyGone(action){
        
        if(action != 'greet' && jQuery(".sonnyContainer").attr("introAllowed") == 'false'){
            this.badBroDialogue.dialogue('idle',["What's happenin'"]);
        }
        
        setTimeout(() => {
          if(action == 'greet'){
            this.badBroDialogue.greeting(); // launch greeting
          }          
          else if(jQuery(".sonnyContainer").attr("introAllowed") == 'true'){              
           this.badBroDialogue.dialogue('idle',["What's happenin'"]);
          }
                  
          jQuery(".sonnyContainer").attr("outroAllowed",'true'); // let dialogue stay
        },0);            
      }          
    
    /*
    * PRETENTIOUS SCENE
    * Make UI changes
    * Create hand and thorn animation
    * Setup BadGuy (NOT DONE YET)
    */
    intScene(){ 

      jQuery(".menuItem").css({"-webkit-filter": "invert(100%)","filter": "invert(100%)"});
      jQuery("#kindness #kindnessText").html('<img _ngcontent-svj-1="" src="./img/icons/heart.png" width="40px" class="verticalFlip"> UnKind');

      jQuery(".sonnyContainer").hide();  
      jQuery('#kindness').addClass('evilTxt');
      jQuery(".settingsMenuItem img").attr('src','./img/icons/badBro.png');
      jQuery('.narcissimTxt').html('Sick of being narcissistic?');
      jQuery('#sonnyStatic').hide().attr('char','badBro');
      // jQuery('.callChar p .txt').html('Call BadBro');
      jQuery('.callChar p .icon img').attr('src','./img/icons/more.png');

      
      this.sonnyComponent.sonnyPresent = false;
      jQuery('.calBg,#sonnyIcon').show();      
      jQuery("#themeSelected").html("unkind");
     
      this.boatComponent.moveBoat('pretentious');
      jQuery('.summerShip').hide();
      jQuery('.pretentiousShip').show();
      
     
      // UI Changes
      jQuery(".preventHands,.badBroDialogue").show();
      jQuery(".smoke,.house,.furniture,.sonnyDialogue").hide();
      
      // Text Change
      jQuery(".intention").html("make an intention")
      jQuery(".orTxt").addClass("pretentiousTxt");
      jQuery("#kindnessText").addClass("pretentiousTxt").html("What deed did you slay?");
      // jQuery("#whoText").addClass("pretentiousTxt").html("Whose mind did this blow?");
      
      /* CHANGE kindnessCal STYLE
       * Change colour to white
       * Move to top left of screen
      */
      // jQuery(".menuItem").css({"-webkit-filter": "invert(100%)","filter": "invert(100%)"});
      //jQuery(".kindnessCal").css({"right": "60px"});
      // jQuery(".kindnessCal .menuItem img").css({"-webkit-filter": "invert(100%)","filter": "invert(100%)"});
      jQuery(".themeButton").addClass("pretentiousTxt pretentiousSubmit");
      jQuery('#inputPerson').attr('placeholder','');
      jQuery('#inputKindness').attr('placeholder','');
      
      this.intBad('greet');// make badBro appear           
      
      // need to creae pretentious graphics container containes hands and thorns
      jQuery(".pretentiousContainer").html("<div class='thornContainer'></div><div class='handsContainer'></div>")
      // jQuery(".pretentiousContainer").html("<div class='handsContainer'></div>");
   
      // remove snow
      document.getElementById("snowContainer1").style.display = "none";
      document.getElementById("snowContainer2").style.display = "none";  
      
                
      /*
      * INFINITE THORNS & 
      * Append thorn images
      * Append hand images
      * Position thorns
      * Position hands
      * Move thorns
      * Move hands
      * Reset thorns (when second thorn == top 170px)
      * Reset hands ()
      */  

      // append hand image
      jQuery(".thornContainer").html("\
        <img class='thorns' src='img/scenes/pretentious/throns.gif'>\
        ");

      var timeInterval = 5000;
      function moveHands(timeInterval){
        
        
        
        // append thorn image
        jQuery(".handsContainer").html("\
        <img class='handsTop' src='img/scenes/pretentious/flaming-fist.gif'>\
        <img class='handsMiddle' src='img/scenes/pretentious/flaming-fist.gif'>\
        <img class='handsBottom' src='img/scenes/pretentious/flaming-fist.gif'>\
        ");
        
        
        
        /* PRETENTIOUS DECOR 
        * Position and animate hands and thorns
        * Determine type of decor and position w/ parameters
        * Add jQuery linear animation
        * @Param STRING type - what type of decor (hand or thorn)
        * @Param INT top - top position for hands and thorns
        * @Param INT middle - middle position for hands and thorns
        * @Param INT bottom - bottom position for hands and thorns 
        * @Param INT animate - animation speed for thorns and hands 
        */
        function pretentiousDecor(type,top,middle,bottom,animate){
          
          // position hands
          var handProperties = {
                "right": "0px",
                "width":"75px",
                "position": "absolute",
                "z-index":"10",
                "opacity":".7"
          };
          
          if(type == "hands"){
            // position hands
            jQuery(".handsTop").css(handProperties).css({"top": top+"px"});
            jQuery(".handsMiddle").css(handProperties).css({"top": middle+"px"});
            jQuery(".handsBottom").css(handProperties).css({"top": bottom+"px"});
            // move hands
            jQuery( ".handsTop,.handsMiddle,.handsBottom" ).animate({
              top: "-="+animate
            }, timeInterval , "linear");
          }
        }
        
        if(jQuery(window).height() <= 750){// on mobile
          pretentiousDecor("hands",0,400,800,400);
          // pretentiousDecor("thorns",422,0,1180,758);
        }        
        else{ // on tablet
          // pretentiousDecor("thorns",422,1180,1938,758);
          pretentiousDecor("hands",0,700,1400,700);
        }
        
        
       
     }
         
      //initial
      moveHands(timeInterval);
      
      //repeat
      this.moveDecor = setInterval(function(){
          moveHands(timeInterval);  
      }, timeInterval);      
    } 
}

