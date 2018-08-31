import {Directive, ElementRef} from '@angular/core';
import { Injectable } from '@angular/core';
import {ChallengeComponent} from '../challenge.component';
import { AlternativeKindness } from '../alternativeHome/alternateKindnessView.component';
import { finishedTransition } from '../finishedKindness/finished.transition.directive';
import { calanderOutroTransition } from '../calander/outro.transition.directive';
import { suggestionsTransition } from '../generator/suggestions.transition.directive';
import {TimeService} from '../time.service';

declare var $ : any;

@Directive({        
    providers: [finishedTransition, ChallengeComponent, AlternativeKindness]
})

@Injectable()
export class checkDayDirective  {
   
    constructor(
        private challengeComponent : ChallengeComponent,
        private finishedTransition : finishedTransition,
        private calanderOutroTransition : calanderOutroTransition,
        private suggestionsTransition : suggestionsTransition,
        private timeService : TimeService
    ) {}
    
    
    /*
    * Check for new day
    * If kindness generator or compassion flow true then don't reset app just return
    * Go through date array and compare dates with today's
    * If there isn't a match then:
      * Check if iteration is possible
    * If there is a match then:
      * Kindness has already been done today 
    * @param dayCheck - STRING - what view is currently present (kindnessView)
    */
    dayCheck(classname){

        /*
        * NOT SURE WHAT MEANS
        * RESET MODE
        * If left on either compassion or kindness generator then resume from there
        * Disable the attr
        * Don't do rest of time service
        */
        // function resetMode(mode){
        //     if($('#' + mode).attr('active') == 'true'){
        //         $('#' + mode).show();
        //         return;
        //     }
        // }
        // resetMode('kindness-generator');
        // resetMode('compassion-flow');
        // $('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
        /* not sure what means */

        this.calanderOutroTransition.exitCal();
        

        // update clock time to midnight
        $('.hoursLeft').html(24 - this.timeService.returnTime());

        /* CHECK IF LOADING SUGGESTIONS OR FINISHED VIEW */
        var dateArray = this.timeService.getDateArray();
        var matched = false;
        console.log('we are exiting: ');
        console.log(classname);
        for (var i = 0; i <= dateArray.length; i++) {          
            if(dateArray[i] == this.timeService.formatDateNow() && !matched){
              matched = true;
              this.finishedTransition.intDone();
              return;
           }
           else if(!matched){ // new day or regular day  
              matched = true;  
              this.suggestionsTransition.intSuggestions();

              // check if user has failed compassion challenge            
              var today = this.timeService.returnDate(); // new Date();
              var dd = today.getDate();
              this.challengeComponent.checkFailure(dateArray, dd);                                                       
          }             
        }
    }
   
}