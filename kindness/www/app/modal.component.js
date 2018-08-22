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
var ModalComponent = (function () {
    function ModalComponent(challengeComponent) {
        this.challengeComponent = challengeComponent;
    }
    ModalComponent.prototype.intModal = function (text, firstBtn, secondBtn, secondOption) {
        jQuery('modal, .onwards').show();
        setTimeout(function () {
            jQuery('.modalBox').css({ 'margin-top': '25%' });
        }, 100);
        jQuery('.modalDescript').html(text);
        jQuery('.onwards').html(firstBtn);
        jQuery('.btn2').html(secondBtn);
        if (!secondOption) {
            jQuery('.onwards').hide();
        }
    };
    ModalComponent.prototype.goBack = function () {
        // console.log('goBack');
        jQuery('modal').hide();
        if (jQuery('.modalBox').attr('compassionState') == 'start') {
            this.challengeComponent.stopCompassion();
        }
    };
    ModalComponent.prototype.onwards = function () {
        // console.log('onwards');
        jQuery('modal').hide();
        if (jQuery('.modalBox').attr('compassionState') == 'start') {
            this.challengeComponent.startCompassion();
        }
        else if (jQuery('.modalBox').attr('compassionState') == 'stop') {
            this.challengeComponent.stopCompassion();
        }
    };
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            templateUrl: 'app/modal.component.html',
            styleUrls: ['app/modal.component.css'],
            providers: []
        }), 
        __metadata('design:paramtypes', [challenge_component_1.ChallengeComponent])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map