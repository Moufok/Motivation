export enum ProductsActionsTypes {
GET_ALL_PRODUCTS="[PRODUCT] Get All Products",
GET_Selected_PRODUCTS="[PRODUCT] Get Selected Products",
GET_Available_PRODUCTS="[PRODUCT] Get Available Products",
Search_PRODUCTS="[PRODUCT] Search Products",
New_PRODUCTS="[PRODUCT] New Products",
Select_PRODUCTS="[PRODUCT] Select Products",
Edit_PRODUCTS="[PRODUCT] Edit Products",
Delete_PRODUCTS="[PRODUCT] Delete Products"
}

export interface ActionEvent{
    type: ProductsActionsTypes,
    payload?: any
}
export interface AppDataState<T>{
    dataState?:DataStateEnum,
    data?: T,
    errorMessage?:string
}

export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
}