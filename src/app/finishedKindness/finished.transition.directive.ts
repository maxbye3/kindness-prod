import { Directive } from '@angular/core';
declare var $: any;

@Directive({})

export class finishedTransition {

  constructor() {}

    /*
    * INT STATE
    */
   intDone(){

    $('#kindnessView').attr('kindnessComplete','true');
    $('#kindnessView').hide();
    $('.missionView').hide();
    $('.classicView').hide();

    // show done view
    $('#doneView').show();
    document.getElementById("doneView").className = "";  
    document.getElementById("doneView").className += " intro";

    // hide kindness view
    document.getElementById("kindnessView").className = "";  
    document.getElementById("kindnessView").className += " outro";
    $('#kindnessView').fadeOut();


    // if theme undefined then go to summer
    var theme = $(".skipContainer").attr('theme');
    if(!theme){                    
        $(".skipContainer").attr('theme','summer');                 
    } 


    

    // $('.kindnessCal img').attr('src','./img/icons/caly.svg');

  }


}