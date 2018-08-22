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
var badBroDialogue_directive_1 = require('../badBroDialogue.directive');
var CompassionData = (function () {
    function CompassionData(badBroDialogue) {
        this.badBroDialogue = badBroDialogue;
        this.data = [
            ["Compassion is sensitivity to suffering in oneself and others with a commitment to try to alleviate and prevent it. There are two psychologies: the courage to engage with suffering and the dedication to trying find out how best to help.\
    <div class='themeButton selected kindSubmit compassionBtn'>summary audio (3:15) <span class='audioContainer0'>loading...</span></div>"],
            ["In order for us to begin to build our understanding of self-compassion,\
    I’m going to do a little exercise involving bringing to mind somebody who we see as a very compassionate person.<br>\
    <div class='themeButton selected kindSubmit compassionBtn'>self-compassion exercise (1:30) <span class='audioContainer1'>loading...</span></div>\
    <div class='themeButton selected kindSubmit compassionBtn' onclick='window.open(\"https://soundcloud.com/max-bye/building-the-compassionate\",\"_blank\");'>more self-compassion exercises (12:45)</div>"],
            ["This practice is about imagining your ideal compassionate other. It involves imaging another being,\
     person or mind that has complete compassion for you.<br>\
     <div class='themeButton selected kindSubmit compassionBtn'>compassionate other exercise (0:45) <span class='audioContainer2'>loading...</span></div>\
     <div class='themeButton selected kindSubmit compassionBtn' onclick='window.open(\"https://soundcloud.com/compassionatemind/our-ideal-compassionate-other\",\"_blank\");'>more compassionate other exercises (24:55)</div>"],
            ["This final exercise is about fostering compassion for everyone\
     by focussing on yourself as part of a thriving, happy community.<br>\
     <div class='themeButton selected kindSubmit compassionBtn'>compassionate community exercise (4:34)\
     <span class='audioContainer3'>loading...</span></div>\
     <div class='themeButton selected kindSubmit compassionBtn' onclick='window.open(\"https://soundcloud.com/compassionatemind/compassionate-image-and-compassionate-community\",\"_blank\");'>full audio (16:43)</div>"]]; // 4
    }
    CompassionData = __decorate([
        core_1.Directive({
            providers: [badBroDialogue_directive_1.BadBroDialogue]
        }), 
        __metadata('design:paramtypes', [badBroDialogue_directive_1.BadBroDialogue])
    ], CompassionData);
    return CompassionData;
}());
exports.CompassionData = CompassionData;
//# sourceMappingURL=data.component.js.map