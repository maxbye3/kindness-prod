import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'my-voter',
  template: `
  `
})

export class VoterComponent {  
  @Output() onVoted = new EventEmitter<boolean>();
  
  constructor() {
        setTimeout(() => {  
             this.onVoted.emit(true);
        }, 3000);
    }
}