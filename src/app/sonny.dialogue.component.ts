import { Component, EventEmitter, Output} from '@angular/core';
import { SonnyComponent } from './sonny.component';
import { KindnessService } from './kindness.service';
import { SonnyHelp } from './help.component';
import { TimeService } from './time.service';
import { ChallengeComponent } from './challenge.component'
declare var jQuery: any;


@Component({
    selector: 'sonny-speech',
    directives: [],
    providers: [ChallengeComponent, SonnyComponent,KindnessService,TimeService],
    template: ``
})

export class SonnyDialogue { 
    private hoursLeft;
    private calComponent;
  
    
    constructor(
        private sonnyComponent: SonnyComponent,
        private kindnessService:KindnessService,
        private timeService : TimeService,
        private challengeComponent : ChallengeComponent
        ) {
            this.sonnyComponent = sonnyComponent;
            this.kindnessService = kindnessService;
        }
     
    /*
    * Just get sonny to celebrate
    * Dumb workaround from generator.compo
    */
    instaWin(){
        // this.
    }

    /*
    * SONNY INTRO
    * Check if sonny is present
    * If not then intro him in
    * If present then go idle till chat
    */ 
    sonnyIntro(){
        var sonnyPresent =  jQuery(".sonnyContainer").attr("present");
        if(!sonnyPresent  || sonnyPresent == "false"){ // enter back in sonny
            jQuery(".sonnyContainer").attr("introAllowed","true");
            this.sonnyComponent.sonnyState('intro','sonny');
        }
        else{ // sonny is present and just go idle
            var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");          
            sonnyImg.src = "./img/sonny/idle-blink.gif?t=" + new Date().getTime();

        }
        jQuery(".sonnyContainer").attr("present","true");
    }

