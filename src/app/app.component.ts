import {Renderer, Component, OnInit,  ElementRef, Input } from '@angular/core';
import {SonnyComponent} from './sonny.component';
import {SonnyDialogue } from './sonny.dialogue.component';
import {SubmitKindnessComplete } from './submit-kindness.component';
import {SonnyHelp } from './help.component';
import { Cordova } from './cordova.directive';
import {CalComponent} from './calander/cal.component';
import {ModalComponent} from './modal.component';
import {WeatherComponent } from './settings/theme/weather.component'
import {KindnessService} from './kindness.service';
import { LetterComponent } from './letter.component';
import {TimeService} from './time.service';
import {checkDayDirective} from './data/checkDay.directive';
import {inputNameEmail} from './inputNameEmail.component';
import {SettingsComponent} from './settings.component';
import { HelpComponent } from './generator/help.component'
import { EditComponent } from './generator/edit.component'
import {PretentiousComponent} from './pretentious.component';
import {ThemeComponent} from './settings/theme/theme.component';
import {TourComponent } from './tour.component';
import {IntroScreens} from './intro-screens.component';
import {BoatComponent} from './settings/theme/boat.component';
import {ChallengeComponent} from './challenge.component';
import {BadBroDialogue} from './badBroDialogue.directive';
import {KindnessGenerator} from './generator/kindness-generator.component';
import {GeneratorBackend} from './generator.component';
import { SendEmail } from './sendEmail.directive';
import { CompassionFlow } from './compassion/flow.component';
import { CompassionData } from './compassion/data.component';
import { SwiperComponent } from './generator/swiper.component';
import { AlternativeKindness } from './alternativeHome/alternateKindnessView.component';
import { settingsTransition } from './settings/settings.transition.directive';
import { themeTransition } from './settings/theme/theme.transition.directive';
import { calanderIntroTransition } from './calander/intro.transition.directive';
import { calanderOutroTransition } from './calander/outro.transition.directive';
import { suggestionsTransition } from './generator/suggestions.transition.directive';
import { finishedTransition } from './finishedKindness/finished.transition.directive';
import { stateManager } from './state/manager.directive';



declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [    
    inputNameEmail,
    SettingsComponent,
    LetterComponent,
    BoatComponent,   
    IntroScreens,
    SonnyHelp,
    SwiperComponent,
    SubmitKindnessComplete,
    SonnyDialogue,
    SonnyComponent,
    KindnessGenerator,
    ModalComponent,
    CompassionFlow,
    CalComponent,
    calanderOutroTransition,
    GeneratorBackend,    
    // AlternativeKindness,
    WeatherComponent,
  ],
  providers: [
    HelpComponent,
    ModalComponent,
    SubmitKindnessComplete,
    Cordova, 
    AlternativeKindness,
    CompassionData,
    LetterComponent,
    SendEmail,
    SwiperComponent,
    inputNameEmail,
    BadBroDialogue,
    KindnessGenerator,
    SettingsComponent,
    ChallengeComponent,
    TimeService,
    IntroScreens,
    BoatComponent,
    KindnessService,
    ThemeComponent,
    PretentiousComponent,
    SonnyComponent,
    SonnyHelp,
    SonnyDialogue,    
    WeatherComponent,
    GeneratorBackend,
    CalComponent,
    calanderIntroTransition,
    calanderOutroTransition,
    TourComponent, 
    CompassionFlow,
    EditComponent,
    stateManager,
    finishedTransition,
    calanderIntroTransition,
    suggestionsTransition,
    checkDayDirective
  ]
})

export class AppComponent  implements OnInit{
  
  private calVisit = 0;
  public title = "Kindness App";
 

    constructor(  
      private renderer: Renderer,
      private cordova : Cordova,    
      private alternativeKindness : AlternativeKindness,
      private compassionFlow : CompassionFlow,
      private inputNameEmail : inputNameEmail, 
      private calanderIntroTransition : calanderIntroTransition,
      private challengeComponent : ChallengeComponent,
      private sonnyHelp : SonnyHelp,
      private generatorBackend : GeneratorBackend,
      private settingsComponent : SettingsComponent,
      private themeComponent: ThemeComponent,
      private finishedTransition : finishedTransition,
      private tourComponent : TourComponent,
      private IntroScreens : IntroScreens,
      private submitKindnessComplete : SubmitKindnessComplete,
      private kindnessGenerator : KindnessGenerator,
      private sonnyDialogue : SonnyDialogue,
      private sendEmail :  SendEmail
      ) {

        renderer.listenGlobal('document', 'pause', (event) => {
              this.cordova.onResume();
        })

      }

    ngOnInit(){  
     this.IntroScreens.intIntro();
     this.IntroScreens.sonnyAnimations();     
     jQuery('.kindnessCal .menuItem').attr('goCal','true');
     jQuery('#sonnyIcon').attr('settings','true');     
    }
    
    /*
    * SONNY (ICON) CLICK
    * On #sonnyIcon: 
    * if settings attr true - app.component
      * intSettings() - settings.component
    * else 
      * removeGenerator() - kindness-generator.component
    */

    goToIntention(){
      jQuery('.sonnyDialogue').attr('generatorMode','true'); 
      this.kindnessGenerator.intGenerator()
    }

    sonnyClick(){
      setTimeout(() => {  
        jQuery('kindness-generator-component, #kindness-generator, #doneView').css('opacity','1');
      }, 1000); 
      jQuery('#themeChange').hide();
      var sounds = document.getElementsByTagName('audio');
      for(var i=0; i<sounds.length; i++) sounds[i].pause();

      
      if(jQuery('#sonnyIcon').attr('settings') == 'true'){
        this.settingsComponent.intSettings();
      }
      else{ // removeGenerator()
        jQuery('.missionView').hide();
        jQuery('.classicView').hide();
       
        this.kindnessGenerator.removeGenerator();
        
        
        if(jQuery('#sonnyStatic').attr('char') == 'sonny'){
          this.sonnyDialogue.greeting();    
        }     
        
        this.finishedTransition.intDone();
        
        // change #sonnyIcon
        jQuery('#sonnyIcon img').attr('src','./img/icons/more.png');
        jQuery('#sonnyIcon img').css('margin-top','0px');
        jQuery('#sonnyIcon p').html('more');
      
        // sonny icon when clicked goes to settings
        jQuery('#sonnyIcon').attr('settings','true');
        
      }
    }
}




  /**
   * Determine the mobile operating system.
   * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
   *
   * @returns {String}
   */
  // function getMobileOperatingSystem() {
  //   var userAgent = navigator.userAgent || navigator.vendor;

  //       // Windows Phone must come first because its UA also contains "Android"
  //     if (/windows phone/i.test(userAgent)) {
  //         return "Windows Phone";
  //     }

  //     if (/android/i.test(userAgent)) {
  //         return "Android";
  //     }

  //     if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
  //       // run your code here
  //       return "iOS";
  //     }


  //     return "unknown";
  // }
