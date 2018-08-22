import { Directive, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { BadBroDialogue } from '../badBroDialogue.directive';
declare var jQuery: any;


@Directive({
  providers: [ BadBroDialogue ]
})

export class CompassionData {
        
  constructor(
    private badBroDialogue : BadBroDialogue
  ) {}
   
  public data =[
    ["Compassion is sensitivity to suffering in oneself and others with a commitment to try to alleviate and prevent it. There are two psychologies: the courage to engage with suffering and the dedication to trying find out how best to help.\
    <div class='themeButton selected kindSubmit compassionBtn'>summary audio (3:15) <span class='audioContainer0'>loading...</span></div>"],
    ["In order for us to begin to build our understanding of self-compassion,\
    I’m going to do a little exercise involving bringing to mind somebody who we see as a very compassionate person.<br>\
    <div class='themeButton selected kindSubmit compassionBtn'>self-compassion exercise (1:30) <span class='audioContainer1'>loading...</span></div>\
    <div class='themeButton selected kindSubmit compassionBtn' onclick='window.open(\"https://soundcloud.com/max-bye/building-the-compassionate\",\"_blank\");'>more self-compassion exercises (12:45)</div>"], //2
    ["This practice is about imagining your ideal compassionate other. It involves imaging another being,\
     person or mind that has complete compassion for you.<br>\
     <div class='themeButton selected kindSubmit compassionBtn'>compassionate other exercise (0:45) <span class='audioContainer2'>loading...</span></div>\
     <div class='themeButton selected kindSubmit compassionBtn' onclick='window.open(\"https://soundcloud.com/compassionatemind/our-ideal-compassionate-other\",\"_blank\");'>more compassionate other exercises (24:55)</div>"], //3
     ["This final exercise is about fostering compassion for everyone\
     by focussing on yourself as part of a thriving, happy community.<br>\
     <div class='themeButton selected kindSubmit compassionBtn'>compassionate community exercise (4:34)\
     <span class='audioContainer3'>loading...</span></div>\
     <div class='themeButton selected kindSubmit compassionBtn' onclick='window.open(\"https://soundcloud.com/compassionatemind/compassionate-image-and-compassionate-community\",\"_blank\");'>full audio (16:43)</div>"]]; // 4

}