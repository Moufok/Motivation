import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/EventDriverService';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductsActionsTypes } from 'src/app/state/products.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
   readonly DataStateEnum = DataStateEnum
  constructor(private eventDriverService: EventDriverService, private productsService:ProductsService, private router:Router){

  }
  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
    this.onActionEvent(actionEvent)
    })
  }

  onGetAllProducts(){
     this.products$ = this.productsService.getAllProducts()
     .pipe(
        map(
          data=> {
          return ({dataState:DataStateEnum.LOADED,data:data})}
        ),
        startWith(
          {dataState:DataStateEnum.LOADING}
        ),
        catchError(
          err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
        )
     )
  }

  onGetSelectedProducts(){
    this.products$ = this.productsService.getSelectedProducts()
    .pipe(
       map(
         data=> {
         return ({dataState:DataStateEnum.LOADED,data:data})}
       ),
       startWith(
         {dataState:DataStateEnum.LOADING}
       ),
       catchError(
         err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
       )
    )
  }

  onGetAvailableProducts(){
    this.products$ = this.productsService.getAvailableProducts()
    .pipe(
       map(
         data=> {
         return ({dataState:DataStateEnum.LOADED,data:data})}
       ),
       startWith(
         {dataState:DataStateEnum.LOADING}
       ),
       catchError(
         err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
       )
    )

  }

  onSearch(dataForm:any){
    this.products$ = this.productsService.searchProducts(dataForm.keyword)
    .pipe(
       map(
         data=> {
         return ({dataState:DataStateEnum.LOADED,data:data})}
       ),
       startWith(
         {dataState:DataStateEnum.LOADING}
       ),
       catchError(
         err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
       )
    )
  }

  onSelect(p:Product){
    this.productsService.selectProducts(p).subscribe(
      data=>p.selected=data.selected
    )
  }

  onDelete(p:Product){
    let v = confirm("étes vous sur de supprimer ?")
    if(v)
    this.productsService.deleteProducts(p).subscribe(
    data=>{this.onGetAllProducts()}
    )
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event:ActionEvent){
  switch($event.type){
  case ProductsActionsTypes.GET_ALL_PRODUCTS : this.onGetAllProducts(); break;
  case ProductsActionsTypes.GET_Selected_PRODUCTS : this.onGetSelectedProducts(); break;
  case ProductsActionsTypes.GET_Available_PRODUCTS : this.onGetAvailableProducts(); break;
  case ProductsActionsTypes.New_PRODUCTS : this.onNewProduct(); break;
  case ProductsActionsTypes.Search_PRODUCTS : this.onSearch($event.payload); break;
  case ProductsActionsTypes.Select_PRODUCTS : this.onSelect($event.payload); break;
  case ProductsActionsTypes.Edit_PRODUCTS : this.onEdit($event.payload); break;
  case ProductsActionsTypes.Delete_PRODUCTS : this.onDelete($event.payload); break;
  }
  }
}
