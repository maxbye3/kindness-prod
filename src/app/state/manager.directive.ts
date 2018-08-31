import { Directive } from '@angular/core';
declare var jQuery: any;

@Directive({})

export class stateManager {

  constructor() {}

    /*
    * INT STATE
    */
    checkState(){
      var classname;
      if(jQuery('#kindnessView').css('display') == 'none'){
        return classname = 'doneView';
      }
      else if(jQuery('#doneView').css('display') == 'none'){
        return  classname = 'kindnessView';
      }
      
    }

}