import { Directive } from '@angular/core';
declare var jQuery: any;

@Directive({})

export class stateManager {

  constructor() {}

    /*
    * INT STATE
    * It's going to setup enums:
    * Kindness Done (BOOL)
    * Theme (STRING)
    * IntentionSet (BOOL)
    */

    public kindnessDone;
    public theme;
    public intentionSet;
    
    /*
    * CHECK IF THE INTENTION NEEDS TO BE SET
    */
    checkIfIntentionSet(){

      var intention = localStorage.getItem('intention');
      console.log('intention: ');    
      console.log(intention);    
      if(intention == 'false' || !intention){
        this.intentionSet = false;
      }
      else{
        this.intentionSet = true;
      }     
      
    }

    /*
    * CHECK IF KINDNESS NEEDS TO BE DONE OR HAS BEEN DONE FOR THE DAY
    */
    checkIfComplete(){
      var classname;
      if(jQuery('#kindnessView').css('display') == 'none'){
        console.log('state is kind')
        return classname = 'doneView';
      }
      else if(jQuery('#doneView').css('display') == 'none'){
        return  classname = 'kindnessView';
      }      
    };

}