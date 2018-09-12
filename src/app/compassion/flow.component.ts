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
import { CompassionData } from './data.component';
import { TimeService } from '../time.service';
declare var jQuery: any;
declare var Swiper: any;

@Component({
    selector: 'compassion-flow-component',
    templateUrl: 'app/generator/kindness-generator.html',
    styleUrls: ['app/generator/kindness-generator.css'],
    directives: [SwiperComponent],
    providers: [AlternativeKindness, SwiperComponent, ThemeComponent,SonnyDialogue,CompassionData, BadBroDialogue, inputNameEmail]
})

export class CompassionFlow {
    
  constructor(
   private swiperComponent : SwiperComponent,
   private timeService: TimeService,
   private sonnyDialogue : SonnyDialogue,
   private inputNameEmail : inputNameEmail,
   private generatorBackend : GeneratorBackend,
   private badBroDialogue : BadBroDialogue,
   private compassionData : CompassionData,
   private themeComponent : ThemeComponent,
   private alternativeKindness: AlternativeKindness,
   private helpComponent : HelpComponent
   ) {    
  }
  
 /*
 * INT GENERATOR
 * Edit existing #sonnyIcon and .kindnessCal
 * Determine what screen is going based on if day has been done or not
 * Set attr so above buttons work as expected
 * Setup .kindnessTxt and content
 */
 intGenerator(){ 
      var classname;

      this.alternativeKindness.changeSonny(); // change #sonnyIcon

      // var classname, fontSize;
      jQuery('#kindness-generator').attr('active','true');
      // set kindness-done to analytics
      // jQuery('#sonnyGif').attr('onclick', 'analytics("kindness_generator")').click(); 
    
  
      jQuery('.kindnessCal .menuItem').css('width','45vw');
      

      // width screen
      // jQuery('.kindnessCal .menuItem').css('width','10vw');
      // sonny is allowed to be idle
      jQuery('#sonnyStatic').attr('idle','true');
      
      jQuery('.kindnessTxt').show();
      // jQuery('.control').show();



        // swiper font goes white from evil mode 
        jQuery('.sliderComponent ').css('color','black')
        classname = '';
        jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
        jQuery('.swiper-container h2').css('color','#57a3b0');
        // insert kindnessTxt into swiper
        var data = this.compassionData.data;
        this.swiperComponent.populateData(data);

        // change fonts back
        jQuery('.kindnessCal p').css('font-family','kindness');
        jQuery('.kindnessTxt').css({'font-family':'kindness','font-size':'7.5vw','color':'black'});

        // change sonny char
        var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");
        sonnyImg.src = "./img/sonny/idle.gif?t=" + new Date().getTime();
      
        // sonny introduces the feature    
        jQuery('.sonnyDialogue').attr('generatorMode','compassion'); 
        jQuery('.sonnyDialogue').attr('resetSwiper', 'compassion');     
        this.sonnyDialogue.greeting();
      
   
     if(jQuery('#doneView').css('display') != 'none'){ // day is done
       // remove #doneView
       document.getElementById('doneView').className = "";  
       document.getElementById('doneView').className += " outro"; 
       jQuery('#doneView').attr('dayDone','true'); // right view when remove
     } 
     else{       
       // remove #kindness-generator
       document.getElementById('kindnessView').className = "";  
       document.getElementById('kindnessView').className += " outro";
       jQuery('#doneView').attr('dayDone','false'); // right view when remove
     }
     
     // bring all the nessecaries
     jQuery('.kindnessContainer,.realStopHelp, .helpMenu').show();
     
     // bring in #kindnessView
     jQuery('kindness-generator-component').show();
     jQuery('#kindness-generator').css('position', 'inherit');       
     document.getElementById('kindness-generator').className = "";  
     document.getElementById('kindness-generator').className += " intro " + classname;
     
     // hide specifics
     jQuery('.editKindness').hide();
     jQuery('.swiper-container h1, .kindnessTxt, .generatorEdit, .kindnessEdit, .editContainer, .realStopHelp').hide();

     // sonny scene
     jQuery('.furniture').fadeOut();

    // change 'see progress' to 'progress'
    if(jQuery(window).width() < 440){
      jQuery('.goToCal p').html('progress');
    }
    // change font size
    jQuery('.kindnessCal .menuItem p').css({'margin':'0px','margin-top':'11px','font-size':'20px'});
    jQuery('.kindnessCal .menuItem img').attr('src','./img/icons/caly.svg').css({'margin-top':'5.5px','border':'black solid 1px', 'border-radius':'200px','width':'30px','margin-bottom':'7.5px'});

    // sonny click goes to editTask
    jQuery('.prev').show();
   
   // kindnessTxt vertical & horizontal positison on page
   this.swiperComponent.kindnessDimension();
   this.swiperComponent.enableSlider(data, 'compassion');
   
   // fix the height of swiper
   jQuery('.sliderComponent').css('top','30%');
   jQuery('.sliderComponent').css('opacity','1');
   jQuery('.accept').hide();
   jQuery('.customKindness').hide();
   
  this.swiperComponent.arrowContainerHeight();



  jQuery('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
  jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
  jQuery('.swiper-container h2').show();
  
  
  // setTimeout(function(){     
  //   jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
  //   jQuery('.kindnessEdit').show().val("Loading...");
  //   jQuery('.swiper-container h1').html('One second');
  // }, 500);

  // setTimeout(function(){     
  //   jQuery('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
  //   jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
  //   jQuery('.swiper-container h2').show();
  // }, 1000);

      if(navigator.userAgent.match(/iPad/i) != null){
      var userAgent = navigator.userAgent || navigator.vendor;
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        setTimeout(function(){     
          jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
          jQuery('.kindnessEdit').show().val("Loading...");
          jQuery('.swiper-container h1').html('One second');
          // jQuery('.kindnessEdit').attr('editKindness','true'); 
          ; 
        }, 500);

        setTimeout(function(){     
          jQuery('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
          jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
          jQuery('.swiper-container h2').show();
        }, 1000);
      }
    }
  }
 
}