    /*
    * GREETING 
    * Check if sonnyIntro check is required
    * Couple of things to Sonny to say on intro based on states
    * States:
    *   1. Number of kindnesses done (first time or random generic message presented)
    *   2. Whether a kindness has already been done
    *   3. Whether compassion challenge is happeneing
    * @param - BOOL - Checks wether sonnyIntro is nessecary - say coming back from cal or settings
    */
    greeting(){

        this.sonnyIntro();
        
        var sonnyIcon = "<img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'>"; 
        var moreIcon = "<img src='./img/icons/more.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'>"; 
        var kindnessComplete = 1; // MAX CHECK IF FIRST TIME
        var hour = this.timeService.returnTime();
        jQuery('.sonnyDialogue').fadeIn();
        
        // stop sonny from leaping off
        jQuery(".sonnyContainer").attr("destroyBubble","false");                                
        jQuery(".sonnyContainer").attr("outroAllowed","false"); // stops sonny from leaping off
        
        // check if compassion challenge is being done
        var compassionNum = this.challengeComponent.checkCompassion(),
        compassionShown = localStorage.getItem("compassionMsg");
        
        // make it impossible for speech bubble to be destroyed
        jQuery(".sonnyContainer").attr("destroyBubble","false");
   
        if(jQuery('.sonnyDialogue').attr('challengeFailed') == 'true'){
          this.sonnySpeech(["Feel free to try the Compassion Challenge again anytime!!","By clicking the " + moreIcon + " button."]);
          jQuery('.sonnyDialogue').attr('challengeFailed','false'); // doesn't show again
        }
        else if(jQuery('.sonnyDialogue').attr('theme') == 'int' ){
          this.sonnySpeech(["Here, you can flip the look of the app between seasons!", "More seasons will be added in the future!"]);
          jQuery('.sonnyDialogue').attr('theme', 'false');
        }
        else if( jQuery('.sonnyDialogue').attr('theme') == 'winter' ){
          this.sonnySpeech(["Brrr.. A snowy winter theme!", "Hope you have a hot mug of coco at hand!!"]);
          jQuery('.sonnyDialogue').attr('theme', 'false');
        }
        else if( jQuery('.sonnyDialogue').attr('theme') == 'summer' ){
          this.sonnySpeech(["Ahhh.. A sunny beach theme!", "Hope you brought sun lotion!!"]);
          jQuery('.sonnyDialogue').attr('theme', 'false');
        }
        else if(jQuery('.sonnyDialogue').attr('generatorMode') == 'compassion'){ // generator mode
            this.sonnyComponent.sonnyState('intro','sonny');                 
            
            // compassion introduction text
            this.sonnySpeech(["In this part of the app we introduce compassion exercises by Prof. Paul Gilbert",
            "You will understand what is compassion and how to begin to build a compassionate self."]);
            // Try the flow of compassion: the three pronged approach
            
            this.sonnyStays(10000);  
        }
        else if(jQuery('.sonnyDialogue').attr('generatorMode') == 'true'){ // generator mode
            this.sonnyComponent.sonnyState('intro','sonny');                 
            
            // number between 1 & 3
            var randomInt = Math.floor(Math.random() * 3) + 1;
            if(randomInt == 1){
                this.sonnySpeech(["I've wracked up a huge list of kindness..","Hope you find one to inspire you!!"]);
            } 
            else if(randomInt == 2){
                this.sonnySpeech(["Here is a growing number of kindness suggestions for you!!","Over 100 and more will be added soon..."]);
            }
            else {
                this.sonnySpeech(["Here we have over 100 kindness ideas.","Hope you find one you like!!"]);    
            }
            this.sonnyStays(10000);            
        }
        else if(jQuery('#doneView').css('display') != 'none'){ /* KINDNESS ALREADY COMPLETED */ 
            // jQuery('#sonnyGif').attr('onclick', 'analytics("kindness_done")').click();    

            jQuery(".sonnyContainer").attr("outroAllowed","true");
            
             var random = Math.floor(Math.random() * (3 - 1 + 1) + 1); // spits back a number between 1 & 3
             var moreIcon = "<img src='./img/icons/more.png' style='height: 20px;border: #473939 solid 0.5px;padding: 5px;vertical-align: bottom;'> ";
            
            if (hour < 12){ // before 11am               
                switch(random) {
                case 1:
                    var notDoneSpeech = ["You've completed your daily kindness and it's still morning!","Hope there's more in the tank for the rest of the day!"];
                    break;
                case 2:
                    notDoneSpeech = ["You completed an early-bird kindness.','Nice work! Click " + moreIcon + " for some ideas for tomorrow."];
                    break;
                case 3:
                    notDoneSpeech = ["You've dished out some early morning kindness.",'Click "Replace Kindness" if you perform anything better during the day.'];
                    break;
                }
            }
            else if (hour < 15){
                switch(random) {
                case 1:
                     notDoneSpeech = ['You achieved a kindness already...',"And it's only mid-day! Not bad going..",'Click ' + moreIcon + ' for more things to explore'];
                    break;
                case 2:
                    notDoneSpeech = ["You've submitted your daily kindness","There's still time to perform one better.","Click 'Replace Kindness' if you can outdo yourself"];
                    break;
                case 3:
                    notDoneSpeech = ['I hope the kindness you completed has improved your afternoon!','Why not check out some intentions for tomorrow?',' Click '+ moreIcon +' if you need some knock out ideas!'];
                    break;
                }
            }
            else if (hour < 25){
                switch(random) {
                case 1:
                    notDoneSpeech = ["Look's like you're ending the day with a kindness under your belt!", "I got over a hundred ideas " + moreIcon + " if you're already thinking about tomorrow."];
                    break;
                case 2:
                    notDoneSpeech = ["Good job champ, you can hit the hay knowing you've done some good.",'Click ' + moreIcon + ' for ideas for tomorrow.'];
                    break;
                case 3:
                    notDoneSpeech = ['Looks like you knocked a kindness out of the park already!','Have a great rest of the evening!'];
                    break;
                }
            }   
            localStorage.setItem("compassionIteration","false"); // completed challenge dialogue
  
            if(compassionNum && jQuery('#sonnyGif').attr('mentioned') == 'true'){ // && compassionShown != 'shown' 
                var sonnyDialogue = this.challengeComponent.compassionPhrases(compassionNum);            
                notDoneSpeech = sonnyDialogue.concat(notDoneSpeech);
                jQuery('#sonnyGif').attr('mentioned','false');
            }            
            else if(jQuery("doneView").attr('welcome') == 'true'){
                notDoneSpeech.unshift('Welcome back!');
            }
            
            this.sonnySpeech(notDoneSpeech);
        }
        /*
        * KINDNESS DOING 
        */
        else{ // bunch of things Sonny could say when doing (rather than done)

            // set kindness-done to analytics
            // jQuery('#sonnyGif').attr('onclick', 'analytics("kindness_doing")")').click(); 
            jQuery(".sonnyContainer").attr("outroAllowed","true");

            var sonnySaying = parseInt(localStorage.getItem('sonnySaying'));           
            if( !sonnySaying || sonnySaying > 22 ){
                sonnySaying = 1
            }
            // sonnySaying = 3;
            // var challengeSaying = this.challengeComponent.compassionPhrases(sonnySaying);
            switch(sonnySaying) {
                case 1:
                    var sonnySays = [
                    "It's easy to be a dismissive of kindness and choose not to record them.",
                    "But recording intentional acts of kindness creates a ripple-effect of ease, health and self-esteem.",
                    "You've done the hard part of downloading the app. Now give it your all!"
                    ];
                break;
                case 2:
                    sonnySays = ["Intentional acts of kindness may feel a little artificial",
                    "because in the beginning you don’t really feel it, you’re just looking for something positive.",
                    "Remember, all training is artificial.", 
                    "But the artificial can become natural, just like learning a new habit."
                    ];
                break;
                case 3:
                    sonnySays = ["Avoiding other people's problems and doing nothing is the easy option and often done without thinking.", 
                    "Kindness is a choice. It takes a lot of strength and courage to not turn away from other people's pain."];
                break;
                case 4:
                    sonnySays = ["Working better??",
                    "Several studies show that kind and caring work environments have a positive impact on work productivity."];
                break;
                case 5:
                    var sonnySays = [
                        "You're never 'too important to be nice to people.",
                        "Unless, you're too important to use this app.",
                        "If that's the case then good luck with whatever you're doing."
                    ];
                break;
                case 6:
                    sonnySays = [
                        "When you appreciate what you have, it's tough to be upset.",
                        "But happiness lies within your attitude, not within what you have..."
                    ];
                break;
                case 7:
                    sonnySays = [   
                        "You can only give compassion if you feel self-compassion first.",
                        "Empathy is resonating with someone’s problems and not getting it confused with your own."
                    ];
                break;
                case 8:
                    sonnySays = [
                        "An act of kindness is the best escape from pessimism and negativity.",
                        "A daily kindness will train the mind to not be at the beck and call of negative voices."
                    ];
                break;
                case 9:
                    sonnySays = [
                        "An act of kindness can provide benefit to any given situation.",
                        "Performing and recording acts of kindness will help you improve their effectiveness."
                    ];
                break;
                case 10:
                    sonnySays = [                        
                        "It's nice to be important, but it's more important to be nice.",
                        "To quote my favourite writer Kurt Vonnnegut.",
                    ];
                break;
                case 11:
                    sonnySays = [
                        "When we allow ourselves to be kind and regularly engaging in random acts of kindness",
                         "we create neural pathways that enhance feelings of well-being",
                        "and the natural flow of feel-good endorphins and mood elevating neurotransmitters."
                    ];
                break;
                case 12:
                    sonnySays = [
                        "Being kind takes courage. Don’t let that put you off.",
                        "If we don’t practice kindness and compassion",
                        "we’ll go back to our very destructive and violent default mode."
                    ];
                break;
                case 13:
                    sonnySays = [
                        "When we support others, our brains produce oxytocin",
                        "which reduces blood pressure and the free radicals associated with ageing.",
                        "Cheaper than the expensive face cream you’ve been buying."
                    ];
                break;
                case 14:
                    sonnySays = [
                        "Kindness inspires others, it's self-replicating and contagious.",
                        "When an act of kindness is performed, this is likely to encourage others to act in a similar way."
                    ];
                break;
                case 15:
                    sonnySays = [
                        "All roads of mindfulness lead to kindness and compassion.",
                        "Because in the end it’s all about interconnectedness and care for the human race."
                    ];
                break;
                case 16:
                    sonnySays = [
                        "The brain can become hardwired for happiness.",
                        "If you can hold the good feeling a few more seconds each day,",
                        "the impact on the brain will be stronger, reflected in the neural arrangement."
                ];
                break;
                case 17:
                    sonnySays = [
                        "The simplest acts of kindness are far more powerful than a thousand heads bowing in prayer",
                        "And he would know right?",
                        "One of my fave quotes from Mahatma Gandhi.",
                    ];
                break;
                case 18:
                    sonnySays = [
                        'Performing kindness is like performing a bicep curl..',
                        'Except you become a kind and compassionate person instead of a gym-head', 
                        'Not that there\'s anything wrong with gyms.', 'I just don\'t go because I don\'t have any arms.'
                    ];
                break;
                case 19:
                    sonnySays = [
                        'The world would be a btter place if people smiled to each other more.',
                        'The best you can do is set an example for others.', 
                    ];
                break;                
                case 20:
                sonnySays = [                        
                        "The best index to a person's character is how he treats people who can't do him any good,",
                        "and how he treats people who can't fight back." ,
                        'Abigail Van Buren was on to something.',
                    ];
                break;
                case 21:
                sonnySays = [
                        'If you think you are too important to help someone, you are only fooling yourself.',
                        "A great zinger from Galatians.",
                    ];
                break;
                case 22:
                sonnySays = [
                "There are several studies which suggest that positive acts of kindness.",
                "and the emotion they produce help to lower blood pressure, reduce stress or improve sleep."
                ]
                break;
            }
            if(compassionNum && jQuery('#sonnyGif').attr('mentioned') == 'true'){ // && compassionShown != 'shown'
                sonnySays = this.challengeComponent.compassionPhrases(compassionNum).concat(sonnySays);
                jQuery('#sonnyGif').attr('mentioned','false');
            }
           
            // if kindness is 0 then say welcome
            var kindnessArray = localStorage.getItem("kindnessArray");
            if(!kindnessArray){
                // sonnySays.unshift("Welcome to Kindness the app!<br>It's a pleasure to meet you.");
            }

            this.sonnySpeech(sonnySays); // sonny speaks
            // iterate sonnySaying
            sonnySaying = sonnySaying + 1;
            localStorage.setItem('sonnySaying',String(sonnySaying));

                /*          
                “There is no need for temples; no need for complicated philosophy,” 
                “Our own brain, our own heart is our temple; the philosophy is kindness.” - Dalai Lama

                “Be kind, for everyone you meet is fighting a hard battle.” - Plato

                'We experience ourselves, our thoughts and feelings, as something separate from the rest. Our task must be to free ourselves from the prison by widening our circle of compassion to embrace all living creatures and the whole of nature in its beauty' Einstein 
                */
            
        } /* not kindness compassion */        
    } // greeting 
    

