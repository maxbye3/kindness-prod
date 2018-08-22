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
var challenge_component_1 = require('./challenge.component');
var LetterComponent = (function () {
    function LetterComponent(challengeComponent) {
        this.challengeComponent = challengeComponent;
    }
    LetterComponent.prototype.forgottonName = function () {
        jQuery('#kindnessText').html('This is embarrassing. The President of Kindness has forgotten your name. <br> Mind reminding us?');
        jQuery('#inputKindness').css('margin-top', '10px').attr('placeholder', 'please enter your name . . .');
    };
    LetterComponent.prototype.createLines = function () {
        jQuery('.letter').show();
        jQuery('.facebook,.twitter').show();
        this.typeLetter();
        var i = 1;
        function myLoop() {
            setTimeout(function () {
                jQuery('.letter').show();
                jQuery('.line' + i).css({ 'animation': 'lineIntro 5s forwards', ' animation-fill-mode': 'forwards' }); //  your code here
                i++;
                if (i < 10) {
                    myLoop();
                }
            }, 500);
        }
        myLoop();
    };
    /*
    * EXIT
    * Check it can actually pull up letter
    * show name and email
    * change go back txt
    * Hide thank you on doneView
    */
    LetterComponent.prototype.exit = function () {
        // make sure this doesn't occur pre-emptively
        if (jQuery(".thankyou").attr('challengeComplete') != 'true') {
            return;
        }
        jQuery('.facebook,.twitter').hide();
        setTimeout(function () {
            jQuery('.letter, .thankyou ').hide();
        }, 1000);
        jQuery('.nameEmail h1').html('The developer (Mr. Moonhead) would like to put you in the exclusive beta programme where you can be the first to try new features and other exclusives.');
        jQuery('.returnBtn').html('no thanks');
        jQuery('.emailInput').html('sounds good').show();
        jQuery('.inputEmail, #doneView').show();
        jQuery('.inputName, .nameInput').hide();
        jQuery('.letter').css({ 'animation': 'letterOutro 1s forwards', ' animation-fill-mode': 'forwards' });
        jQuery(".thankyou").attr('challengeComplete', 'false');
    };
    LetterComponent.prototype.typeLetter = function () {
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
                loop: false,
                loopCount: false,
                callback: function () {
                    jQuery('.stamp').show();
                    phraseArray = []; // cleanup                
                    return;
                }
            });
        }, 1500);
    };
    LetterComponent = __decorate([
        core_1.Component({
            selector: 'letter-root',
            templateUrl: 'app/letter.component.html',
            styleUrls: ['app/letter.component.css'],
            providers: [
                challenge_component_1.ChallengeComponent
            ]
        }), 
        __metadata('design:paramtypes', [challenge_component_1.ChallengeComponent])
    ], LetterComponent);
    return LetterComponent;
}());
exports.LetterComponent = LetterComponent;
//# sourceMappingURL=letter.component.js.map