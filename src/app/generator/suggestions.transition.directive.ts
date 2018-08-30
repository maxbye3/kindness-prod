import { Directive } from '@angular/core';
declare var $: any;

@Directive({})

export class suggestionsTransition { // MAX CHECK THIS

  constructor() {}

    /* INIATE SUGGESTIONS*/
    intSuggestions(){
     // always start as nice guy
     $('.narcissimTxt').html('Tired of being nice?');
     $(".settingsMenuItem img").attr('src','./img/icons/sonny.png');
     $(".kindnessCal").show();
     $('.speechDiv').show();
     $('#sonnyGif').attr('mentioned','true');
     $(".square-radio").removeClass("square-radio--clicked");
     $('#kindnessView').attr('customKindness','false');

     // change #sonnyIcon
     $('#sonnyIcon img').attr('src','./img/icons/more.png');
     $('#sonnyIcon img').css('margin-top','0px');
     $('#sonnyIcon p').html('more');
     
     // sonny icon when clicked goes to settings
     $('#sonnyIcon').attr('settings','true');

    $('.kindnessCal p').html('check progress');
    $('.kindnessCal .menuItem').css('padding','2px 5px');
    $('.kindnessCal .menuItem').addClass('goToCal');       
    // sonny click goes to calander
    $('.kindnessCal .menuItem').attr('goCal','true');
    $(".sonnyContainer").attr("destroyBubble","false"); 

    // new or regular day
    $('#kindnessView').attr('kindnessComplete','false');
    $(".skipContainer").attr('theme','summer'); 
    document.getElementById("doneView").className = "";  
    document.getElementById("doneView").className += " outro";
    $('#doneView').fadeOut();

    document.getElementById("kindnessView").className = "";  
    document.getElementById("kindnessView").className += " intro";
    $("#kindness-generator").show();
    document.getElementById("kindness-generator").className = "";  
    document.getElementById("kindness-generator").className += " intro";

    $(".compassionDay").attr('firstCompassion','true');




    }

}