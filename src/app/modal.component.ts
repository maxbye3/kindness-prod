import {Component } from '@angular/core';
import {ChallengeComponent} from './challenge.component';
declare var jQuery: any;

@Component({
  selector: 'modal',
  templateUrl: 'app/modal.component.html',
  styleUrls: ['app/modal.component.css'],
  providers: []
})

export class ModalComponent { 

    constructor(  
      private challengeComponent : ChallengeComponent     
    ) {}   

    intModal(text, firstBtn, secondBtn, secondOption){
      jQuery('modal, .onwards').show();
      setTimeout(() => {
        jQuery('.modalBox').css({'margin-top':'25%'});
      }, 100);
      
      jQuery('.modalDescript').html(text);
      jQuery('.onwards').html(firstBtn);
      jQuery('.btn2').html(secondBtn);
      if(!secondOption){
        jQuery('.onwards').hide();
      }
    }

    goBack(){
      // console.log('goBack');
      jQuery('modal').hide();

      if(jQuery('.modalBox').attr('compassionState') == 'start'){
        this.challengeComponent.stopCompassion();
      }

    }
    
  onwards(){
    // console.log('onwards');
    jQuery('modal').hide();

    if(jQuery('.modalBox').attr('compassionState') == 'start'){
      this.challengeComponent.startCompassion();
    }
    else if(jQuery('.modalBox').attr('compassionState') == 'stop'){
      this.challengeComponent.stopCompassion();
    }
  }
}


