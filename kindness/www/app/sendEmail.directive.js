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
var SendEmail = (function () {
    function SendEmail() {
    }
    SendEmail.prototype.send = function (type, msg) {
        // add href to .settingsBox    
        var href = 'mailto:kindnessapp@gmail.com?subject=' + type + '&body=' + msg;
        jQuery('.settingsBox a').attr('target', '_blank').attr('href', href).click();
        // if web
        // jQuery.ajax({
        //   url: "https://formspree.io/maxbye@gmail.com", 
        //   method: "POST",
        //   data: {subject: type,message:msg},
        //   dataType: "json"
        // });
    };
    SendEmail = __decorate([
        core_1.Directive({
            selector: 'name-email'
        }), 
        __metadata('design:paramtypes', [])
    ], SendEmail);
    return SendEmail;
}());
exports.SendEmail = SendEmail;
//# sourceMappingURL=sendEmail.directive.js.map