import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

import authStore from "./AuthStore";

class CompareProductsState{

    _amt = undefined
    _catalogs = undefined
    _loading = false
    _products = undefined

    _productsListId = []


    constructor() {
        /*
        * хранит данные о товарах которые помещены для сравнения.
        * собрал в себе все методы работы с этим функционалом.
        *
        *
        * */
        makeAutoObservable(this)
    }

    get isLoading(){
        return this._loading
    }

    get amt(){
        //количество товаров для сравнения.
        if(!this._amt){
            this._getAmt()
        }
        return this._amt
    }

    get catalogs(){
        /* Каталоги товаров которые сравниваются.

        * */
        if(!this._catalogs){
            this._getCompareCatalogs()
        }

        return this._catalogs
    }

    get products(){
        //список сравнимых продуктов
        return this._products
    }
    set products(value){
        runInAction(()=>{
            this._products = value
        })
    }

    async _getAmt(){
        // получение количество товаров для сравнения с сервера.   url:'/comparisons/amt/',
        runInAction(()=>{this._loading = true })
        await authStore.authAjaxFetch(ajaxFetch({
            url:'/comparisons/amt/',
            method:"GET"
        })).then(response=>{
            let [ok,error]= response
            if(ok){
                ok.then(res=> runInAction(()=>{ this._amt = res.amt}) )
            }
            if(error){
                runInAction(()=>{ this._amt = undefined})
            }
        }).finally(()=>{
             runInAction(()=>{ this._loading = false})
        })
    }
    async _getCompareCatalogs(){
        //получение списка каталогов товаров.  url:'/comparisons/',
        runInAction(()=>{this._loading = true })
        await ajaxFetch({
            url:'/comparisons/',
            method:"GET"
        }).then(response=>{
            let [ok,error]= response
            if(ok){
                ok.then(res=> runInAction(()=>{ this._catalogs = res}) )
                this._getAmt()
            }
        }).finally(()=>{
             runInAction(()=>{ this._loading = false})
        })
    }
    async addToCompare(product_id){
        //добавить товар в список для сравнения
        if(!this.checkProductToCompare(product_id)) {
            runInAction(()=>{this._loading = true })
            await ajaxFetch({
                url:`/comparisons/add/`,
                method:'POST',
                data:JSON.stringify({'product_id':product_id})
            }).then(response=>{
                let [ok,error] = response
                if(ok){
                    runInAction(()=>{
                        this._productsListId.push(product_id)
                        this._getAmt()
                        this._catalogs = undefined
                    })
                }

            }).finally(()=>{
                runInAction(()=>{ this._loading = false})
            })
        }
    }
    async delFromCompare(product_id){
        //убрать товар из списка для сравнения
        runInAction(()=>{this._loading = true })
        await ajaxFetch({
            url:`/comparisons/del/`,
            method:'DELETE',
            data:JSON.stringify({'product_id':product_id})
        }).then(response=>{
            let [ok,error] = response
            if(ok){
                runInAction(()=>{
                    this._products = this._products.filter(v=>v.id !== product_id)
                    this._productsListId = this._productsListId.filter(v=>v.id !== product_id)
                    this._amt-=1;
                })
            }

        }).finally(()=>{
            runInAction(()=>{ this._loading = false})
        })
    }

    checkProductToCompare(product_id){
        // проверить находится ли товар в списке для сравнения.
        if ( this._productsListId.includes(product_id)){
            return true
        }
        runInAction(()=>{this._loading = true })
          ajaxFetch({
            url:`/comparisons/check/${product_id}/`,
            method:'get',
        }).then(response=>{
            let [ok,error] = response
            if(ok){
                ok.then(res=>{
                    if(res.exists){
                        runInAction(()=>{
                            this._productsListId.push(product_id)
                        })
                    }
                })

            }
        }).finally(()=>{
             runInAction(()=>{ this._loading = false})

        })
        return false
    }
    
}
let stateCompare = new CompareProductsState()

export default stateCompare;