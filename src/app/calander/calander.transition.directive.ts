import { Directive } from '@angular/core';

declare var $: any;

@Directive({})

export class calanderTransition {

  constructor() {}

    /*
    * INT CALANDER
    * In calander mode then slide up to done
    */
    intCal(){
      $('html, body').animate({scrollTop:0}, 'slow');
      $('.calView').fadeOut('fast');
    }

    /*
    * EXIT CALANDER
    * In calander mode then slide up to done
    */
    exitCal(){
      $('#sonnyIcon').show();   
      $(".settings").show().css("animation","settingsOutro 1s");

      setTimeout(() => {
          $(".settings").hide();        
      }, 500);  
    }

}