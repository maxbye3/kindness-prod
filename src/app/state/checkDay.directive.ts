import {Directive, ElementRef} from '@angular/core';
import { Injectable } from '@angular/core';
import {ChallengeComponent} from '../challenge.component';
import { AlternativeKindness } from '../alternativeHome/alternateKindnessView.component';
import { finishedTransition } from './states/finished.transition.directive';
import { notFinishedTransition } from './states/notFinished.transition.directive';
import { calanderOutroTransition } from '../calander/outro.transition.directive';
import { suggestionsTransition } from '../generator/suggestions.transition.directive';
import { stateManager } from '../state/manager.directive';
import {TimeService} from '../time.service';

declare var $ : any;

@Directive({        
    providers: [finishedTransition, ChallengeComponent, AlternativeKindness, notFinishedTransition]
})

@Injectable()
export class checkDayDirective  {
   
    constructor(
        private challengeComponent : ChallengeComponent,
        private finishedTransition : finishedTransition,
        private calanderOutroTransition : calanderOutroTransition,
        private suggestionsTransition : suggestionsTransition,
        private timeService : TimeService,
        private notFinishedTransition : notFinishedTransition,
        private stateManager : stateManager
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
        this.calanderOutroTransition.exitCal();
        
        // update clock time to midnight
        $('.hoursLeft').html(24 - this.timeService.returnTime());

        /* CHECK IF LOADING SUGGESTIONS OR FINISHED VIEW */
        var dateArray = this.timeService.getDateArray();
        var matched = false;
        for (var i = 0; i <= dateArray.length; i++) {          
          if(dateArray[i] == this.timeService.formatDateNow() && !matched){
            // DONE VIEW'
            matched = true;
            this.finishedTransition.intDone();
            return;
          } else if(!matched){
            // KINDNESS NOT DONE
            matched = true;  
            this.notFinishedTransition.intMakeKindness();
            
            this.stateManager.checkIfIntentionSet();
            if(this.stateManager.intentionSet === false){          
              this.suggestionsTransition.intSuggestions();
            }
            else{  
              this.stateManager.kindnessDone = false;       
              this.suggestionsTransition.removeSuggestions();
            }
            

            // check if user has failed compassion challenge            
            var today = this.timeService.returnDate(); // new Date();
            var dd = today.getDate();
            this.challengeComponent.checkFailure(dateArray, dd);                                                       
          }             
        }
    }
   
}