    /*
    * INTRO SONNY
    * Different introduction states for sonny
    * 1. Introduce kindness generator state
    * 2. Winning state for completing a task
    */
    introSonny(type : string){ 
        jQuery('.sonnyDialogue #typed').html('');
        jQuery(".sonnyContainer").attr("sonnySpeaking","true");        
        
        if (type == 'intention-set'){ // good luck!            
            setTimeout(() => {     
                jQuery(".sonnyContainer").attr("sonnySpeaking","false")           
                this.sonnyLeaves();
            }, 1000);          
        }
        else if (type == 'generator'){
            
            jQuery('.sonnyContainer').css('z-index','6');            
            jQuery('#sonnyStatic').attr('char','sonny');

            // sonny jumps onto screen
            this.sonnyComponent.sonnyState("intro",'sonny');

            // sonny apologises for badBro
            setTimeout(() => { 
                var badBro = "<img src='./img/icons/badBro.png' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'>";
                this.sonnySpeech(["The thing about " + badBro +" is that he ain't the most chivalrous..", 'Wanna get back to doing some kindness?']);
                jQuery('#sonnyStatic').attr('idle','true');
                this.sonnyStays(12000); // goes idle
            }, 500);
        }
        else if (type == "winning"){            
            this.sonnyComponent.sonnyState("intro-winning",'sonny');
            setTimeout(() => {
                jQuery(".sonnyDialogue").fadeIn("fast");
                // just dialogue  
                this.sonnySpeech(["Congrats on recording today's kindness!!"]); 
                jQuery('#sonnyStatic').attr('winning', 'false'); // ready to escape            
            }, 5000);              
        }          
    }
    
