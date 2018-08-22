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
var WeatherComponent = (function () {
    function WeatherComponent() {
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.snow();
    };
    WeatherComponent.prototype.snow = function () {
        var _this = this;
        this.makeItRain("snowContainer1");
        this.snowTimeout = setInterval(function () {
            document.getElementById("snowContainer1").innerHTML = "";
            _this.makeItRain("snowContainer1");
        }, 10000);
        setTimeout(function () {
            _this.snowTimeout = setInterval(function () {
                document.getElementById("snowContainer2").innerHTML = "";
                _this.makeItRain("snowContainer2");
            }, 10000);
        }, 2500);
    };
    WeatherComponent.prototype.makeItRain = function (container) {
        for (var i = 0; i < 10; i++) {
            document.getElementById(container).innerHTML +=
                '<div id="snow" \
            style="\
            left: ' + Math.floor((Math.random() * 90) + 1) + 'vw;\
            border-radius: 500px;\
            animation-name: rain' + Math.floor((Math.random() * 2) + 1) + ';\
            animation-duration: ' + Math.floor((Math.random() * 5) + 2) + 's;\
            animation-delay: ' + Math.floor((Math.random() * 5) + 0) + 's;\
            background: white;\
            "></div>';
        }
    };
    WeatherComponent.prototype.rainSkulls = function () {
        jQuery('.preventHands').hide();
        jQuery('#tinselContainer').html('');
        for (var i = 0; i < 100; i++) {
            document.getElementById("tinselContainer").innerHTML +=
                '<div id="tinsel" \
            style="\
            z-index: 5;\
            left: ' + Math.floor((Math.random() * 90) + 1) + 'vw;\
            animation-name: rain' + Math.floor((Math.random() * 2) + 1) + ';\
            animation-duration: ' + Math.floor((Math.random() * 5) + 2) + 's;\
            animation-delay: ' + Math.floor((Math.random() * 10) + 0) + 's;">\
               <img src="./img/scenes/pretentious/skulls.png" width="50px">\
            </div>';
        }
        //  background-image: url("./img/icons/heart.png");\
        setTimeout(function () {
            document.getElementById("tinselContainer").innerHTML = "";
        }, 15000);
    };
    WeatherComponent.prototype.rainTinsel = function () {
        var colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
        colors[0];
        for (var i = 0; i < 100; i++) {
            document.getElementById("tinselContainer").innerHTML +=
                '<div id="tinsel" \
            style="\
            left: ' + Math.floor((Math.random() * 90) + 1) + 'vw;\
            animation-name: rain' + Math.floor((Math.random() * 2) + 1) + ';\
            animation-duration: ' + Math.floor((Math.random() * 5) + 2) + 's;\
            animation-delay: ' + Math.floor((Math.random() * 10) + 0) + 's;\
            background: ' + colors[Math.floor((Math.random() * colors.length) + 0)] + ';\
            "></div>';
        }
        setTimeout(function () {
            document.getElementById("tinselContainer").innerHTML = "";
        }, 15000);
    };
    WeatherComponent = __decorate([
        core_1.Component({
            selector: 'weather',
            template: "\n\n\n    <div id=\"weatherContainer\">\n        <div id=\"snowContainer1\" style=\"position: absolute; margin-top: -60px;\"></div>\n        <div id=\"snowContainer2\" style=\"position: absolute; margin-top: -60px;\"></div>\n        <div id=\"tinselContainer\" style=\"position: absolute; margin-top: -60px;\"></div>\n    </div>\n    \n\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map