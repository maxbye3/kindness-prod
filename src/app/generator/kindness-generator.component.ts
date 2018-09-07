import {Component} from '@angular/core';
import { SonnyDialogue } from '../sonny.dialogue.component';
import { GeneratorBackend } from '../generator.component';
import { PretentiousComponent } from '../pretentious.component';
import { BadBroDialogue } from '../badBroDialogue.directive';
import { ThemeComponent } from '../settings/theme/theme.component';
import { inputNameEmail } from '../inputNameEmail.component';
import { SwiperComponent } from '../generator/swiper.component';
import { AlternativeKindness } from '../alternativeHome/alternateKindnessView.component';
import { HelpComponent } from '../generator/help.component'
import { EditComponent } from '../generator/edit.component'
import { finishedTransition } from '../state/states/finished.transition.directive';
import { suggestionsTransition } from '../generator/suggestions.transition.directive';
declare var jQuery: any;
declare var Swiper: any;


@Component({
    selector: 'kindness-generator-component',
    templateUrl: 'app/generator/kindness-generator.html',
    styleUrls: ['app/generator/kindness-generator.css'],
    directives: [SwiperComponent],
    providers: [finishedTransition, SwiperComponent, ThemeComponent,SonnyDialogue,GeneratorBackend, BadBroDialogue, inputNameEmail]
})

export class KindnessGenerator {
    
  constructor(
   private suggestionsTransition : suggestionsTransition,
   private swiperComponent : SwiperComponent,
   private finishedTransition: finishedTransition,
   private sonnyDialogue : SonnyDialogue,
   private generatorBackend : GeneratorBackend,
   private badBroDialogue : BadBroDialogue,
   private themeComponent : ThemeComponent,
   private alternativeKindness: AlternativeKindness,
   private helpComponent : HelpComponent,
   private editComponent : EditComponent
   ) {    
  }
  

  /*
   * SAVE (CHANGES)
   * Find out if presenting input or regular text
   * Hide save and edit
   * Get kindness text   
   * Save changes generator-service
   * Subsequent clicks go to calander
   * @param - BOOL complain - whether to save or not 
   */
   accepted(save){

      // save slide to local storage
      var slideNumber = jQuery('.sliderComponent').attr('currentSlide');
      
      // make sure sonny icon says more
      jQuery('#sonnyIcon img').attr('src','./img/icons/more.png');
      jQuery('#sonnyIcon img').css('margin-top','0px');
      jQuery('#sonnyIcon p').html('more');
      jQuery('#sonnyIcon').attr('settings','true');
      
      // jQuery('.control').show();
      jQuery('.kindnessTxt').hide();

      if(save == true){
        // save in local storage that this is true
        localStorage.setItem('intention', 'true');   
     
        // A regular kindness       
        var kindness = jQuery('.swiper-slide-active').html();      
        localStorage.setItem('isCustom', 'false' );
          
          
        // save slide to local storage
        var task = jQuery('.sliderComponent').attr('currentSlide'); 
        // iterate plus one so people stop doing coffee
        var taskNumber = parseInt(task);
        taskNumber = taskNumber + 1; // iterate
        task = String(taskNumber);

        // save to backend     
        localStorage.setItem('intentionNum', task); 
        task = this.generatorBackend.descrptionData[task][0];
        
        // sonny congratualates the user
        this.sonnyDialogue.introSonny('intention-set');
        this.sonnyDialogue.sonnySpeech(['Nice one! Your intention has been set to: ', task, 'Good luck!!']);
        
        // remove everything
        this.suggestionsTransition.removeSuggestions();
       
      }
      else{
        // return controls to none
        kindness = jQuery('.kindnessTxt').attr('txt');
        jQuery('.kindnessTxt').show().html(kindness);
      }
      
      // kindnessTxt vertical & horizontal positison on page
      this.swiperComponent.kindnessDimension();

      // change .kindnessCal
      jQuery('.generatorEdit, .kindnessEdit,.editContainer').hide();

      // sonny click goes to editTask
      jQuery('.kindnessCal .menuItem').attr('goCal','false');
      
      // remove class from calander
      jQuery('.kindnessCal .menuItem').removeClass('goToCal');

      // don't save if bool false
      if(save == false){
        return;
      }

      // subsequent clicks go to calander
      jQuery('.kindnessCal .menuItem').attr('goCal','true');
      
      // go to kindness mode
      jQuery('#kindnessView').show()         
      document.getElementById('kindnessView').className = "";  
      document.getElementById('kindnessView').className += " intro";

   }
  
   tryKindness(){    
     jQuery('#sonnyIcon').show();
     jQuery('#sonnyIcon img').attr('src',"./img/icons/sonny.png");
     this.themeComponent.seasonTheme('summer');
     jQuery('#sonnyState, .kindnessCal p').css('font-family','kindness');
     this.suggestionsTransition.removeSuggestions();
   }
}