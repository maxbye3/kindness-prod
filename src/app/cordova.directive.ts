import { Directive } from '@angular/core';
import { TimeService } from './time.service';
import { ThemeComponent } from './theme.component';
declare var jQuery: any;

@Directive({
  providers: [TimeService, ThemeComponent]
})

export class Cordova {
    
    constructor(
        private themeComponent: ThemeComponent,
        private timeService : TimeService
    ) {}
    
    // Handle the resume event
    onResume() {
        jQuery(".iosFix").hide();
        /*
        * RESET MODE
        * If left on either compassion or kindness generator then resume from there
        * Disable the attr
        * Don't do rest of time service
        
        */
        function resetMode(mode){
          if(jQuery('#' + mode).attr('active') == 'true'){
            jQuery('#' + mode).show();
            if(jQuery('#compassion-flow').css('display') == 'none'){
              jQuery('#compassion-flow').attr('active','false');
            }
            if(jQuery('#kindness-generator').css('display') == 'none'){
              jQuery('#kindness-generator').attr('active','false');
            }            
            return true;
          }
          else{
            // reset to kindness screen
            return false;
          }
        }
        
        var badBroInvisibile = jQuery('#sonnyStatic').attr('char') != 'badBro';
        if(badBroInvisibile){
          if(resetMode('compassion-flow') || resetMode('kindness-generator')){
            return;        
          }
        }

        jQuery(".badBroDialogue").css('opacity','0').html('');

        if(jQuery('#kindnessView').css('display') == 'none'){
            var classname = 'doneView';
        }
        else if(jQuery('#doneView').css('display') == 'none'){
            classname = 'kindnessView';
        }
        
        this.timeService.dayCheck(classname); 
        jQuery(".sonnyContainer").attr("introAllowed","true");
        this.themeComponent.setTheme('summer'); 

    } 
}

