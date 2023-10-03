import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

import authStore from "./AuthStore";


class BasketState{

    _amt = undefined
    _elements = undefined
    _selectedElements = undefined

    constructor() {
        /*
        * хранит данные о товарах которые помещены в Корзину.
        * собрал в себе все методы работы с этим функционалом.
        *
        *
        * */
        makeAutoObservable(this)
    }
    get amt(){
        // получение информации о количестве товара в корзине
        if(!this._amt){
            this._getAmt()
        }
        return this._amt
    }

    get elements(){
        // список элементов
        if(!this._elements){
            this._getElements()
        }

        return this._elements
    }

    _getAmt(){
        // получение данных о количестве товаров с сервера.
        authStore.authAjaxFetch(ajaxFetch({
            url:'/basket/amt/',
            method:"GET"
        })).then(response=>{
            let [ok,error]= response
            if(ok){
               ok.then(res=> runInAction(()=>{ this._amt = res.amt}) )
            }
            if(error){
                runInAction(()=>{ this._amt = undefined})
            }
        })
    }
    _getElements(){
        // получение список товаров с сервера.
        ajaxFetch({
            url:'/basket/',
            method:"GET"
        }).then(response=>{
            let [ok,error]= response
            if(ok){
                ok.then(res=> runInAction(()=>{ this._elements = res}) )
                this._getAmt()
            }
        })
    }

    async addToBasket(productID){
        //добавить товар в корзину по id
        let request = ajaxFetch({
            url:'/basket/',
            method:'POST',
            data: JSON.stringify({product_id:productID})
        })
        request.then(resonse=>{
            let [ok,error]=resonse
            if(ok){
                runInAction(()=>{
                    this._getAmt()
                    this._elements = undefined
                })
            }
        })
        return  request
    }
    async delToBasket(productID){
        //убрать товар из корзины по id
        let request = ajaxFetch({
            url:'/basket/',
            method:'DELETE',
            data: JSON.stringify({"product_id":productID})
        })

        request.then(resonse=>{

            let [ok,error]=resonse
            if(ok){
                runInAction(()=>{
                    this._getAmt()
                    this._elements.splice(this._elements.findIndex(v=>v.product.id === productID),1)
                })

            }
        })

        return  request
    }

    addAmtToOrder(element){
        // увеличить количество товара в корзине
        if(element.amt >= 99){
            return
        }
        ajaxFetch({
            url:`/basket/order/${element.id}/add-amt/`,
            method:'POST',

        }).then(response=>{
            let [ok,error] = response
            if(ok){
                runInAction(()=>{
                    element.amt = element.amt+1
                    this._amt+=1;
                });
            }
        })
    }
    minesAmtToOrder(element){
        // уменьшить количество товара в корзине
        if(element.amt<=0){
            return
        }
        ajaxFetch({
            url:`/basket/order/${element.id}/mines-amt/`,
            method:'POST',
        }).then(response=>{
            let [ok,error] = response
            if(ok){
                runInAction(()=>{
                    element.amt = element.amt-1
                    this._amt-=1;
                });
            }
        })
    }

    getSumPriceForAmt(){
        //получить стойкость всех выбранных товаров
        if (this._selectedElements){
            return this._selectedElements.reduce((sum,element)=>sum + (element.amt * element.product.price ),0)
        }
        return

    }

    deleteAllOrderProduct(){
        // очистка корзины
       if(this._elements){
           this._elements.forEach(orderProduct=>{
               this.delToBasket(orderProduct.product.id)
           })
       }
    }

    addToSelected(element){
        // Добавить товар в выбранные. Нужно для пославшего оформления.
        if(this._selectedElements){
            this._selectedElements.push(element)
            return
        }
        this._selectedElements = [element]
    }
    delFromSelected(element){
        // Добавить товар в выбранные. Нужно для пославшего оформления.
        if(this._selectedElements){
            this._selectedElements.splice(this._selectedElements.findIndex(v=>v===element),1)
        }
    }

    isSelected(element){
        // проверка нахождение товара в списке выбранных.
        if(this._selectedElements){
           return   this._selectedElements.includes(element)
        }
        return false
    }


    async formalizationSelectOrder(){
        //оформление выбранных заказов.
        if(this._selectedElements){
            await  ajaxFetch({
                url:'/basket/order/formalization/',
                method:"PUT",
                data:JSON.stringify({'orders': this._selectedElements.map(v=>v.id)})
            }).then(response=>{
                let [ok,error]= response
                if(ok){
                    ok.then(res=> runInAction(()=>{
                        this._elements.filter(v=>!this._selectedElements.includes(v))
                        this._selectedElements = undefined
                    }) )
                    this._getAmt()
                }
            })
        }else{
            throw new Error('Basket is empty').message
        }

    }
    cleanInfo(){
        //очистить информацию еа стороне клиента.
        runInAction(()=>{
            this._amt = undefined
            this._elements = undefined
            this._selectedElements = undefined
        })
    }
}
const stateBasket =  new BasketState()
export default stateBasket;