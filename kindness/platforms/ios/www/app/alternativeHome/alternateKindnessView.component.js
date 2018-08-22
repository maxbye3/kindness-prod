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
var AlternativeKindness = (function () {
    function AlternativeKindness() {
    }
    AlternativeKindness.prototype.backToKindness = function () {
        this.changeSonny();
        this.classicView();
        if ($('#sonnyIcon img').attr('src') == './img/icons/badBro.png') {
            $('#sonnyIcon img').attr('src', './img/icons/sonny.png');
        }
        else {
            // change #sonnyIcon so when clicked goes to settings
            $('#sonnyIcon img').attr('src', './img/icons/more.png');
            $('#sonnyIcon img').css('margin-top', '0px');
            $('#sonnyIcon p').html('more');
            $('#sonnyIcon').attr('settings', 'true');
        }
        if ($('#kindnessView').attr('kindnessComplete') == 'true') {
            return; // we are done
        }
        document.getElementById("kindnessView").className = "";
        document.getElementById("kindnessView").className += " intro";
        $('#kindnessView').show();
    };
    AlternativeKindness.prototype.classicView = function () {
        $('.missionView').hide();
        $('.classicView').show();
        $('.classicView').attr('classic', 'true');
        // .intention-complete--clicked .intention-complete--content {
    };
    AlternativeKindness.prototype.changeSonny = function () {
        if ($('#kindnessView').attr('kindnessComplete') == 'true') {
            // change placeholder
            $('#inputKindness').attr('placeholder', 'enter a new kindness');
            // change #sonnyIcon
            $('#sonnyIcon img').attr('src', './img/icons/sonny.png');
            $('#sonnyIcon img').css('margin-top', '5px');
            $('#sonnyIcon p').html('back');
            // sonny click goes to removeGenerator      
            $('#sonnyIcon').attr('settings', 'kindness-view');
        }
    };
    AlternativeKindness = __decorate([
        core_1.Component({
            selector: 'alternate-kindness',
            templateUrl: 'app/alternativeHome/alternateKindnessView.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], AlternativeKindness);
    return AlternativeKindness;
}());
exports.AlternativeKindness = AlternativeKindness;
//# sourceMappingURL=alternateKindnessView.component.js.map