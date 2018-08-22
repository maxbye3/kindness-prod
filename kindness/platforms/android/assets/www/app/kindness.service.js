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
var KindnessService = (function () {
    function KindnessService(timeService) {
        this.timeService = timeService;
        this.kindnessArray = [];
        this.whoArray = [];
        this.dateArray = [];
        this.emptyArr = [];
    }
    /*
     * UPDATE STATE ARRAY
     * If done then kindness has been done for the day
     * @param - STRING state - what state it's in
     */
    KindnessService.prototype.updateStateArray = function (state) {
        localStorage.setItem("stateArray", state);
    };
    /*
    * LOAD STATE ARRAY
    */
    KindnessService.prototype.loadStateArray = function () {
        return localStorage.getItem("stateArray");
    };
    /*
    * LOAD ARRAYS
    */
    KindnessService.prototype.loadWhoArray = function () {
        if (!localStorage.getItem("whoArray")) {
            return this.emptyArr;
        }
        return JSON.parse(localStorage.getItem("whoArray"));
    };
    KindnessService.prototype.loadKindnessArray = function () {
        if (!localStorage.getItem("kindnessArray")) {
            return this.emptyArr;
        }
        return JSON.parse(localStorage.getItem("kindnessArray"));
    };
    KindnessService.prototype.loadDateArray = function () {
        if (!localStorage.getItem("kindnessArray")) {
            return this.emptyArr;
        }
        return JSON.parse(localStorage.getItem("dateArray"));
    };
    /*
    * STORE KINDNESS, RECEPTIENT & DATE DATA PER KIND ACTION
    * RETURNS ARRAY LENGTH
    */
    // saveData(who,kindness){
    KindnessService.prototype.saveData = function (kindness) {
        if (this.loadData() == 0) {
            this.kindnessArray = [];
            //this.whoArray = [];
            this.dateArray = [];
        }
        this.kindnessArray.unshift(kindness);
        //this.whoArray.unshift(who);
        var now = this.timeService.formatDateNow();
        this.dateArray.unshift(now);
        localStorage.setItem("kindnessArray", JSON.stringify(this.kindnessArray));
        localStorage.setItem("whoArray", JSON.stringify(this.whoArray));
        localStorage.setItem("dateArray", JSON.stringify(this.dateArray));
    };
    /*
    *
    * LOAD KINDNESS, RECEPTIENT & DATE DATA
    * RETURNS ARRAY LENGTH
    */
    KindnessService.prototype.loadData = function () {
        if (!localStorage.getItem("kindnessArray")) {
            return 0;
        }
        this.kindnessArray = JSON.parse(localStorage.getItem("kindnessArray"));
        // this.whoArray = JSON.parse(localStorage.getItem("whoArray"));
        this.dateArray = JSON.parse(localStorage.getItem("dateArray"));
        return this.kindnessArray.length;
    };
    KindnessService = __decorate([
        core_1.Component({
            providers: [time_service_1.TimeService]
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [time_service_1.TimeService])
    ], KindnessService);
    return KindnessService;
}());
exports.KindnessService = KindnessService;
//# sourceMappingURL=kindness.service.js.map