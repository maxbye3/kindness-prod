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
var sonny_dialogue_component_1 = require('./sonny.dialogue.component');
var help_component_1 = require('./help.component');
var go_cal_component_1 = require('./go.cal.component');
var kindness_service_1 = require('./kindness.service');
var sonny_component_1 = require('./sonny.component');
var time_service_1 = require('./time.service');
var challenge_component_1 = require('./challenge.component');
var pretentious_component_1 = require('./pretentious.component');
var alternateKindnessView_component_1 = require('./alternativeHome/alternateKindnessView.component');
var SubmitKindnessComplete = (function () {
    function SubmitKindnessComplete(challengeComponent, pretentiousComponent, goCalComponent, kindnessService, sonnyComponent, sonnyHelp, alternativeKindness, sonnyDialogue, timeService) {
        this.challengeComponent = challengeComponent;
        this.pretentiousComponent = pretentiousComponent;
        this.goCalComponent = goCalComponent;
        this.kindnessService = kindnessService;
        this.sonnyComponent = sonnyComponent;
        this.sonnyHelp = sonnyHelp;
        this.alternativeKindness = alternativeKindness;
        this.sonnyDialogue = sonnyDialogue;
        this.timeService = timeService;
        this.timeLeft = 24 - this.timeService.returnTime();
    }
    /*
    * CHECK SUBMISSION
    */
    SubmitKindnessComplete.prototype.kindessSubmit = function () {
        jQuery('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
        // document.getElementById("submitCheck").style.display = "block";   
        var inputPerson = document.getElementById("inputPerson");
        var inputKindness = document.getElementById("inputKindness");
        if (inputKindness.value == "") {
            // No Kindness Entered
            document.getElementById("kindnessText").style.color = "red";
            // document.getElementById("whoText").style.color = "black";  
            inputKindness.placeholder = "Please enter a kindness!";
        }
        else {
            this.kindnessSuccess(); // winning animation
        }
    };
    /*
    * CHECK REPEAT
    * If no date in the date array then inject new kindnness otherwise everything breaks
    * If$('#kindnessView').attr('kindnessComplete','true') from timeService
    * Then replace the last kindness
    * Else save as last kindness
    */
    SubmitKindnessComplete.prototype.checkRepeat = function () {
        var inputKindness = document.getElementById("inputKindness");
        if (localStorage.getItem("dateArray") == '') {
            // save as new kindness
            this.kindnessService.saveData(inputKindness.value); // call in the service to deal with data
            this.challengeComponent.iterateCompassion(); // iterate challenge
            jQuery('#kindnessView').attr('kindnessComplete', 'true'); // mark first day as done
            inputKindness.value = '';
            return;
        }
        if (jQuery('#kindnessView').attr('kindnessComplete') == 'true') {
            // replace last kindness
            var kindnessArray = JSON.parse(localStorage.getItem("kindnessArray"));
            kindnessArray[0] = inputKindness.value;
            localStorage.setItem("kindnessArray", JSON.stringify(kindnessArray));
            // // allow cheating (compassion challenge day 1 -> 2 if on day 1)
            // var compassionNum = localStorage.getItem("compassionChallenge");
            // if(compassionNum == '1'){
            //    this.challengeComponent.iterateCompassion(); // iterate challenge 
            // }
            inputKindness.value = '';
            return;
        }
        // save as new kindness
        this.kindnessService.saveData(inputKindness.value);
        this.challengeComponent.iterateCompassion(); // iterate challenge
        jQuery('#kindnessView').attr('kindnessComplete', 'true');
        inputKindness.value = '';
    };
    /*
    * SUBMISSION SUCCESSFUL
    * Check if sonny is present & launch winning animation
    * Go to winning view
    */
    SubmitKindnessComplete.prototype.kindnessSuccess = function () {
        if (this.sonnyComponent.sonnyPresent == false) {
            this.pretentiousComponent.winning();
        }
        else {
            this.sonnyDialogue.introSonny('winning');
        }
        jQuery(".compassionDay").attr('firstCompassion', 'false');
        this.checkRepeat();
        jQuery("#doneView").show();
        this.sonnyHelp.transitionViews("kindnessView", "doneView");
        if (jQuery('#sonnyGif').attr('char') == 'badBro') {
            jQuery('.compassionSelect').hide();
        }
    };
    /*
    * BACK TO KINDNESS
    * Determine Sonny or BadBro
    * Create equivalent dialogue
    * Change views back to kindness
    */
    SubmitKindnessComplete.prototype.backToKindness = function () {
        this.challengeComponent.revertSuccess();
        jQuery('#kindnessView').show();
        if (this.sonnyComponent.sonnyPresent == false) {
            this.pretentiousComponent.replaceTask();
        }
        else {
            this.sonnyComponent.sonnyState('intro', 'sonny');
            if (jQuery('#kindnessView').attr('kindnessComplete') == 'true') {
                this.sonnyDialogue.sonnySpeech(["Replace today's kindness with an even better one below!"]);
            }
            else {
                this.sonnyDialogue.sonnySpeech(["Nice work! Today's kindness has been replaced!"]);
            }
        }
        this.sonnyHelp.transitionViews("doneView", "kindnessView");
        this.alternativeKindness.backToKindness();
    };
    SubmitKindnessComplete = __decorate([
        core_1.Component({
            selector: 'kindness-submitted',
            template: "\n    \n  ",
            styleUrls: ["app/sonny.dialogue.component.css"],
            providers: [
                kindness_service_1.KindnessService,
                go_cal_component_1.GoCalComponent,
                sonny_component_1.SonnyComponent,
                sonny_dialogue_component_1.SonnyDialogue,
                challenge_component_1.ChallengeComponent,
                pretentious_component_1.PretentiousComponent,
                time_service_1.TimeService,
                help_component_1.SonnyHelp
            ]
        }), 
        __metadata('design:paramtypes', [challenge_component_1.ChallengeComponent, pretentious_component_1.PretentiousComponent, go_cal_component_1.GoCalComponent, kindness_service_1.KindnessService, sonny_component_1.SonnyComponent, help_component_1.SonnyHelp, alternateKindnessView_component_1.AlternativeKindness, sonny_dialogue_component_1.SonnyDialogue, time_service_1.TimeService])
    ], SubmitKindnessComplete);
    return SubmitKindnessComplete;
}());
exports.SubmitKindnessComplete = SubmitKindnessComplete;
//# sourceMappingURL=submit-kindness.component.js.map