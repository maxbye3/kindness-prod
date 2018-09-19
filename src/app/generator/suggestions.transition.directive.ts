import { Directive } from '@angular/core';
import { SonnyDialogue } from '../sonny.dialogue.component';
import { GeneratorBackend } from '../generator.component';
import { BadBroDialogue } from '../badBroDialogue.directive';
import { inputNameEmail } from '../inputNameEmail.component';
import { SwiperComponent } from '../generator/swiper.component';
import { AlternativeKindness } from '../alternativeHome/alternateKindnessView.component';
import { HelpComponent } from '../generator/help.component'
import { finishedTransition } from '../state/states/finished.transition.directive';
import { stateManager } from '../state/manager.directive';
import { settingsTransition } from '../settings/settings.transition.directive';
declare var $: any;




@Directive({
  providers: [settingsTransition, stateManager, finishedTransition, SwiperComponent, SonnyDialogue,GeneratorBackend, BadBroDialogue, inputNameEmail]
})

export class suggestionsTransition { // MAX CHECK THIS

  constructor(
    private settingsTransition : settingsTransition,
    private swiperComponent : SwiperComponent,
    private sonnyDialogue : SonnyDialogue,
    private generatorBackend : GeneratorBackend,
    private badBroDialogue : BadBroDialogue,
    private alternativeKindness: AlternativeKindness,
    private stateManager: stateManager,
    private helpComponent : HelpComponent
    ) {    
   }

  
   /*
   * INT SUGGESTIONS
   * Edit existing #sonnyIcon and .kindnessCal
   * Determine what screen is going based on if day has been done or not
   * Set attr so above buttons work as expected
   * Set up .accept btn and content based on screen-size
   * Setup .kindnessTxt and content
   */
  intSuggestions(){ 
    // INIATE SUGGESTIONS
    $('kindness-generator-component').show();
    var classname;

    this.alternativeKindness.changeSonny(); // change #sonnyIcon

    // var classname, fontSize;
    $('#kindness-generator').attr('active','true');
    // set kindness-done to analytics
    // $('#sonnyGif').attr('onclick', 'analytics("kindness_generator")').click(); 
  
  
    // Custom kindness button
    $('.customKindness, #kindnessView').hide(); 

    // edit box
    // $('.kindnessCal img').attr('src','./img/icons/edit.png');
    // $('.kindnessCal p').html('edit');
    $('.kindnessCal .menuItem').css('width','45vw');
    

    // width screen
    // $('.kindnessCal .menuItem').css('width','10vw');
    // sonny is allowed to be idle
    $('#sonnyStatic').attr('idle','true');        
    $('.swiper-container h1, .kindnessTxt').show();

    if($('#sonnyGif').attr('char') == 'badBro'){ 

      $('.swiper-container h1').html('Choose an evil action: ');
      $('.swiper-container h2').css('color','#b6e5ed');

      // populate data
      // insert kindnessTxt into swiper
      var evilData = this.generatorBackend.evilData;
      this.swiperComponent.populateData(evilData);
      this.swiperComponent.enableSlider(evilData, 'evil');

      $('.sonnyDialogue').attr('resetSwiper', 'evil');  
      
      $('.editContainer p,.editContainer img').hide();
      $('.sliderComponent').css({'color':'white'});
      // localStorage.setItem('intentionNum','0');
      // launch bad bro dialogue
      this.badBroDialogue.dialogue('idle',["Here's some gnarly ideas for you to chew"]);
      classname = 'pretentious';
      // fontSize = '5vw';
      // $('.kindnessCal p').css({'font-family':'evil','color':'white'});
      
      // change #sonnyIcon
      $('#sonnyIcon img').attr('src','./img/icons/badBro.png');
      $('#sonnyIcon img').css('margin-top','5px');
      // $('#sonnyIcon p').html('back');
      $('.kindnessTxt').css({'font-family':'evil','font-size':'5vw','color':'white'});
    }
    else {     // KINDNESS MODE  
      
      setTimeout(function(){     
          var topPos = $('.sliderComponent').position().top + $('.sliderComponent h1').height() + $('.swiper-slide-active').height();
          $('.customKindness').fadeIn();
          $('.customKindness').css('top', ($('.accept').position().top - 50))
      }, 2000);

      // swiper font goes white from evil mode 
      $('.sliderComponent ').css('color','black')
      classname = '';
      $('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
      $('.swiper-container h2').css('color','#b6e5ed');
      // insert kindnessTxt into swiper

      var kindnessData = this.generatorBackend.kindnessData;
      this.swiperComponent.populateData(kindnessData);
      this.swiperComponent.enableSlider(kindnessData, 'kindness');

      // change fonts back
      $('.kindnessCal p').css('font-family','kindness');
      $('.kindnessTxt').css({'font-family':'kindness','font-size':'7.5vw','color':'black'});

      // change sonny char
      var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");
      sonnyImg.src = "./img/sonny/idle.gif?t=" + new Date().getTime();
    
      // sonny introduces the feature          
      this.sonnyDialogue.greeting();
    
    }    
 
   if($('#doneView').css('display') != 'none'){ // day is done
     // remove #doneView
     document.getElementById('doneView').className = "";  
     document.getElementById('doneView').className += " outro"; 
     $('#doneView').attr('dayDone','true'); // right view when remove
   } 
   else{       
     // remove #kindness-generator
     document.getElementById('kindnessView').className = "";  
     document.getElementById('kindnessView').className += " outro";
     $('#doneView').attr('dayDone','false'); // right view when remove
   }
   
   // bring all the nessecaries
   $('.kindnessContainer,.realStopHelp, .helpMenu, .accept').show();
   
   // bring in #kindnessView
   $('kindness-generator-component').show();
   $('#kindness-generator').css('position', 'inherit');       
   document.getElementById('kindness-generator').className = "";  
   document.getElementById('kindness-generator').className += " intro " + classname;
   
   // hide specifics
   $('.editKindness').hide();
   $('.generatorEdit, .kindnessEdit, .editContainer, .realStopHelp').hide();

   // sonny scene
   $('.furniture').fadeOut();

  // change 'see progress' to 'progress'
  if($(window).width() < 440){
    $('.goToCal p').html('progress');
  }
  // change font size
  $('.kindnessCal .menuItem p').css({'margin':'0px','margin-top':'11px','font-size':'20px'});
  $('.kindnessCal .menuItem img').attr('src','./img/icons/caly.svg').css({'margin-top':'5.5px','border':'black solid 1px', 'border-radius':'200px','width':'30px','margin-bottom':'7.5px'});

  // sonny click goes to editTask
  $('.accept .menuItem').css('width', ($(window).width()-21));
  $('.arrow').show();
 
 // kindnessTxt vertical & horizontal positison on page
 this.swiperComponent.kindnessDimension();

// fix the height of swiper
this.swiperComponent.kindnessContainerHeight(true);
this.swiperComponent.arrowContainerHeight();

// this.generatorBackend.badBroOut();

// if(navigator.userAgent.match(/iPad/i) != null){
  
  // setTimeout(function(){     
  //   $('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
  //   $('.kindnessEdit').show().val("Loading...");
  //   $('.accept p').html('loading...');
  //   $('.swiper-container h1').html('One second');
  //   ; 
  // }, 1000);

  // setTimeout(function(){  
    $('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
    $('.accept p').html('accept');
    $('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
    $('.swiper-container h2').show();
    $('.editMenu .menuItem, .kindnessEdit').hide();
  // }, 1500);

  
var userAgent = navigator.userAgent || navigator.vendor;
// iOS detection from: http://stackoverflow.com/a/9039885/177710
if (/iPad|iPhone|iPod/.test(userAgent)) {
  setTimeout(function(){     
    $('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
    $('.kindnessEdit').show().val("Loading...");
    $('.accept p').html('loading...');
    $('.swiper-container h1').html('One second');
    ; 
  }, 1000);

  setTimeout(function(){  
    $('.sliderComponent, .swiper-slide, .arrow, .helpMenu').show();
    $('.accept p').html('accept');
    $('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
    $('.swiper-container h2').show();
    $('.editMenu .menuItem, .kindnessEdit').hide();
  }, 1500);
}
}

/*
* REMOVE GENERATOR
* Move from #kindness-generator to #kindnessView
* Set attr of #sonnyIcon and kindnessCal
* Change look and appearance of buttons above
*/
removeSuggestions(){ 
  //removing suggestions
  this.settingsTransition.intButton(); // revert button back to 'more' 
  this.helpComponent.stopHelp(); // If in help stop

  $('#kindness-generator').attr('active','false');
  $('.sonnyDialogue').attr('resetSwiper','false');
  $('.sonnyDialogue').attr('generatorMode', 'false')

  // show kindness generator - hidden when badBro talks
  $('#sonnyIcon, .helpMenu,.accept,.kindnessCal,.control').show();
   
  //  $('.control').show();

  // width screen
  // $('.kindnessCal .menuItem').css('width','90vw');

   // Check if badBro if(){
   if($('#sonnyStatic').attr('char') != 'sonny' || $('#sonnyIcon img').attr('src') == "./img/icons/badBro.png"){                                                         
      $('#sonnyStatic').attr('char','badBro');
      $('.sonnyDialogue').hide();
      $('.preventHands, .handsContainer').show();                                         
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
   $('.stillNasty .backToKindness, .kindnessTxt').hide(); 
  
   // remove #kindness-generator
   $('#kindness-generator').css('position', 'absolute');
   if($('.sonnyDialogue').attr('generatorMode') == 'compassion'){
    $('#kindness-generator').css('top', '30%');
   }
   document.getElementById('kindness-generator').className = "";  
   document.getElementById('kindness-generator').className += " outro";
   console.log(' MAX BYE VIEW');
   if(this.stateManager.kindnessDone == true){ 
     // bring in #doneView
     $('#doneView').show();  
     document.getElementById('doneView').className = "";  
     document.getElementById('doneView').className += " intro";
  }
  else{
    // bring in #kindnessView
    $('#kindnessView').show();  
    document.getElementById('kindnessView').className = "";  
    document.getElementById('kindnessView').className += " intro";
    console.log('MISSIO VIEW');
    if($('.missionView').css('display') != 'block'){
      $('.missionView').show();
    }
   }
   
   // send sonny back
   $('.sonnyContainer').css('z-index','6');
   
   // return font to non-evil
   $('.kindnessCal p, #sonnyState').css('font-family','kindness')
   
   // change .kindnessCal
   $('.kindnessCal img').attr('src','./img/caly/chatIdle.png');
   $('.kindnessCal img').css({'float' : 'right','border' : 'none'});
   $('.kindnessCal img').css('marginTop',($('.goToCal').height() - $('.goToCal img').height())/2);
   $('.kindnessCal p').html('check progress');
  //  $('.kindnessCal p').css({'font-size' : '30px'});
   $('.kindnessCal .menuItem').css('padding','2px 5px');
   // add class to calander
   $('.kindnessCal .menuItem').addClass('goToCal');       
   // sonny click goes to editTask
   $('.kindnessCal .menuItem').attr('goCal','true');
   
   // hide the controls
   $('.control').hide();

   // cal icon when clicked goes to calander
   $('.kindnessCal .menuItem').attr('goCal','true');  

   $('#sonnyStatic').attr('idle','false');

   // hide scroll to go back - odd effect
  $('.sliderComponent, .arrow, .helpMenu, .accept').hide();

  $('.customKindness').fadeOut();
   

    setTimeout(() => {        
      // stop sonny from being idle
      $('#sonnyStatic').attr('idle','false'); 

      // hide scroll to go back - odd effect
      $('.arrow, .helpMenu, .accept').hide();
      $('.sliderComponent').hide();

    }, 500);            
  }
}