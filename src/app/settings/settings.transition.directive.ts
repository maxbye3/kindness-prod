import { Directive } from '@angular/core';
declare var jQuery: any;

@Directive({})

export class settingsTransition {

  constructor() {}

  /*
  * When exiting a mode we need to change the settings button back into a button that iniates setting 
  */
  intButton(){
    // change #sonnyIcon
    jQuery('#sonnyIcon img').attr('src','./img/icons/more.png');
    jQuery('#sonnyIcon img').css('margin-top','0px');
    jQuery('#sonnyIcon p').html('more');
  
    // sonny icon when clicked goes to settings
    jQuery('#sonnyIcon').attr('settings','true');
  }

}