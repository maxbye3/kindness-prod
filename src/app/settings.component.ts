import {Component, OnInit,  ElementRef, Input } from '@angular/core';
import {Injectable } from '@angular/core';
import {SonnyDialogue} from './sonny.dialogue.component';
import {ModalComponent} from './modal.component';
import {PretentiousComponent} from './pretentious.component';
import {SonnyHelp} from './help.component';
import {ThemeComponent} from './settings/theme/theme.component';
import {ChallengeComponent} from './challenge.component';
import { GeneratorBackend } from './generator.component';
import { SendEmail } from './sendEmail.directive';
import { BadBroDialogue } from './badBroDialogue.directive';
import { inputNameEmail } from './inputNameEmail.component';
import { KindnessService } from './kindness.service';
import { CompassionFlow } from './compassion/flow.component';
import { suggestionsTransition } from './generator/suggestions.transition.directive';
import { finishedTransition } from './state/states/finished.transition.directive';
import { AlternativeKindness } from './alternativeHome/alternateKindnessView.component';
declare var jQuery: any;

@Component({
  selector: 'settings-component',
  templateUrl: 'app/settings.component.html',
  styleUrls: ['app/settings.component.css'],
  providers: [ModalComponent, AlternativeKindness, CompassionFlow, KindnessService, inputNameEmail, BadBroDialogue, GeneratorBackend, suggestionsTransition, ChallengeComponent,SonnyDialogue,SonnyHelp,PretentiousComponent,ThemeComponent, SendEmail]
})

@Injectable()
export class SettingsComponent implements OnInit{
    private whoKind;
    private communityLink = "https://partner.plumis.com/login.php";
    private settings;
    
    constructor(
      private finishedTransition: finishedTransition,
      private modalComponent: ModalComponent,
      private compassionFlow : CompassionFlow,
      private kindnessService : KindnessService,
      private sonnyDialogue : SonnyDialogue,
      private badBroDialogue : BadBroDialogue,
      private inputNameEmail : inputNameEmail,
      private suggestionsTransition : suggestionsTransition,
      private sonnyHelp : SonnyHelp,
      private alternativeKindness : AlternativeKindness,
      private themeComponent : ThemeComponent,
      private challengeComponent : ChallengeComponent, 
      private pretentiousComponent : PretentiousComponent,
      private generatorBackend : GeneratorBackend,
      private sendEmail :  SendEmail
      ) {}

    ngOnInit(){      
      this.isPretentious();
    }

    /*
    * LAUNCH COMPASSION FLOW
    * Disable settings
    * If badBro then reset to summer
    * Launch compassion flow
    */
    intFlow(){
      this.back();
      if(jQuery('#sonnyStatic').attr('char') == 'badBro' ){
        this.themeComponent.setTheme('summer');
        
          // always start as nice guy
          jQuery('.narcissimTxt').html('Tired of being nice?');
          jQuery(".settingsMenuItem img").attr('src','./img/icons/sonny.png');
          jQuery(".kindnessCal").show();
          jQuery('.speechDiv').show();
          jQuery(".square-radio").removeClass("square-radio--clicked");
  
  
          // change #sonnyIcon
          jQuery('#sonnyIcon img').attr('src','./img/icons/more.png');
          jQuery('#sonnyIcon img').css('margin-top','0px');
          jQuery('#sonnyIcon p').html('more');
      }
      jQuery('.sonnyDialogue').attr('generatorMode','true');
      this.compassionFlow.intGenerator();
    }
    
    /*
    * IS PRETENTIOUS(?)
    * MAX: CHECK
    * Remove square radio if is
    */
    isPretentious(){  
      jQuery(".square-radio").removeClass("square-radio--clicked");
    } 


