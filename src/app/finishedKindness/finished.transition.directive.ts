import { Directive } from '@angular/core';
declare var $: any;

@Directive({})

export class finishedTransition {

  constructor() {}

    /*
    * INT STATE
    */
   intDone(){

    if($('#kindnessView').attr('kindnessComplete') == 'true'){
      $('.missionView').hide();
      $('.classicView').hide();

      // show done view
      $('#doneView').show();
      document.getElementById("doneView").className = "";  
      document.getElementById("doneView").className += " intro";
    }

    // $('.kindnessCal img').attr('src','./img/icons/caly.svg');

  }


}