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
var BoatComponent = (function () {
    function BoatComponent() {
    }
    BoatComponent.prototype.ngOnInit = function () {
    };
    /*
     * Graphic Check
     * Check what sort of boat it is
     * Sometimes when entering calander mode there's the wrong boat
     */
    BoatComponent.prototype.graphicCheck = function () {
        if (jQuery(".skipContainer").attr('theme') == 'winter' || jQuery(".skipContainer").attr('theme') == 'summer') {
            jQuery('.pretentiousShip').hide();
            jQuery('.summerShip').show();
        }
        else {
            jQuery('.summerShip').hide();
            jQuery('.pretentiousShip').show();
        }
    };
    BoatComponent.prototype.moveBoat = function (type) {
        var boatImg, boatImgFlip, classname, interval1, interval2;
        clearInterval(interval1);
        clearInterval(interval2);
        if (type == 'pretentious') {
            classname = 'pretentious';
            boatImg = 'img/scenes/pretentious/pirateship.gif?' + new Date().getTime();
            boatImgFlip = 'img/scenes/pretentious/pirateship-flip.gif?' + new Date().getTime();
        }
        else if (type == 'summer') {
            classname = 'summer';
            boatImg = 'img/scenes/sailboat.png';
            boatImgFlip = 'img/scenes/sailboat-flip.png';
        }
        else if (type == 'winter') {
            classname = 'summer';
            boatImgFlip = 'img/sledder-reverse.gif?' + new Date().getTime();
            boatImg = 'img/sledder.gif?' + new Date().getTime();
            jQuery('.summerShip').show();
        }
        /*
         * BOAT ANIMATION
         * Move boat across screen without disrupting screen
         * Randomise boat movements
         */
        var boatSpeed = 12000;
        //var boatSpeed = 2000;
        // x-axis needs to start from 350px and end at -100px
        var startX = jQuery(window).width() + jQuery("." + classname + "Ship img").width(), endX = -300;
        // set boat css here to match boatSpeed
        jQuery("." + classname + "Ship img").css({
            "-webkit-transition": "-webkit-transform " + boatSpeed / 1000 + "s",
            "transition": "-webkit-transform " + boatSpeed / 1000 + "s",
            "transition-timing-function": "linear",
            "-webkit-transition-timing-function": "linear"
        });
        // after 2 seconds
        var startPos = startX;
        boatTravel(startPos);
        setTimeout(function () {
            boatTravel(endX);
        }, boatSpeed * .75);
        interval1 = setInterval(function () {
            boatTravel(startX);
        }, 2 * boatSpeed);
        setTimeout(function () {
            interval2 = setInterval(function () {
                boatTravel(endX);
            }, 2 * boatSpeed);
        }, boatSpeed);
        function boatTravel(x) {
            if (x == startX) {
                jQuery("." + classname + "Ship img").attr("src", boatImgFlip); // reverse image
            }
            else {
                jQuery("." + classname + "Ship img").attr("src", boatImg); // dont reverse image            
            }
            // y-axis needs to vary between 0px and 500px         
            var yAxis = Math.floor((Math.random() * jQuery(window).height() * .5));
            jQuery("." + classname + "Ship img").css({
                "-webkit-transform": "translate(" + x + "px," + yAxis + "px)",
                "transform": "translate(" + x + "px," + yAxis + "px)",
                "opacity": "1",
            });
        }
    };
    BoatComponent = __decorate([
        core_1.Component({
            selector: 'boat-component',
            templateUrl: 'app/settings.component.html',
            styleUrls: ['app/settings.component.css'],
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BoatComponent);
    return BoatComponent;
}());
exports.BoatComponent = BoatComponent;
//# sourceMappingURL=boat.component.js.map