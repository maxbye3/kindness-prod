import {Component, OnInit} from '@angular/core';
import { LetterComponent } from './letter.component';
import { SonnyHelp } from './help.component';
import { SendEmail } from './sendEmail.directive';
declare var jQuery: any;
@Component({
  selector: 'name-email',
  templateUrl:'app/inputNameEmail.component.html',
  styleUrls: ['app/inputNameEmail.component.css'],
  providers: [LetterComponent, SonnyHelp, SendEmail]
})

export class inputNameEmail {

  constructor(
    private sonnyHelp : SonnyHelp,
    private letterComponent : LetterComponent,
    private sendEmail :  SendEmail
  ) {}
  

  destroyOptions(){
    // hide options
    if (/android/i.test(navigator.userAgent)){
      jQuery('.orTxt, .intentionTask, .completeContainer').hide();
    }
  }

  /*
  * SCROLL UP
  * On click either go to the top of the page
  * Or go to the top of cal viw
  * But not if kindnessGen - that's only for after return is clicked (or submit)
  * If return is clicked then peform a complimentary action
  * @type - STRING type - what type of input field we dealing with here
  */
  scrollUp(type){
     this.destroyOptions();
     if(type == 'kindness'){
       jQuery('html, body').animate({scrollTop : 0},200);
     }
     else{
        if(type == 'nameEntered'){ // enter email on President of Kindness has forgotten your name
          var classname = '.inputName';
        }
        else if(type == 'settingsTxt'){
          classname = '.settingsTxt';
        }
        else if(type == 'emailEntered'){ // enter email on President of Kindness has forgotten your name
          classname = '.inputEmail';
        }
        else if(type == 'kindnessGenerator'){
          classname = '.kindnessEdit';
        }

        jQuery(classname).blur(function() {   
            jQuery('html, body').animate({scrollTop : 0},200);            
        });
     }
     jQuery('input').keypress(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if ( (code==13) || (code==10))
          {
            // if(type == 'kindness'){ // kindness input
            //   jQuery('#kindnessView .kindSubmit').click();
            // }
            // else if(type == 'nameEntered'){ // enter email on President of Kindness has forgotten your name
            //   jQuery('.nameInput').click();
            // }
            // else if(type == 'emailEntered'){ // enter email on President of Kindness has forgotten your name
            //   jQuery('.emailInput').click();
            // }
            // else if(type == 'kindnessGenerator'){
            //   jQuery('#kindness-generator .accept .menuItem').click();

            // }
            // // hide the keyboard
            // jQuery(this).blur();
            
          }
       });
  }
  
  /*
  * RETURN KINDNESS
  * Go back to doneView
  * Hide kindness view
  */
  returnKindness(){
    this.sonnyHelp.transitionViews('kindnessView','doneView');
    jQuery('#doneView').show();
       
  }
  
  /*
  * INT NAME
  * show name and email 
  * change go back txt
  */  
  intName(){   
     
    jQuery('.returnBtn').html('skip reward');
    this.sonnyHelp.transitionViews('doneView','kindnessView');
    jQuery('#kindnessView, .nameEmail, .nameInput, .inputName').show();
    jQuery('.missionView, #kindness,.inputEmail,.emailInput').hide();
  }  
    
  /*
  * INPUT NAME EMAIL
  * Return val from input
  * @param - STRING type - what field are we talking
  */
  inputNameEmail(type){    
    var input;
    jQuery('.letter').hide();
    jQuery('.returnBtn').html('no thanks');
    if(type == 'name'){
       
       if(jQuery('.inputName').val() == ''){
        jQuery('.nameInput').css('color','red').html('please enter a name');
        return;
       }

       input = jQuery('.inputName').val();
       jQuery('.letterTxt .name').html(input);
       jQuery('.letterTxt .name').attr("name" , input);
       this.letterComponent.createLines();
       return;
    }
    else if(type == 'email'){
       
       if(jQuery('.inputEmail').val() == ''){
        jQuery('.emailInput').css('color','red').html('please enter an email');
        return;
       }
       
       this.sonnyHelp.transitionViews('kindnessView','doneView');
       jQuery('#doneView').show();
       
       input = jQuery('.inputEmail').val();       
       var emailName = 'email:' + input + ' name:' + jQuery('.letterTxt .name').html();
       this.sendEmail.send('Finished Challenge', emailName);       
    } 
    jQuery('.letter').hide();       
  }
  
}