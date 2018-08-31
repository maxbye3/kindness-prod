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
import { finishedTransition } from '../finishedKindness/finished.transition.directive';
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
   private swiperComponent : SwiperComponent,
   private finishedTransition: finishedTransition,
   private sonnyDialogue : SonnyDialogue,
   private inputNameEmail : inputNameEmail,
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
      this.finishedTransition.intDone();

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
        this.removeGenerator();
       
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

   /*
   * INT GENERATOR
   * Edit existing #sonnyIcon and .kindnessCal
   * Determine what screen is going based on if day has been done or not
   * Set attr so above buttons work as expected
   * Set up .accept btn and content based on screen-size
   * Setup .kindnessTxt and content
   */
   intGenerator(){ 

        var classname;

        this.alternativeKindness.changeSonny(); // change #sonnyIcon

        // var classname, fontSize;
        jQuery('#kindness-generator').attr('active','true');
        // set kindness-done to analytics
        // jQuery('#sonnyGif').attr('onclick', 'analytics("kindness_generator")').click(); 
      
      
        // Custom kindness button
        jQuery('.customKindness').hide(); 

        // edit box
        // jQuery('.kindnessCal img').attr('src','./img/icons/edit.png');
        // jQuery('.kindnessCal p').html('edit');
        jQuery('.kindnessCal .menuItem').css('width','45vw');
        

        // width screen
        // jQuery('.kindnessCal .menuItem').css('width','10vw');
        // sonny is allowed to be idle
        jQuery('#sonnyStatic').attr('idle','true');        
        jQuery('.swiper-container h1, .kindnessTxt').show();

        if(jQuery('#sonnyGif').attr('char') == 'badBro'){ 

          jQuery('.swiper-container h1').html('Choose an evil action: ');
          jQuery('.swiper-container h2').css('color','#b6e5ed');

          // populate data
          // insert kindnessTxt into swiper
          var data = this.generatorBackend.evilData;
          this.swiperComponent.populateData(data);
          jQuery('.sonnyDialogue').attr('resetSwiper', 'evil');  
          
          jQuery('.editContainer p,.editContainer img').hide();
          jQuery('.sliderComponent').css({'color':'white'});
          // localStorage.setItem('intentionNum','0');
          // launch bad bro dialogue
          this.badBroDialogue.dialogue('idle',["Here's some gnarly ideas for you to chew"]);
          classname = 'pretentious';
          // fontSize = '5vw';
          // jQuery('.kindnessCal p').css({'font-family':'evil','color':'white'});
          
          // change #sonnyIcon
          jQuery('#sonnyIcon img').attr('src','./img/icons/badBro.png');
          jQuery('#sonnyIcon img').css('margin-top','5px');
          // jQuery('#sonnyIcon p').html('back');
          jQuery('.kindnessTxt').css({'font-family':'evil','font-size':'5vw','color':'white'});
        }
        else {     // KINDNESS MODE  
          
          setTimeout(function(){     
              var topPos = jQuery('.sliderComponent').position().top + jQuery('.sliderComponent h1').height() + jQuery('.swiper-slide-active').height();
              jQuery('.customKindness').fadeIn();
              jQuery('.customKindness').css('top', (jQuery('.accept').position().top - 50))
          }, 2000);

          // swiper font goes white from evil mode 
          jQuery('.sliderComponent ').css('color','black')
          classname = '';
          jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
          jQuery('.swiper-container h2').css('color','#b6e5ed');
          // insert kindnessTxt into swiper

          data = this.generatorBackend.data;
          this.swiperComponent.populateData(data);

          // change fonts back
          jQuery('.kindnessCal p').css('font-family','kindness');
          jQuery('.kindnessTxt').css({'font-family':'kindness','font-size':'7.5vw','color':'black'});

          // change sonny char
          var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");
          sonnyImg.src = "./img/sonny/idle.gif?t=" + new Date().getTime();
        
          // sonny introduces the feature          
          this.sonnyDialogue.greeting();
        
        }    
        
       
     
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
       jQuery('.kindnessContainer,.realStopHelp, .helpMenu, .accept').show();
       
       // bring in #kindnessView
       jQuery('kindness-generator-component').show();
       jQuery('#kindness-generator').css('position', 'inherit');       
       document.getElementById('kindness-generator').className = "";  
       document.getElementById('kindness-generator').className += " intro " + classname;
       
       // hide specifics
       jQuery('.editKindness').hide();
       jQuery('.generatorEdit, .kindnessEdit, .editContainer, .realStopHelp').hide();

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
      jQuery('.accept .menuItem').css('width', (jQuery(window).width()-21));
      jQuery('.arrow').show();
     
     // kindnessTxt vertical & horizontal positison on page
     this.swiperComponent.kindnessDimension();
     if(jQuery('#sonnyGif').attr('char') == 'badBro'){ 
      this.swiperComponent.enableSlider(data, 'evil');
     }
     else{
      this.swiperComponent.enableSlider(data, 'kindness');
     }

    // fix the height of swiper
    this.swiperComponent.kindnessContainerHeight(true);
    this.swiperComponent.arrowContainerHeight();
    
    // this.generatorBackend.badBroOut();
    
    // if(navigator.userAgent.match(/iPad/i) != null){
      
      // setTimeout(function(){     
      //   jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
      //   jQuery('.kindnessEdit').show().val("Loading...");
      //   jQuery('.accept p').html('loading...');
      //   jQuery('.swiper-container h1').html('One second');
      //   ; 
      // }, 1000);

      // setTimeout(function(){  
        jQuery('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
        jQuery('.accept p').html('accept');
        jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
        jQuery('.swiper-container h2').show();
        jQuery('.editMenu .menuItem, .kindnessEdit').hide();
      // }, 1500);

      
    var userAgent = navigator.userAgent || navigator.vendor;
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setTimeout(function(){     
        jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
        jQuery('.kindnessEdit').show().val("Loading...");
        jQuery('.accept p').html('loading...');
        jQuery('.swiper-container h1').html('One second');
        ; 
      }, 1000);

      setTimeout(function(){  
        jQuery('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
        jQuery('.accept p').html('accept');
        jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
        jQuery('.swiper-container h2').show();
        jQuery('.editMenu .menuItem, .kindnessEdit').hide();
      }, 1500);
    }
  }
   
  /*
   * REMOVE GENERATOR
   * Move from #kindness-generator to #kindnessView
   * Set attr of #sonnyIcon and kindnessCal
   * Change look and appearance of buttons above
   */
   removeGenerator(){ 
       // If in help stop
       this.helpComponent.stopHelp();
   
       jQuery('#kindness-generator').attr('active','false');
       jQuery('.sonnyDialogue').attr('resetSwiper','false');
       jQuery('.sonnyDialogue').attr('generatorMode', 'false')

       // show kindness generator - hidden when badBro talks
       jQuery('#sonnyIcon, .helpMenu,.accept,.kindnessCal,.control').show();
       
       //  jQuery('.control').show();

        // width screen
        // jQuery('.kindnessCal .menuItem').css('width','90vw');
      
       // Check if badBro if(){
       if(jQuery('#sonnyStatic').attr('char') != 'sonny' || jQuery('#sonnyIcon img').attr('src') == "./img/icons/badBro.png"){                                                         
          jQuery('#sonnyStatic').attr('char','badBro');
          jQuery('.sonnyDialogue').hide();
          jQuery('.preventHands, .handsContainer').show();                                         
          this.badBroDialogue.greeting();
       }
       else{
          // change sonny char
          var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");
          sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();
       }
       
       // change UI on home screen
       this.generatorBackend.checkIntention();
      
       // Hide Sonny options
       jQuery('.stillNasty .backToKindness, .kindnessTxt').hide(); 
      
       // remove #kindness-generator
       jQuery('#kindness-generator').css('position', 'absolute');
       if(jQuery('.sonnyDialogue').attr('generatorMode') == 'compassion'){
        jQuery('#kindness-generator').css('top', '30%');
       }
       document.getElementById('kindness-generator').className = "";  
       document.getElementById('kindness-generator').className += " outro";
       if(jQuery('#doneView').attr('dayDone') == "false"){ 
        // bring in #kindnessView
        jQuery('#kindnessView').show();  
        document.getElementById('kindnessView').className = "";  
        document.getElementById('kindnessView').className += " intro";
       }
       else{
        // bring in #doneView
        jQuery('#doneView').show();  
        document.getElementById('doneView').className = "";  
        document.getElementById('doneView').className += " intro";
       }
       
       // send sonny back
       jQuery('.sonnyContainer').css('z-index','6');
       
       // return font to non-evil
       jQuery('.kindnessCal p, #sonnyState').css('font-family','kindness')
       
       // change .kindnessCal
       jQuery('.kindnessCal img').attr('src','./img/caly/chatIdle.png');
       jQuery('.kindnessCal img').css({'float' : 'right','border' : 'none'});
       jQuery('.kindnessCal img').css('marginTop',(jQuery('.goToCal').height() - jQuery('.goToCal img').height())/2);
       jQuery('.kindnessCal p').html('check progress');
      //  jQuery('.kindnessCal p').css({'font-size' : '30px'});
       jQuery('.kindnessCal .menuItem').css('padding','2px 5px');
       // add class to calander
       jQuery('.kindnessCal .menuItem').addClass('goToCal');       
       // sonny click goes to editTask
       jQuery('.kindnessCal .menuItem').attr('goCal','true');
       
       // hide the controls
       jQuery('.control').hide();

       // cal icon when clicked goes to calander
       jQuery('.kindnessCal .menuItem').attr('goCal','true');  
  
       jQuery('#sonnyStatic').attr('idle','false');

       // hide scroll to go back - odd effect
      jQuery('.sliderComponent, .arrow, .helpMenu, .accept').hide();

      jQuery('.customKindness').fadeOut();
       

       setTimeout(() => {        
         // stop sonny from being idle
         jQuery('#sonnyStatic').attr('idle','false'); 

         // hide scroll to go back - odd effect
         jQuery('.arrow, .helpMenu, .accept').hide();
         jQuery('.sliderComponent').hide();

       }, 500);        
        
   }
   
   tryKindness(){    
     jQuery('#sonnyIcon').show();
     jQuery('#sonnyIcon img').attr('src',"./img/icons/sonny.png");
     this.themeComponent.seasonTheme('summer');
     jQuery('#sonnyState, .kindnessCal p').css('font-family','kindness');
     this.removeGenerator();
   }
}