    /*
    * SONNY LEAVE
    * Delay before sonny leaves used in intro dialogues
    */
    sonnyLeaves(){
        setTimeout(() => {  
            jQuery(".sonnyContainer").attr("outroAllowed","true");                   
        }, 3500);
    }
    
    /*
    * SONNY STAY
    * All the nessecaries required for snonny to stay
    * If sonny is confirming kindness generator then don't jump in
    * Ensure that word count (behind three seconds) is equal to word count after 3
    * Indicates sonny is done chatting
    * Then jump into idle 
    */
    sonnyStays(time){
        setTimeout(() => {
            var checkIdle = setInterval(() => {  
                var wordcountOld = jQuery('.sonnyDialogue #typed').html().length;
                // console.log('word count old:' + wordcountOld);
                setTimeout(() => {  
                var wordcountNew = jQuery('.sonnyDialogue #typed').html().length;
                // console.log('word count new:' + wordcountNew);
                if(wordcountNew != wordcountOld){
                    // console.log('going around');
                    return; // as different dialogue is now being spoken
                }
                else{
                    clearInterval(checkIdle);
                    // console.log('success');
                    jQuery('.sonnyContainer').css('z-index','12');           
                    this.sonnyComponent.sonnyState('idle','sonny');
                }
                },3000);
            },3000);
        }, time); // sonny stays
    }
    
