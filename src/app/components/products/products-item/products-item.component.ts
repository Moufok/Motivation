import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/EventDriverService';
import { ActionEvent, ProductsActionsTypes } from 'src/app/state/products.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input()p?:Product;
  @Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter()
  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(p:Product){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.Select_PRODUCTS, payload:p})
  }

  onEdit(p:Product){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.Edit_PRODUCTS, payload:p})
  }
  onDelete(p:Product){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.Delete_PRODUCTS, payload:p})
  }

}
