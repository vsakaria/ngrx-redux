import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'reminders',
  template: `
  <section class="fem-card mdl-card mdl-shadow--2dp">
    <h4>Reminder</h4>
    <div>{{ reminders }}</div>
  </section>
  `
})
export class Reminders {

    @Input() reminders;
}
