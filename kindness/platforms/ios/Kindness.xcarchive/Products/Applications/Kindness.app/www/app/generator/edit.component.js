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
var EditComponent = (function () {
    function EditComponent() {
    }
    EditComponent.prototype.editMode = function () {
        jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
        jQuery('.kindnessEdit').show().val(jQuery('.swiper-slide-active').html());
        jQuery('.accept p').html('done editing');
        jQuery('.swiper-container h1').html('Please edit the kindness below:');
        jQuery('.editMenu .menuItem').show();
        // jQuery('.editMenu .menuItem').show().css({'width':'auto','padding':'2px','font-size':'20px'});
        jQuery('.kindnessEdit').attr('editKindness', 'true');
    };
    EditComponent.prototype.editingDone = function () {
        jQuery('.swiper-slide, .arrow, .helpMenu').show();
        jQuery('.accept p').html('accept');
        jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
        jQuery('.swiper-container h2').show();
        jQuery('.editMenu .menuItem, .kindnessEdit').hide();
        jQuery('.kindnessEdit').attr('editKindness', 'false');
    };
    EditComponent = __decorate([
        core_1.Directive({
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map