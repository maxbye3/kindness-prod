import { Directive } from '@angular/core';
import { SonnyDialogue } from '../sonny.dialogue.component';
import { GeneratorBackend } from '../generator.component';
import { PretentiousComponent } from '../pretentious.component';
import { BadBroDialogue } from '../badBroDialogue.directive';
import { ThemeComponent } from '../settings/theme/theme.component';
import { inputNameEmail } from '../inputNameEmail.component';
import { SwiperComponent } from '../generator/swiper.component';
import { AlternativeKindness } from '../alternativeHome/alternateKindnessView.component';
declare var jQuery: any;

@Directive({
  providers: []
})

export class EditComponent {

  constructor() {    
  }

  editMode(){
    jQuery('.swiper-slide, .arrow, .swiper-container h2, .helpMenu').hide();
    jQuery('.kindnessEdit').show().val(jQuery('.swiper-slide-active').html());
    jQuery('.accept p').html('done editing');
    jQuery('.swiper-container h1').html('Please edit the kindness below:');
    jQuery('.editMenu .menuItem').show();
    // jQuery('.editMenu .menuItem').show().css({'width':'auto','padding':'2px','font-size':'20px'});
    jQuery('.kindnessEdit').attr('editKindness','true');
  }

  editingDone(){
    jQuery('.swiper-slide, .arrow, .helpMenu').show();
    jQuery('.accept p').html('accept');
    jQuery('.swiper-container h1').html('Please choose a kindness that you can complete today: ');
    jQuery('.swiper-container h2').show();
    jQuery('.editMenu .menuItem, .kindnessEdit').hide();
    jQuery('.kindnessEdit').attr('editKindness','false');
  }





}