import { Directive } from '@angular/core';
import { GeneratorBackend } from '../generator.component';
import { SwiperComponent } from '../generator/swiper.component';
declare var jQuery: any;

@Directive({})

export class suggestionsTransition {

  constructor(
    private swiperComponent : SwiperComponent,
    private generatorBackend : GeneratorBackend
    ) {}

    /*
    * INT STATE
    */
    intSuggestions(){
      console.log('askingSuggestions');
    }

}