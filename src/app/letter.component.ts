import {Component } from '@angular/core';
import {ChallengeComponent} from './challenge.component';
declare var jQuery: any;

@Component({
  selector: 'letter-root',
  templateUrl: 'app/letter.component.html',
  styleUrls: ['app/letter.component.css'],
  providers: [  
    ChallengeComponent 
  ]
})

export class LetterComponent { 

    constructor(       
      private challengeComponent : ChallengeComponent
      ) {}
      
      forgottonName(){          
        jQuery('#kindnessText').html('This is embarrassing. The President of Kindness has forgotten your name. <br> Mind reminding us?');
        jQuery('#inputKindness').css('margin-top','10px').attr('placeholder','please enter your name . . .')
      }
      
      
      createLines(){
        jQuery('.letter').show();
        jQuery('.facebook,.twitter').show();
        
        this.typeLetter();        
        var i = 1;                     
        function myLoop () {           
            setTimeout(function () { 
                jQuery('.letter').show(); 
                jQuery('.line'+i).css({'animation':'lineIntro 5s forwards',' animation-fill-mode':'forwards'});         //  your code here
                i++;                     
                if (i < 10) {            
                    myLoop();            
                }                        
            }, 500);
        }
        myLoop();
          
      }
      
      /*
      * EXIT
      * Check it can actually pull up letter
      * show name and email 
      * change go back txt
      * Hide thank you on doneView
      */
      exit(){

         // make sure this doesn't occur pre-emptively
         if(jQuery(".thankyou").attr('challengeComplete') != 'true'){
             return;
         }
         
         jQuery('.facebook,.twitter').hide(); 
         setTimeout(function () {  
           jQuery('.letter, .thankyou ').hide();
         }, 1000);
         jQuery('.nameEmail h1').html('The developer (Mr. Moonhead) would like to put you in the exclusive beta programme where you can be the first to try new features and other exclusives.');
         jQuery('.returnBtn').html('no thanks');
         jQuery('.emailInput').html('sounds good').show()
         jQuery('.inputEmail, #doneView').show();
         jQuery('.inputName, .nameInput').hide();
         jQuery('.letter').css({'animation':'letterOutro 1s forwards',' animation-fill-mode':'forwards'});
         jQuery(".thankyou").attr('challengeComplete','false');         
      }
      
      typeLetter(){
        jQuery(".thankyou").attr('challengeComplete','true');
        setTimeout(function () {              
            var phraseArray = jQuery(".letterTxt").html();
            phraseArray = [phraseArray];
            jQuery(".letterTxt").show().html('');
            jQuery(".letterTxt").typed({
                strings: phraseArray,
                typeSpeed: 0,
                showCursor: false,
                backDelay: 750,
                backSpeed: 0,
                loop: false, // loop on or off (true or false)
                loopCount: false, // number of loops, false = infinite            
                callback: function () {                  
                    jQuery('.stamp').show();            
                    phraseArray = []; // cleanup                
                    return;
                }
            });
        }, 1500);
     }      
}