    /*
    * INT OR REMOVE NARCISSISM
    * UI Change
    * Determine on click whether to remove or int pretentious    
    * Launch or remove pretentious actions (without sliding back)
    */
    togglePretentiousMode(){ 
        // if(this.kindnessService.loadData() < 5){
        //   this.modalComponent.intModal('You must complete 5 kindness in 5 days to unlock', "Won't be shown", 'Go Back', false);
        // }
        // else{
          jQuery(".square-radio").toggleClass("square-radio--clicked");
          jQuery('.compassionSelect').hide();
          var pretentiousTrue = jQuery(".square-radio--clicked").css("display");
          if(pretentiousTrue){
            // turn pretentious mode on                 
            jQuery(".skipContainer").attr('theme','pretentious');
            jQuery('#sonnyGif').attr('char','badBro'); 
            
            
            this.themeComponent.setTheme("pretentious");
            jQuery('.sonnyContainer').attr('introallowed','true');
            
          }
          else{
            jQuery('.compassionSelect').show();
            this.pretentiousComponent.removeScene();
            this.themeComponent.setTheme("summer");
            this.alternativeKindness.backToKindness();
          }
          this.returnHome();      
          this.back();
          // this.finishedTransition.intDone();
      //  }
    }/* int / remove narcissism */
    
