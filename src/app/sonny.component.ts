import {Component} from '@angular/core';
import {WeatherComponent} from './settings/theme/weather.component'
import { KindnessService } from './kindness.service';
declare var jQuery: any;

@Component({
  selector: 'sonny',
  templateUrl: 'app/sonny.component.html',
  styleUrls: ['app/sonny.component.css'],
  providers: [WeatherComponent, KindnessService]
})


export class SonnyComponent {
  public clearIdleTimeout = [];
  public clearIdleInterval;
  public idleAnimation;
  public sonnyPresent = true;
  public animationTime = 0;
  constructor(
      private weatherComponent:WeatherComponent,
      private kindnessService : KindnessService
  ) {}

  speechInt(){
        jQuery("#sonnyIcon").show().css({"opacity":"1","right":"0px"});
        
        // decrease size of Sonny Icon         
        jQuery('#sonnyIcon').css({"padding": "0px"});
        jQuery('#sonnyIcon p').css({"font-size": "18px"});
        jQuery('#sonnyIcon img').css({"height": "30px"});
      
        var speechBubble = document.getElementById('speechBubble').style;
        //speechBubble.display="block";
        speechBubble.width="0vw";
        speechBubble.opacity=".5";
        setTimeout(() => {
            var bubbleOffset = window.innerWidth - 140;
            speechBubble.width= bubbleOffset + "px";
            speechBubble.opacity="1";
        }, 0); 
        jQuery(".sonnyContainer").attr("destroyBubble","false");
  }

/*
 * SPEECH OUT
 * look at destroy bubble and see if it's true or false
 */
  speechOut(){
    if(jQuery(".sonnyContainer").attr("destroyBubble") == "true"){
      if(jQuery(".sonnyContainer").attr("sonnySpeaking") == "false"){
        // increase size of Sonny Icon
        if(jQuery('#speechBubble').css('opacity') == '0' ){
          jQuery('#sonnyIcon p').css({"font-size": "20px"});
          jQuery('#sonnyIcon img').css({"height": "50px"});
          jQuery('#sonnyIcon').css('padding','10px');
        }
        
        document.getElementById("typed").innerHTML = "";        
        var speechBubble = document.getElementById('speechBubble').style;
        speechBubble.width="0vw";
        speechBubble.opacity="0";
      }
    } 
  }


private id;
    /*
    * If sonny during badBro then return
    * Changing Sonny State
    * Change graphic depending on state and char
    * @param STRING state - the state with which to launch
    * @param STRING char - the character that we're animating
    */
    sonnyState(state,char){   
         
        if(char == 'badBro' && jQuery('#sonnyStatic').attr('char') == 'sonny'){            
          return;
        }
        
        if(char == 'sonny' && jQuery('#sonnyStatic').attr('char') == 'badBro'){            
          return;
        }
        
        // bug where sonny stops talking 
          if(state == 'talking'){
            if (this.id) {
              clearInterval(this.id);
              jQuery('#speechBubble').css('opacity','0');
            }
            this.id = setInterval(() => {
              jQuery('#speechBubble').css('opacity','1');      
            }, 1000);
          }
          else{
            if (this.id) {
              clearInterval(this.id);
              jQuery('#speechBubble').css('opacity','0');
            }
          }
         // bug where sonny stops talking 

        var sonnyIcon = document.getElementById('sonnyIcon'),
        sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif"),
        sonnyStatic = <HTMLImageElement>document.getElementById("sonnyStatic"),
        badBroStatic = <HTMLImageElement>document.getElementById("badBroStatic"),
        sonnyWin = <HTMLImageElement>document.getElementById("sonnyWin"),
        introTime;
        /*
        * WINNING CONDITION
        */
        if(jQuery(".sonnyContainer").attr("sonnyWinning")=="true"){
            jQuery("#sonnyGif").hide();
        }
        // win condition
        /*
        * IDLE CONDITION
        */
        if(state != "exit"){
          jQuery("#sonnyStatic,#sonnyWin,#badBroStatic").hide();
          jQuery("#sonnyGif").show();
        } // idle condition
        
        if(char == "badBro"){
           jQuery(".sonnyContainer").css({"margin-left":"70px","margin-top":"-40px"});
           jQuery(".sonnyGif,#badBroStatic").css("height","180px");
           introTime = 2400;
           jQuery('#sonnyGif').attr('char','badBro');
        }
        else {  // sonny

                  
           jQuery('.sonnyContainer').css('z-index','6'); // get sonny right level
           
           jQuery(".sonnyContainer").css({"margin-left":"0px","margin-top":"0px"}); 
           jQuery(".sonnyGif,#sonnyStatic").css("height","150px");
           introTime = 2000;
           jQuery('#sonnyGif').attr('char','sonny');
        }
        switch(state) {
            case "intro":      
            /*
             * Disable Enable Intro
             * Check if jQuery(".sonnyContainer").attr("introAllowed") is false
             * False disables intro and true enables it
             */              
             jQuery("#sonnyGif").attr('exiting','false'); // idle animation error      
             if(jQuery(".sonnyContainer").attr("introAllowed") == "true"){ 
                // if badBro comes into frame then disable preventThorns
                sonnyImg.style.display = 'initial';
                
                // okay so there's this weird pop in glitch i need to get rid of
                jQuery('#sonnyGif').hide();
                setTimeout(function(){ 
                  jQuery('#sonnyGif').fadeIn();
                 }, 100);
                sonnyImg.src = "./img/"+char+"/intro.gif?t=" + new Date().getTime();
            }
            else {              
              sonnyImg.src = "./img/"+char+"/idle.gif?t=" + new Date().getTime();
            }
            if(char=="badBro"){
               // intro - enable preventThorns
               jQuery(".preventHands,.preventThorns,.preventThornsGrad").fadeIn();
            }
            break;
            case "exit":                                        
              
                /*
                * Sonny allowed to escape when idle
                * Not allowed when talking
                */   
                if(jQuery(".sonnyContainer").attr("outroAllowed") == "true"){  
                  jQuery('#sonnyStatic').hide();
                  jQuery('.sonnyGif').show();
                  sonnyImg.src = "./img/"+char+"/exit.gif?t=" + new Date().getTime();
                  setTimeout(() => {
                    jQuery(".sonnyContainer").attr("introAllowed","true");
                    jQuery(".sonnyContainer").attr("present","false"); // required to check wether to re-enter sonny after cal or settings
                    jQuery(".sonnyContainer").attr("outroAllowed","false");
                    if(char=="badBro"){
                        // if badBro exit then enable preventThorns
                        jQuery(".preventThorns,.preventThornsGrad").fadeOut();
                        jQuery('#sonnyIcon').fadeIn();
                    }
                    else { // sonny
                        // iniate bird
                        jQuery('#birdContainer').css('left','100vw');
                    }
                  }, 2000);
                }               
            break;
            case "talking": 
                // if sonny is in win mode then please don't talk
                if(jQuery('#sonnyWin').css('display') != 'none'){
                  return;
                }
                // jQuery(".sonnyContainer").attr("outroAllowed","false");               
                jQuery(".sonnyContainer").attr("introAllowed","false");
                sonnyImg.src = "./img/"+char+"/talking.gif?t=" + new Date().getTime();
            break;
            case "intro-winning":
                jQuery('#sonnyStatic').attr('winning', 'true'); // stop sonny exiting pre-maturely
                jQuery(".calyDiv").attr("winning","true");
                jQuery(".sonnyDialogue").fadeOut("slow");                
                this.kindnessService.updateStateArray("kindness-done");
                // if intro is nessecary do intro
                if(jQuery(".sonnyContainer").attr("introAllowed") == "true"){ 
                  this.sonnyState('intro','sonny');
                }
                else{
                    // jump straight into celebration
                    jQuery('#sonnyGif, #sonnyStatic').hide();
                    jQuery('#sonnyWin').show();      
                    jQuery(".sonnyContainer").attr("sonnyWinning","true");              
                }
                setTimeout(() => {                    
                    jQuery(".sonnyContainer").attr("sonnyWinning","true");
                    // definitely close all sonny's except sonny now
                    jQuery('#sonnyGif, #sonnyStatic').hide();
                    jQuery('#sonnyWin').show(); 
                    sonnyWin.src = "./img/"+char+"/winning.gif?t=" + new Date().getTime();
                    this.speechOut();                    
                    this.weatherComponent.rainTinsel();  // tinsel rain
                    // sonnyIcon.style.display = 'none';                    
                }, 2000); 
                 
                setTimeout(() => {                                         
                    // sonnyWin.src = "./img/"+char+"/exit.gif?t=" + new Date().getTime();                    
                    // if(jQuery(".sonnyContainer").attr("outroAllowed") == "false"){                    
                        // this.sonnyState('exit','sonny');
                        // sonnyWin.src = "./img/"+char+"/exit.gif?t=" + new Date().getTime();
                    // }

                    jQuery(".sonnyContainer").attr("outroAllowed","true");
                    

                    
                    jQuery('#sonnyWin, #sonnyStatic').hide();
                    jQuery('#sonnyGif').show(); 
                    // all others sonnys now visible
                    jQuery(".sonnyContainer").attr("sonnyWinning","false");
                }, 9000);
            break;   
            case "idle":  
                this.animationTime = 0;      
                if(jQuery("#sonnyGif").attr('animating') == 'true'){
                  return;  
                }
   
                
              
                // jQuery(".sonnyContainer").attr("outroAllowed","true");   
                sonnyImg.src = "./img/"+char+"/idle.gif?t=" + new Date().getTime();                    
                this.idleAnimation = setInterval(() => {
                    this.animationTime++;                    
                    if(char == 'sonny'  && jQuery('#sonnyStatic').attr('char') == 'sonny'){
                        this.animationTime = this.sonnyIdle(this.animationTime,sonnyStatic);
                        jQuery("#badBroStatic").hide(); // turn on sonnyStatic
                    }
                    else { // char == badBro                                                  
                        this.animationTime = this.badBroIdle(this.animationTime,badBroStatic);
                    }                    
                }, 1000);            
            break;
        }
    } // sonny change (end)
    
    
 /*
  * SONNY IDLE
  * time counter (t) that's counting up to 30 seconds
  * Different animation states occur to sonnyStatic
  * sonnyGif hidden until another action happense to badBro
  * @param - INT t - time counter
  * @param - IMG OBJECT - sonny static
  * @return - INT t - time counter
  */
  sonnyIdle(t,sonnyStatic){  
      if(jQuery('#sonnyStatic').attr('idle') == 'false'){
        return;
      }
      jQuery("#sonnyGif").attr('animating','true'); 
      if(t == 1)
        sonnyStatic.src = "./img/sonny/idle.gif?t=" + new Date().getTime(); 
      
      if(t == 3){  
        sonnyStatic.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
        jQuery("#sonnyStatic").show(); // turn on sonnyStatic
        jQuery("#sonnyGif").hide(); // turn off sonnyGif
          
      }
      if(t == 7)
         sonnyStatic.src = "./img/sonny/yawn.gif?t=" + new Date().getTime();
                   
      if(t == 15)
        sonnyStatic.src = "./img/sonny/bounce.gif?t=" + new Date().getTime(); 
      
      if(t == 20)
        t = 0; 
      
      return t;
    }
  
  /*
  * BAD BRO IDLE
  * time counter (t) that's counting up to 30 seconds
  * Different animation states occur to sonnyStatic
  * sonnyGif hidden until another action happense to badBro
  * @param - INT t - time counter
  * @param - IMG OBJECT - sonny static
  * @return - INT t - time counter
  */
  badBroIdle(t,sonnyStatic){
      if(jQuery('#sonnyStatic').attr('idle') == 'false'){
        return;
      }            
            
      if(t == 4){  
        sonnyStatic.src = "./img/badBro/laughing.gif?t=" + new Date().getTime();
        jQuery("#badBroStatic").show(); // turn on sonnyStatic
        jQuery("#sonnyGif").hide(); // turn off sonnyGif     
      }
      if(t == 12)
        sonnyStatic.src = "./img/badBro/idle.gif?t=" + new Date().getTime(); 
            
      if(t == 20)
        sonnyStatic.src = "./img/badBro/sneezing.gif?t=" + new Date().getTime(); 
                      
      if(t == 22)
        sonnyStatic.src = "./img/badBro/idle.gif?t=" + new Date().getTime(); 
      
      if(t == 30)
        t = 0; 
      
    return t;
  }
}
