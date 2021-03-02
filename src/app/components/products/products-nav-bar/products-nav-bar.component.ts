import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventDriverService } from 'src/app/services/EventDriverService';
import { ActionEvent, ProductsActionsTypes } from 'src/app/state/products.state';


@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.GET_ALL_PRODUCTS})
  }

  onGetSelectedProducts(){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.GET_Selected_PRODUCTS})
  }
  onGetAvailableProducts(){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.GET_Available_PRODUCTS})

  }

  onSearch(dataForm:any){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.Search_PRODUCTS,payload:dataForm})
  }
  onNewProduct(){
    this.eventDriverService.publishEvent({type:ProductsActionsTypes.New_PRODUCTS})
  }

}
