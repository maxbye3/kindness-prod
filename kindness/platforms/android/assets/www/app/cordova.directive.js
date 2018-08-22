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
var time_service_1 = require('./time.service');
var theme_component_1 = require('./theme.component');
var Cordova = (function () {
    function Cordova(themeComponent, timeService) {
        this.themeComponent = themeComponent;
        this.timeService = timeService;
    }
    // Handle the resume event
    Cordova.prototype.onResume = function () {
        jQuery(".iosFix").hide();
        /*
        * RESET MODE
        * If left on either compassion or kindness generator then resume from there
        * Disable the attr
        * Don't do rest of time service
        
        */
        function resetMode(mode) {
            if (jQuery('#' + mode).attr('active') == 'true') {
                jQuery('#' + mode).show();
                if (jQuery('#compassion-flow').css('display') == 'none') {
                    jQuery('#compassion-flow').attr('active', 'false');
                }
                if (jQuery('#kindness-generator').css('display') == 'none') {
                    jQuery('#kindness-generator').attr('active', 'false');
                }
                return true;
            }
            else {
                // reset to kindness screen
                return false;
            }
        }
        var badBroInvisibile = jQuery('#sonnyStatic').attr('char') != 'badBro';
        if (badBroInvisibile) {
            if (resetMode('compassion-flow') || resetMode('kindness-generator')) {
                return;
            }
        }
        jQuery(".badBroDialogue").css('opacity', '0').html('');
        if (jQuery('#kindnessView').css('display') == 'none') {
            var classname = 'doneView';
        }
        else if (jQuery('#doneView').css('display') == 'none') {
            classname = 'kindnessView';
        }
        this.timeService.dayCheck(classname);
        jQuery(".sonnyContainer").attr("introAllowed", "true");
        this.themeComponent.setTheme('summer');
    };
    Cordova = __decorate([
        core_1.Directive({
            providers: [time_service_1.TimeService, theme_component_1.ThemeComponent]
        }), 
        __metadata('design:paramtypes', [theme_component_1.ThemeComponent, time_service_1.TimeService])
    ], Cordova);
    return Cordova;
}());
exports.Cordova = Cordova;
//# sourceMappingURL=cordova.directive.js.map