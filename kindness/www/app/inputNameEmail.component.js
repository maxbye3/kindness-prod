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
var letter_component_1 = require('./letter.component');
var help_component_1 = require('./help.component');
var sendEmail_directive_1 = require('./sendEmail.directive');
var inputNameEmail = (function () {
    function inputNameEmail(sonnyHelp, letterComponent, sendEmail) {
        this.sonnyHelp = sonnyHelp;
        this.letterComponent = letterComponent;
        this.sendEmail = sendEmail;
    }
    inputNameEmail.prototype.destroyOptions = function () {
        // hide options
        if (/android/i.test(navigator.userAgent)) {
            jQuery('.orTxt, .intentionTask, .completeContainer').hide();
        }
    };
    /*
    * SCROLL UP
    * On click either go to the top of the page
    * Or go to the top of cal viw
    * But not if kindnessGen - that's only for after return is clicked (or submit)
    * If return is clicked then peform a complimentary action
    * @type - STRING type - what type of input field we dealing with here
    */
    inputNameEmail.prototype.scrollUp = function (type) {
        this.destroyOptions();
        if (type == 'kindness') {
            jQuery('html, body').animate({ scrollTop: 0 }, 200);
        }
        else {
            if (type == 'nameEntered') {
                var classname = '.inputName';
            }
            else if (type == 'settingsTxt') {
                classname = '.settingsTxt';
            }
            else if (type == 'emailEntered') {
                classname = '.inputEmail';
            }
            else if (type == 'kindnessGenerator') {
                classname = '.kindnessEdit';
            }
            jQuery(classname).blur(function () {
                jQuery('html, body').animate({ scrollTop: 0 }, 200);
            });
        }
        jQuery('input').keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if ((code == 13) || (code == 10)) {
            }
        });
    };
    /*
    * RETURN KINDNESS
    * Go back to doneView
    * Hide kindness view
    */
    inputNameEmail.prototype.returnKindness = function () {
        this.sonnyHelp.transitionViews('kindnessView', 'doneView');
        jQuery('#doneView').show();
    };
    /*
    * INT NAME
    * show name and email
    * change go back txt
    */
    inputNameEmail.prototype.intName = function () {
        jQuery('.returnBtn').html('skip reward');
        this.sonnyHelp.transitionViews('doneView', 'kindnessView');
        jQuery('#kindnessView, .nameEmail, .nameInput, .inputName').show();
        jQuery('.missionView, #kindness,.inputEmail,.emailInput').hide();
    };
    /*
    * INPUT NAME EMAIL
    * Return val from input
    * @param - STRING type - what field are we talking
    */
    inputNameEmail.prototype.inputNameEmail = function (type) {
        var input;
        jQuery('.letter').hide();
        jQuery('.returnBtn').html('no thanks');
        if (type == 'name') {
            if (jQuery('.inputName').val() == '') {
                jQuery('.nameInput').css('color', 'red').html('please enter a name');
                return;
            }
            input = jQuery('.inputName').val();
            jQuery('.letterTxt .name').html(input);
            jQuery('.letterTxt .name').attr("name", input);
            this.letterComponent.createLines();
            return;
        }
        else if (type == 'email') {
            if (jQuery('.inputEmail').val() == '') {
                jQuery('.emailInput').css('color', 'red').html('please enter an email');
                return;
            }
            this.sonnyHelp.transitionViews('kindnessView', 'doneView');
            jQuery('#doneView').show();
            input = jQuery('.inputEmail').val();
            var emailName = 'email:' + input + ' name:' + jQuery('.letterTxt .name').html();
            this.sendEmail.send('Finished Challenge', emailName);
        }
        jQuery('.letter').hide();
    };
    inputNameEmail = __decorate([
        core_1.Component({
            selector: 'name-email',
            templateUrl: 'app/inputNameEmail.component.html',
            styleUrls: ['app/inputNameEmail.component.css'],
            providers: [letter_component_1.LetterComponent, help_component_1.SonnyHelp, sendEmail_directive_1.SendEmail]
        }), 
        __metadata('design:paramtypes', [help_component_1.SonnyHelp, letter_component_1.LetterComponent, sendEmail_directive_1.SendEmail])
    ], inputNameEmail);
    return inputNameEmail;
}());
exports.inputNameEmail = inputNameEmail;
//# sourceMappingURL=inputNameEmail.component.js.map