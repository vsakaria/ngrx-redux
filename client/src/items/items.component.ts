import {Component} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from '@ngrx/store';
import {ItemsService} from '../common/services/items.service.ts';
import {AppStore} from '../common/models/appstore.model';
import {Item} from '../common/models/item.model';
import {ItemsList} from './items-list.component';
import {ItemDetail} from './item-detail.component';
import {Reminders} from '../reminders/reminders.component';

import {Gadget} from '../common/models/gadget.model';
import {GadgetService} from '../common/services/gadget.service.ts'

@Component({
  selector: 'items',
  template: `
  <div class="mdl-grid items">
    
    <div class="mdl-cell mdl-cell--6-col">
      
      <items-list [items]="items | async"
        
        (selected)="selectItem($event)" (deleted)="deleteItem($event)"
        (reminder)="setReminder($event)">

      </items-list>
    
    </div>
    
    <div class="mdl-cell mdl-cell--6-col">
      
      <item-detail
        (saved)="saveItem($event)" (cancelled)="resetItem($event)"
        [item]="selectedItem | async">

            Select an Item

      </item-detail>
    
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      
      <reminders
          [reminders]="itemReminders | async">
      </reminders>
    
    </div>

    
  </div>
  `,
  styles: [`
    .items {
      padding: 20px;
    }
  `],
  providers: [ItemsService],
  directives: [ItemsList, ItemDetail, Reminders]
})
export class Items {

  items: Observable<Array<Item>>;
  selectedItem: Observable<any>;
  
  itemReminders: Observable<any>;

  gadget: Observable<Gadget>;

  constructor(private itemsService: ItemsService,
              private gadgetService: GadgetService,
              private store: Store<AppStore>) {

    this.items = itemsService.items;

    this.selectedItem = store.select('selectedItem');

    this.itemReminders = store.select('reminders');
    
    this.gadget = gadgetService.gadget;

    itemsService.loadItems();
  }

  resetItem() {
    let emptyItem: Item = {id: null, name: '', description: ''};
    this.store.dispatch({type: 'SELECT_ITEM', payload: emptyItem});
  }

  selectItem(item: Item) {
    this.store.dispatch({type: 'SELECT_ITEM', payload: item});
  }

  setReminder(item: Item) {
      console.log(item);
      this.store.dispatch({type: 'CREATE_REMINDER', payload: item});
  }

  saveItem(item: Item) {
    this.itemsService.saveItem(item);

    // Generally, we would want to wait for the result of `itemsService.saveItem`
    // before resetting the current item.
    this.resetItem();
  }

  deleteItem(item: Item) {
    this.itemsService.deleteItem(item);

    // Generally, we would want to wait for the result of `itemsService.deleteItem`
    // before resetting the current item.
    this.resetItem();
  }
}