    /*
    * INITIALISE SETTINGS
    * If #sonnyIcon settings attr true - app.component 
    * Hide sonnyIcon
    * Turn on opacity on more
    * Launch settings css animation
    */
    intSettings(){
      jQuery('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
      
      // remove the btns
      this.generatorBackend.checkIntention();
      
      // stop bad bro dialogue
      if(jQuery(".sonnyContainer").attr("outroAllowed") == 'true'){
        this.badBroDialogue.dialogue('exit',['']);  
      }
      
      jQuery('.sonnyDialogue').fadeOut();
      setTimeout(() => {
        jQuery('#settingsH1').css({'border':'solid rgba(256,256,256,1) 2px'});  
      }, 500);  
     jQuery('#sonnyIcon').hide();
     jQuery(".settings").show().css("animation","settingsIntro 1s");
    }
    

   /*
    * INT CHALLENGE
    * Set to 0 
    * load compassion elements
    */
    intCompassion(){
      this.back();
      var compassionNum = localStorage.getItem("compassionChallenge");        
      if(compassionNum == null || compassionNum == "null" || compassionNum == "no"){
        jQuery('.modalBox').attr('compassionState','start');
        this.challengeComponent.startCompassion(); 
        this.modalComponent.intModal('Compassion Challenge challenges you to record 5 kindnesses in 5 days', "Let's do it!", 'Maybe later', true);
        // this.sonnyDialogue.greeting();
      }
      else{
        // cancel compassion challenge
        // Ask user if they really want to stop with alert
        jQuery('.modalBox').attr('compassionState','stop');
        this.modalComponent.intModal('Are You Sure? <br> None of your data will be lost but your challenge will restart to day one...', "I'm sure", 'Changed my mind', true);
  
      }   
      // this.back(); 
      // this.sonnyDialogue.greeting();              
      // this.finishedTransition.intDone();
    }

    /*
    * GO TO INTENTION
    * Remove the settings menu
    * Go to Intention Screen
    */
    goToIntention(){      
      this.back();
      jQuery('.sonnyDialogue').attr('generatorMode','true');
      this.suggestionsTransition.intSuggestions();
    }
    /*
    * Cancel intention
    * Go back
    * Turn localStorage.getItem('intention') to false
    * CheckIntention()
    */
    cancelIntention(){      
      localStorage.setItem('intention','false');
      this.generatorBackend.checkIntention();
      
      // go to intention
      jQuery('#doneView').hide()
      this.suggestionsTransition.intSuggestions();
      jQuery("#kindnessView").hide();
      
      this.back();   
    }
    
    goCommunity(){
      location.href=this.communityLink;
    }
   
   /*
   * Return Home
   * Go backa  page
   * Get badBro or Sonny to say something
   */  
   returnHome(){
        this.back();
        if(jQuery('#sonnyGif').attr('char') == 'badBro'){ 
          // launch bad bro dialogue
          this.pretentiousComponent.intBad('greet');
          if(jQuery('#kindnessView').attr('kindnessComplete') != 'true'){
            document.getElementById("kindnessView").className = "";  
            document.getElementById("kindnessView").className += " intro";
            jQuery('#kindnessView').show();
          }
          jQuery('.missionView, .completeContainer').hide();
          jQuery('.intentionTask').css('width','auto');
          jQuery('.classicView').show();
        }
        else {
          jQuery('.completeContainer').show();
          jQuery('.intentionTask').css('width','75%');
          this.sonnyDialogue.greeting();
        }    
    }

    themeView(){
      // sonny talks about themes
      jQuery('.sonnyDialogue').attr('theme', 'int');

      if(jQuery('#sonnyGif').attr('char') == 'badBro'){ 
        this.pretentiousComponent.changeTheme();          
      }
      else{ // sonny
        this.themeComponent.sonnyComment();
      }
      if(jQuery("#settingsView").css('display') != 'none'){
        this.returnHome()         
      }

      // remove kindness view
      var kindnessView = 'kindnessView';
      document.getElementById(kindnessView).className = "";  
      document.getElementById(kindnessView).className += " outro";

      // show themeChange   
      var themeChange = 'themeChange';
      jQuery('#' + themeChange).show();
      document.getElementById(themeChange).className = "";  
      document.getElementById(themeChange).className += " intro";

      // hide everything
      jQuery('kindness-generator-component, #kindness-generator, #doneView').css('opacity','0');
      setTimeout(() => {        
        jQuery('kindness-generator-component, #kindness-generator, #doneView').css('opacity','0');
      }, 500);

    }
    
    /*
    * GO BACK
    * Hide settings
    * Launch Sonny but not in generator mode
    */
    back(){     
       jQuery('#sonnyIcon').show();   
       jQuery(".settings").show().css("animation","settingsOutro 1s");
      //  jQuery('.kindnessCal img').attr('src','./img/icons/caly.svg');
       setTimeout(() => {
         jQuery(".settings").hide();        
       }, 500);         
    }

    goMoonhead(){
      var URL = "http://thekindnessapp.com";
      window.open(URL, "_blank");
    }
    /*
    * Setting up dialogue for different forms
    */
    questionTime(type){      
      document.getElementById("settingsView").style.display = "none";
      document.getElementById("mrMoonhead").style.display = "block";
      jQuery("textarea").html("");// remove the message in text area
      var placeholder, blurb;
      if(type=='bug'){
        placeholder = 'Write the bugs you want busted...';
        blurb = "A bug in the app you say?! Well, no app is perfect. <br> However, you are helping to make this app better for everyone who uses it. <br> Write the issue below and I'll squash it asap.";
        this.settings = "bug";
      }
      else if(type=='comment'){
        placeholder = 'Let go of all your words here...';
        blurb = "You got something you say!?<br> (All thoughts are appreciated, <br> thanks for taking the time!!) ";
        this.settings = "comment";
      }
      else if(type=='question'){
        placeholder = 'Type all your personal questions here...';
        blurb = "If you have any questions, I'm all ears! <br> Write your question below.";
        this.settings = "question";
      }
      else if (type == 'suggestion'){
        placeholder = 'Type in your name and kindness suggestion here...';
        blurb = "You want to add a kindness for other people? <br> Nice one! I had a real struggle coming up with 100 ideas so your help is totally appreciated. Here's the thing: suggestion should be as free (as possible) & accessible to everyone. Include your name so I can give credit!"; 
        this.settings = "suggestion";       
      }
      jQuery("textarea").attr("placeholder",placeholder);  
      jQuery(".blurb").html(blurb);
      jQuery('.settingsTxt').css('width', jQuery(window).width() - 35)
    }
    
    /*
    * SUBMIT (YOUR MESSAGE)
    * Message is sent to sendEmail service
    * Thank the user
    */
    submit(){
      
      if(jQuery("textarea").val() == ""){
        return;
      }
      
      this.sendEmail.send(this.settings,jQuery("textarea").val());
      jQuery(".blurb").html("Message sent. Thanks!");     
      jQuery("textarea").val('');
      this.moonhead_back();
    }

    moonhead_back(){
      document.getElementById("settingsView").style.display = "block";
      document.getElementById("mrMoonhead").style.display = "none";
      jQuery("textarea").val('');
    }



    /*
    * STYLE THE INPUTS
    */
    inputStyle(input){
      input.margin = "0px";
      input.fontSize = "30px";
      input.background = "rgba(256,256,256,0.7)";
      input.padding = "5px";
      input.marginBottom = "30px";
      input.width = "100%";
      input.border = "none";
    }
}

