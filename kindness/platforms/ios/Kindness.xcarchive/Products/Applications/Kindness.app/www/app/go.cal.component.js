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
var cal_component_1 = require('./cal.component');
var boat_component_1 = require('./boat.component');
var GoCalComponent = (function () {
    function GoCalComponent(calComponent, boatComponent) {
        this.boatComponent = boatComponent;
        this.calyCount = 0;
        this.calComponent = calComponent;
    }
    /*
     * Go To Calander View
     */
    GoCalComponent.prototype.toCal = function () {
        jQuery('.goToCal,.orTxt, .intentionTask, .completeContainer').show();
        jQuery('.sliderComponent').hide();
        jQuery('.calView').show();
        this.calComponent.intTask();
        jQuery('.kindnessCal').attr('kindnessView', 'false'); // stop cal from appearing
        jQuery("html, body").animate({
            scrollTop: jQuery(document).height()
        }, 1000);
        this.boatComponent.graphicCheck();
        // removes hands and thorns that screws up pretentious theme
        jQuery(".handsContainer,.thornContainer").fadeOut("slow");
        setTimeout(function () {
            document.getElementById("calyGif").style.display = "block";
            document.getElementById("calyGif").style.opacity = "1";
        }, 500);
        // Cal Count
        this.calyCount++;
        this.setupCaly();
        jQuery('.square,.more,#backKindness').css('color', 'black'); // change text colours to correct in cal mode
        jQuery('.helpMenu').hide();
        jQuery('.goToCal').hide();
        return;
    };
    /*
    * SETUP CALY
    * The number of times you return to window
    * Caly will get more and more annoyed
    */
    GoCalComponent.prototype.setupCaly = function () {
        if (jQuery(".calyDiv").attr("winning") == "true") {
            this.calyCount = 1;
        }
        switch (this.calyCount) {
            case 1:
                this.calComponent.calyState("intro");
                break;
            case 2:
                jQuery("#calyIdle").attr('idle', 'false');
                jQuery("#calyIdle").css("opacity", "0").hide();
                //console.log("caly phone");
                document.getElementById("calyCall").style.display = "none";
                this.calComponent.calyState("return-phone");
                break;
            default:
                jQuery('.calView .speechDiv').hide();
                jQuery("#calyIdle").css("opacity", "0").hide();
                //console.log("caly gone");
                clearTimeout(this.calComponent.calyTimeout);
                document.getElementById("calType").innerHTML = ""; // remove text from bubble
                document.getElementById("calyGif").style.right = "-200px";
                document.getElementById("calType").innerHTML = "";
                document.getElementById("calyGif").style.display = "none";
                document.getElementById("calyPhone").style.display = "none";
                document.getElementById("calyCall").style.display = "block";
                this.calComponent.calyState("");
                break;
        }
    };
    GoCalComponent = __decorate([
        core_1.Component({
            selector: 'go-cal',
            template: "",
            styleUrls: ['app/app.component.css'],
            providers: [cal_component_1.CalComponent, boat_component_1.BoatComponent]
        }), 
        __metadata('design:paramtypes', [cal_component_1.CalComponent, boat_component_1.BoatComponent])
    ], GoCalComponent);
    return GoCalComponent;
}());
exports.GoCalComponent = GoCalComponent;
//# sourceMappingURL=go.cal.component.js.map