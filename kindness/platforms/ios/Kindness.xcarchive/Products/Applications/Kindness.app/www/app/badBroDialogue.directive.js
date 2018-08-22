"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var time_service_1 = require('./time.service');
var challenge_component_1 = require('./challenge.component');
var sonny_component_1 = require('./sonny.component');
var sonny_dialogue_component_1 = require('./sonny.dialogue.component');
var BadBroDialogue = (function () {
    function BadBroDialogue(timeService, sonnyComponent, sonnyDialogue, challengeComponent) {
        this.timeService = timeService;
        this.sonnyComponent = sonnyComponent;
        this.sonnyDialogue = sonnyDialogue;
        this.challengeComponent = challengeComponent;
    }
    BadBroDialogue.prototype.ngOnInit = function () { };
    /*
    * BAD BRO DIALOGUE
    * Bad Bro chatting animation
    * Once finished talking either:
      * Remain
    */
    BadBroDialogue.prototype.dialogue = function (action, phraseArray) {
        var _this = this;
        if (jQuery('#sonnyStatic').attr('char') == 'sonny') {
            return;
        }
        jQuery(".sonnyContainer").show();
        if (jQuery('.sonnyContainer').attr('introallowed') == 'true') {
            this.sonnyComponent.sonnyState('intro', 'badBro');
            setTimeout(function () {
                jQuery('.sonnyContainer').attr('introallowed', 'false');
                _this.dialogue(action, phraseArray);
            }, 2300);
        }
        else {
            this.sonnyComponent.sonnyState('talking', 'badBro');
            // make the hand cover                
            var ctx = this;
            jQuery(".badBroDialogue").css('opacity', '1').show().typed({
                strings: phraseArray,
                typeSpeed: 0,
                showCursor: false,
                backDelay: 750,
                backSpeed: 0,
                loop: false,
                loopCount: false,
                callback: function () {
                    if (action == 'winning') {
                        return;
                    }
                    if (action) {
                        ctx.badBroAction(action);
                    }
                    if (jQuery('#kindness-generator').attr('sonnyOut') == 'true') {
                        /*
                        * BadBro spits and exits
                        */
                        var sonnyImg = document.getElementById("sonnyGif");
                        sonnyImg.src = "./img/badBro/sneezing.gif?t=" + new Date().getTime();
                        setTimeout(function () {
                            sonnyImg.src = "./img/badBro/exit.gif?t=" + new Date().getTime();
                        }, 2000);
                        /*
                         * SONNY ASK
                         * Sonny jumps up and asks if you want to go back or continue
                         */
                        jQuery('#kindness-generator').attr('sonnyOut', 'false'); // ensure sonny does not jump up again                    
                        setTimeout(function () {
                            // jQuery('.badBroDialogue').fadeOut();
                            ctx.sonnyDialogue.introSonny('generator');
                            // sonny starts
                            jQuery('#sonnyStatic').attr('char', 'sonny');
                            jQuery('sonnyGif, .sonnyDialogue, .sonnyContainer').show();
                            jQuery('.preventHands, .control').hide();
                            // ctx.sonnyComponent.sonnyState('intro','sonny');
                            setTimeout(function () {
                                jQuery('.stillNasty,.backToKindness').fadeIn();
                            }, 7000);
                        }, 5500);
                    }
                    phraseArray = [];
                    return;
                }
            });
        }
    };
    /*
    * BAD BRO ACTIONS
    * Once dialogue has been said
    * Before Bad Bro departs he has the option to spit or leave immediatly
    * @param STRING action - laugh, spit or '' (just leave)
    */
    BadBroDialogue.prototype.badBroAction = function (action) {
        if (jQuery('#sonnyStatic').attr('char') == 'sonny') {
            return;
        }
        var sonnyImg = document.getElementById("sonnyGif");
        if (action == 'exit') {
            stillTalking('exit', this);
        }
        else if (action == 'spit') {
            stillTalking('spit', this);
        }
        else if (action == 'idle') {
            this.sonnyComponent.sonnyState('idle', 'badBro');
        }
        /*
        * STILL TALKING
        * Stop BadBro if talking
        */
        function stillTalking(type, ctx) {
            var wordcountOld = jQuery('.badBroDialogue').html().length;
            setTimeout(function () {
                var wordcountNew = jQuery('.badBroDialogue').html().length;
                if (wordcountNew != wordcountOld) {
                    return; // as different dialogue is now being spoken
                }
                else {
                    if (jQuery('#sonnyStatic').attr('char') != 'sonny') {
                        sonnyImg.src = "./img/badBro/sneezing.gif?t=" + new Date().getTime();
                    }
                    ctx.resetText();
                }
            }, 2000); // sonny stays 
        }
    };
    /*
    * RESET TEXT
    * Bad Bro exit
    *  Removes dialogue
    */
    BadBroDialogue.prototype.resetText = function () {
        jQuery(".sonnyContainer").attr("outroAllowed", "true");
        this.sonnyComponent.sonnyState("exit", "badBro");
        jQuery(".badBroDialogue").fadeOut();
    };
    /*
     * GREETING
     * Can BadBro jump in?
     * Couple of things to Bad Bro to say on intro based on states
     * States:
     *   1. Number of kindnesses done (first time or random generic message presented)
     *   2. Whether a kindness has already been done
     *   3. Whether compassion challenge is happeneing
     */
    BadBroDialogue.prototype.greeting = function () {
        var sonnyIcon = "<img src='./img/icons/sonny.svg' style='height: 25px;border: #473939 solid 0.5px;padding: 5px;'>";
        var kindnessComplete = 1; // MAX CHECK IF FIRST TIME
        var hour = this.timeService.returnTime();
        // Can BadBro Jump In?         
        setTimeout(function () {
            jQuery(".sonnyContainer").attr("outroAllowed", "true");
        }, 3500);
        // check if compassion challenge is being done
        var compassionNum = this.challengeComponent.checkCompassion(), compassionShown = localStorage.getItem("compassionMsg");
        // if(compassionNum){ // && compassionShown != 'shown' 
        //   var sonnyDialogue = this.challengeComponent.compassionPhrases(compassionNum);            
        // }
        if (kindnessComplete == 0) {
            // this.sonnySpeech(["Howdy, welcome to the app!","Click on " + sonnyIcon + " if you want to repeat the tour or need anything."]);
            this.dialogue('spit', ["Yo punk! What's happenin'", "Welcome to the app and all that.."]);
        }
        else {
            var random = Math.floor(Math.random() * (3 - 1 + 1) + 1); // spits back a number between 1 & 3
            if (hour < 11) {
                switch (random) {
                    case 1:
                        this.dialogue('spit', ["Sup rebel..", "Honestly, you shouldn't be up at this hour..", "Punks don't get up till noon"]);
                        break;
                    case 2:
                        this.dialogue('spit', ["Better be up these wee hours because you were partying too hard the night before", "This mode ain't for you if you're the type whose into early beddy-byes..."]);
                        break;
                    case 3:
                        this.dialogue('exit', ["Another day to crush and blow minds!!", "Show the world what you're made of!!"]);
                        break;
                }
            }
            else if (hour < 15) {
                switch (random) {
                    case 1:
                        this.dialogue('exit', ["Eating lunch is for losers..", "Eat rocks!! More nutritious and more awesome!!"]);
                        break;
                    case 2:
                        this.dialogue('exit', ["At lunch-time, I like to change themes and beat up " + sonnyIcon, "Never has any lunch money or food worth stealing."]);
                        break;
                    case 3:
                        this.dialogue('spit', ["Whatever work you're currently doing...", "Give up on it", "It ain't worth your time"]);
                        break;
                }
            }
            else if (hour < 25) {
                switch (random) {
                    case 1:
                        this.dialogue('exit', ["What's happenin' baller?", "Be mean until you make it big. Then you have the right to be mean."]);
                        break;
                    case 2:
                        this.dialogue('spit', ["Here's some bedtime advice my papa gave to me:", "Love yourself and hate everyone else"]);
                        break;
                    case 3:
                        this.dialogue('exit', ["Party harder than the night", "And remember this sage advice:", "Never. Don't. Party."]);
                        break;
                }
            }
        }
    }; // greeting 
    BadBroDialogue = __decorate([
        core_1.Component({
            selector: 'bad-bro',
            templateUrl: '',
            styleUrls: [''],
            providers: [sonny_dialogue_component_1.SonnyDialogue, sonny_component_1.SonnyComponent, time_service_1.TimeService, challenge_component_1.ChallengeComponent]
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [time_service_1.TimeService, sonny_component_1.SonnyComponent, sonny_dialogue_component_1.SonnyDialogue, challenge_component_1.ChallengeComponent])
    ], BadBroDialogue);
    return BadBroDialogue;
}());
exports.BadBroDialogue = BadBroDialogue;
//# sourceMappingURL=badBroDialogue.directive.js.map