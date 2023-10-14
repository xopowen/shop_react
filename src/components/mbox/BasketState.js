import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

import authStore from "./AuthStore";


/**
 * @class BasketState
 * @description хранит данные о товарах которые помещены в Корзину.
 * @description собрал в себе все методы работы с этим функционалом.
 */
class BasketState{

    _amt = undefined
    _elements = undefined
    _selectedElements = undefined

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @getter
     * @description получение информации о количестве товара в корзине.
     * @return {status<undefined | Number>}
     */
    get amt(){
        if(!this._amt){
            this._getAmt()
        }
        return this._amt
    }
    /**
     * @getter
     * @description получение список элементов в корзине.
     * @return {status<undefined | Array<Object>>}
     */
    get elements(){
        if(!this._elements){
            this._getElements()
        }
        return this._elements
    }

    /**
     * @description получение данных о количестве товаров с сервера.
     * @private
     * @url '/basket/amt/'
     */
    _getAmt(){
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

    /**
     * @description получение список товаров с сервера.
     * @private
     */
    _getElements(){
        ajaxFetch({
            url:'/basket/',
            method:"GET"
        }).then(response=>{
            let [ok,]= response
            if(ok){
                ok.then(res=> runInAction(()=>{ this._elements = res}) )
                this._getAmt()
            }
        })
    }

    /**
     * @async
     * @param {Number} productID
     * @description добавить товар в корзину по id
     * @return {Promise<*[]|*>}
     */
    async addToBasket(productID){
        let request = ajaxFetch({
            url:'/basket/',
            method:'POST',
            data: JSON.stringify({product_id:productID})
        })
        request.then(resonse=>{
            let [ok,]=resonse
            if(ok){
                runInAction(()=>{
                    this._amt += 1
                    this._elements = undefined
                })
            }
        })
        return  request
    }

    /**
     * @async
     * @description убрать товар из корзины по id
     * @param {Number} productID
     * @return {Promise<*[]|*>}
     */
    async delToBasket(productID){
        let request = ajaxFetch({
            url:'/basket/',
            method:'DELETE',
            data: JSON.stringify({"product_id":productID})
        })
        request.then(resonse=>{
            let [ok,]=resonse
            if(ok){
                runInAction(()=>{
                    this._getAmt()
                    this._elements.splice(this._elements.findIndex(v=>v.product.id === productID),1)
                })

            }
        })

        return  request
    }

    /**
     * @method
     * @param {Object} element
     * @description увеличить количество товара в корзине
     * @description максимальное количество товаров 99.
     * @url `/basket/order/${element.id}/add-amt/`
     */
    addAmtToOrder(element){
        if(element.amt >= 99){
            return
        }
        ajaxFetch({
            url:`/basket/order/${element.id}/add-amt/`,
            method:'POST',
        }).then(response=>{
            let [ok,] = response
            if(ok){
                runInAction(()=>{
                    element.amt = element.amt+1
                    this._amt+=1;
                });
            }
        })
    }

    /**
     * @method
     * @param {Object} element
     * @description уменьшить количество товара в корзине
     * @description минимальное количество товаров 99.
     * @url `/basket/order/${element.id}/add-amt/`
     */
    minesAmtToOrder(element){
        if(element.amt<=0){
            return
        }
        ajaxFetch({
            url:`/basket/order/${element.id}/mines-amt/`,
            method:'POST',
        }).then(response=>{
            let [ok,] = response
            if(ok){
                runInAction(()=>{
                    element.amt = element.amt-1
                    this._amt-=1;
                });
            }
        })
    }

    /**
     * @method
     * @description получить стойкость всех выбранных товаров
     * @return {Number | undefined}
     */
    getSumPriceForAmt(){
        if (this._selectedElements ){
            return this._selectedElements.reduce((sum,element)=>sum + (element.amt * element.product.price ),0)
        }
    }

    /**
     * @method
     * @description очистка корзины
     * @description для каждого элемента вызывает delToBasket
     */
    deleteAllOrderProduct(){
        //
       if(this._elements){
           this._elements.forEach(orderProduct=>{
               this.delToBasket(orderProduct.product.id)
           })
       }
    }

    /**
     * @method
     * @description Добавить товар в выбранные. Нужно для пославшего оформления.
     * @param {Object} element
     */
    addToSelected(element){
        if(this._selectedElements){
            this._selectedElements.push(element)
            return
        }
        this._selectedElements = [element]
    }

    /**
     * @method
     * @description добавить товар в выбранные. Нужно для пославшего оформления.
     * @param {Object} element
     */
    delFromSelected(element){
        if(this._selectedElements){
            this._selectedElements.splice(this._selectedElements.findIndex(v=>v===element),1)
        }
    }

    /**
     * @method
     * @param {Object} element
     * @description проверка нахождение товара в списке выбранных.
     * @return {boolean}
     */
    isSelected(element){
        if(this._selectedElements){
           return   this._selectedElements.includes(element)
        }
        return false
    }


    /**
     * @async
     * @description оформление выбранных заказов. Если они есть
     * @url '/basket/order/formalization/'
     * @return {Promise<void>}
     */
    async formalizationSelectOrder(){
        if(this._selectedElements){
            await  ajaxFetch({
                url:'/basket/order/formalization/',
                method:"PUT",
                data:JSON.stringify({'orders': this._selectedElements.map(v=>v.id)})
            }).then(response=>{
                let [ok,]= response
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

    /**
     * @method
     * @description очистить информацию еа стороне клиента.
     */
    cleanInfo(){
        runInAction(()=>{
            this._amt = undefined
            this._elements = undefined
            this._selectedElements = undefined
        })
    }
}
const stateBasket =  new BasketState()
export default stateBasket;