    /*
    * SONNY'S OUTRO
    * Callback after speech is done
    * Check if sonny is allowed jump out
    * Check if sonny is actually talking
    * If char is bad bro then ignore
    */
    outro(){
        
      if(jQuery('#sonnyStatic').attr('char') == 'badBro' || jQuery('#sonnyStatic').attr('winning') == 'true'){
         return;
      }
      
      var wordcountOld = jQuery('.sonnyDialogue #typed').html().length; 
      // console.log('word count old:' + wordcountOld);
      setTimeout(() => {  
        var wordcountNew = jQuery('.sonnyDialogue #typed').html().length;
        // console.log('word count new:' + wordcountNew);
        if(wordcountNew != wordcountOld){
            return; // as different dialogue is now being spoken
        }
        
        jQuery(".sonnyContainer").attr("sonnySpeaking","false");
        jQuery(".sonnyContainer").attr("destroyBubble","true");
        var sonnyImg = <HTMLImageElement>document.getElementById("sonnyGif");
        sonnyImg.src = "./img/sonny/idle.gif?t=" + new Date().getTime();
        setTimeout(() => {                  
            this.sonnyComponent.speechOut();
            this.sonnyComponent.sonnyState('exit','sonny');                 
        }, 0);
      }, 4000); // sonny stays
    }

    /*
    * SONNY SPEECH
    */
    sonnySpeech(phraseArray) {       
        jQuery(".sonnyContainer").attr("sonnySpeaking","true");
        jQuery("#speechBubble").hide();
        this.sonnyComponent.speechInt();
        
        setTimeout(() => {
            jQuery("#speechBubble").fadeIn("fast");
            
            // if ipad reduce bubble size
            if(jQuery(window).width() > 750){
            //    jQuery("#speechBubble").css({"width":'0px'}); 
               jQuery("#speechBubble").css({"width":(jQuery(window).width() - 130)/2}); 
            }
            else{
              jQuery("#speechBubble").css({"width":jQuery(window).width() - 130});
            }
            
            var ctx = this;         
            this.sonnyComponent.sonnyState("talking","sonny");

            jQuery("#typed").typed({
                strings: phraseArray,
                typeSpeed: 0,
                showCursor: false,
                backDelay: 3000,
                backSpeed: 0,
                loop: false, // loop on or off (true or false)
                loopCount: false, // number of loops, false = infinite            
                callback: function () {
                    ctx.outro();                    
                    phraseArray = []; // cleanup                
                    return;
                }
            });
        }, 2200); 
    }
}