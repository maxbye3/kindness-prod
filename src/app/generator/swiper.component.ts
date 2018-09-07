import {Component, ElementRef, Input } from '@angular/core';
import { EditComponent } from '../generator/edit.component';
import { Injectable } from '@angular/core';
import { GeneratorBackend } from '../generator.component';
declare var jQuery: any;
declare var Swiper: any;

@Component({
  selector: 'swiper-component',
  templateUrl: 'app/generator/swiper.component.html',
  styleUrls: ['app/generator/swiper.component.css'],
  providers: [ EditComponent ]
})

@Injectable()
export class SwiperComponent {

  constructor(
    private editComponent : EditComponent,
    private generatorBackend : GeneratorBackend
  ) {}

  populateData(data){

    jQuery('.sliderComponent .swiper-wrapper').html('');

    jQuery('.sliderComponent .swiper-wrapper').html('<div class="swiper-slide" slide="' + 0 + '">' + data[0] + '</div>');      
    for (var i = 1; i < this.generatorBackend.data.length; i++) {  
      if( !data[i] || data[i] < 40 ){
        jQuery('.sliderComponent .swiper-wrapper').append('<div class="swiper-slide slide="' + i + '""> Tap to continue </div>');      
      }
      else{    
        jQuery('.sliderComponent .swiper-wrapper').append('<div class="swiper-slide slide="' + i + '"">' + data[i] + '</div>');  
      }
    }
    
    if(data.length < 20){
      for (var i = 1; i < this.generatorBackend.data.length; i++) {  
        jQuery('.sliderComponent .swiper-wrapper').append('<div class="swiper-slide slide="' + i + '""> Tap to continue </div>');      
      }
    }

    
    
  }
  
  enableSlider(data,type){

    var slideNum = parseInt(localStorage.getItem('intentionNum'));
    if(type == 'compassion' ||  type == 'evil' || !slideNum){
      slideNum = 0;
    }

    if(type == 'compassion'){
      // setTimeout(() => {
        jQuery('.audioContainer0').html("<audio style='width:95%' controls><source src='audio/audio0.mp3' type='audio/mpeg'></audio>");
        jQuery('.audioContainer1').html("<audio style='width:95%' controls><source src='audio/audio1.mp3' type='audio/mpeg'></audio>");
        jQuery('.audioContainer2').html("<audio style='width:95%' controls><source src='audio/audio2.mp3' type='audio/mpeg'></audio>");
        jQuery('.audioContainer3').html("<audio style='width:95%' controls><source src='audio/audio3.mp3' type='audio/mpeg'></audio>");
      // }, 4000);
    }

    // enable swipe
    jQuery('.swiper-container').show();
    var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
       // Navigation arrows
      nextButton: '.next',
      initialSlide: slideNum,
      prevButton: '.prev',
      onTouchStart: function(slider) { 
        
        if(slider.activeIndex == 1){
          jQuery('.sonnyDialogue').attr('resetSwiper', 'false'); 
        }


        if(jQuery('.sonnyDialogue').attr('resetSwiper') == 'compassion' || jQuery('.sonnyDialogue').attr('resetSwiper') == 'evil'){
          slider.slideTo(0, 1000);          
        }
     

      },
      onTransitionEnd: function(slider) { 
        
        if(slider.activeIndex == 1){
          jQuery('.sonnyDialogue').attr('resetSwiper', 'false'); 
        }


        if(jQuery('.sonnyDialogue').attr('resetSwiper') == 'compassion' || jQuery('.sonnyDialogue').attr('resetSwiper') == 'evil'){
          slider.slideTo(0, 1000);
        }

        if(jQuery('.sonnyDialogue').attr('generatorMode') == 'compassion'){
          data.length = 4;
          if(slider.activeIndex > 3){
            slider.slideTo(0, 1000);
          }
        }

        
        if(slider.activeIndex == 0){
          jQuery('.prev').hide();
        }
        else{
          jQuery('.prev').show();
        }
        if(slider.activeIndex == data.length - 1){
          jQuery('.next').hide();
        }
        else{
          jQuery('.next').show();
        }

        var sounds = document.getElementsByTagName('audio');
        for(var i=0; i<sounds.length; i++) sounds[i].pause();


        jQuery('.sliderComponent').attr('currentSlide', slider.activeIndex - 1);

        // var topPos = jQuery('.sliderComponent').position().top + jQuery('.sliderComponent h1').height() + jQuery('.swiper-slide-active').height();
        // jQuery('.customKindness').css('top', topPos);

        if(slider.activeIndex == 4){
          jQuery('.launchBroraid').click();
        }
      }
    });
    
    
  }

  kindnessContainerHeight(overlapActive){
    var windowHeight = jQuery(window).height();
    var txtHeight = (windowHeight/2.5);
    jQuery('.sliderComponent').css('top',txtHeight);
    setTimeout(() => {
      // if .sliderComponent meets .accept then bump up
      var sliderHeight = jQuery('.swiper-container').height();
      var acceptTop = jQuery('.accept').position().top;
      var sliderTop = jQuery('.sliderComponent').position().top;
      var overlap = acceptTop - (sliderTop + sliderHeight);
      
      if(overlapActive && overlap < 0){
        jQuery('.sliderComponent').css('top', sliderTop + overlap);
      } 
      jQuery('.sliderComponent').css('opacity','1'); 
    }, 500);      
  }

  arrowContainerHeight(){
    var assignedScrollSpace = (jQuery(window).width() - jQuery('.swiper-slide').width()) / 2;
    var actualScrollSpace = jQuery('.next').width();
    var needsCorrection = assignedScrollSpace - actualScrollSpace;    
    if(needsCorrection <= 0){
      var fixedHeight = jQuery('.sliderComponent').position().top - jQuery('.next').height();
      // jQuery('.arrow').css('top', fixedHeight);
    }
  }  
  
  kindnessDimension(){
    /*
     * KINDNESS (TEXT) WIDTH
     * .kindnessContainer horizontal position on page
     */
       jQuery('.kindnessContainer').css('left','0px');  
       var txtWidth = jQuery('.kindnessContainer').width(),
       windowWidth = jQuery(window).width();
       txtWidth = (windowWidth/2) - (txtWidth/2);
       jQuery('.kindnessContainer').css('left',txtWidth);  
       
    /*
     *  KINDNESS (TEXT) HEIGHT
     *  .kindnessContainer vertical position on page
     *  based on kindnessTxt
     */ 
       var txtHeight = jQuery('.kindnessTxt').height(),
       windowHeight = jQuery(window).height();
       txtHeight = (windowHeight/2) - (txtHeight/2);
       
       jQuery('.kindnessContainer').css('top',txtHeight);   
     }
     
     
}

