import { Component } from '@angular/core';

declare var $ : any;

@Component({
  selector: 'alternate-kindness', 
  templateUrl: 'app/alternativeHome/alternateKindnessView.html',
  providers: []
})

export class AlternativeKindness {
  
    constructor(  
    
    ) {
    
    }

    backToKindness(){
      this.changeSonny();
      this.classicView();
      
      if($('#sonnyIcon img').attr('src') == './img/icons/badBro.png'){
        $('#sonnyIcon img').attr('src','./img/icons/sonny.png');
      }
      else{
        // change #sonnyIcon so when clicked goes to settings
        $('#sonnyIcon img').attr('src','./img/icons/more.png');
        $('#sonnyIcon img').css('margin-top','0px');
        $('#sonnyIcon p').html('more');    
        $('#sonnyIcon').attr('settings','true');
      }

      if($('#kindnessView').attr('kindnessComplete') == 'true'){
        return; // we are done
      }
      
      document.getElementById("kindnessView").className = "";  
      document.getElementById("kindnessView").className += " intro";
      $('#kindnessView').show();


    }

    classicView(){
      $('.missionView').hide();
      $('.classicView').show();
      $('.classicView').attr('classic','true');

      // .intention-complete--clicked .intention-complete--content {
    }

    changeSonny(){
      if($('#kindnessView').attr('kindnessComplete') == 'true'){
        // change placeholder
        $('#inputKindness').attr('placeholder', 'enter a new kindness');
        // change #sonnyIcon
        $('#sonnyIcon img').attr('src','./img/icons/sonny.png');
        $('#sonnyIcon img').css('margin-top','5px');
        $('#sonnyIcon p').html('back');
        // sonny click goes to removeGenerator      
        $('#sonnyIcon').attr('settings','kindness-view');      
      }
    }

}