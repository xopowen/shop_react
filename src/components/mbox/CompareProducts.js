import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

import authStore from "./AuthStore";

/**
 * @class CompareProductsState
 * @type {makeAutoObservable}
 * @description хранит данные о товарах которые помещены для сравнения.
 * @description собрал в себе все методы работы с этим функционалом.
 */
class CompareProductsState{

    _amt = undefined
    _catalogs = undefined
    _loading = false
    _products = undefined
    _productsListId = []


    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @getter
     * @description идет ли загрузка какого либо ресурса.
     * @return {boolean}
     */
    get isLoading(){
        return this._loading
    }

    /**
     * @description количество товаров для сравнения.
     * @description если данных нет получат информацию с сервера.
     * @return {status<Number>}
     */
    get amt(){
        //
        if(!this._amt){
            this._getAmt()
        }
        return this._amt
    }

    /**
     * @getter
     * @description получение каталогов товаров которые сравниваются.
     * @return {status<undefined | Array<Object>>}
     */
    get catalogs(){
        if(!this._catalogs){
            this._getCompareCatalogs()
        }
        return this._catalogs
    }

    /**
     * @getter
     * @description список сравнимых продуктов
     * @return {status<undefined | Array<Object>>}
     */
    get products(){
        return this._products
    }

    /**
     * @setter
     * @param value
     */
    set products(value){
        runInAction(()=>{
            this._products = value
        })
    }


    /**
     * @async
     * @return {Promise<void>}
     * @private
     * @url  '/comparisons/amt/'
     * @description получение количество товаров для сравнения с сервера.
     */
    async _getAmt(){
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

    /**
     * @async
     * @return {Promise<void>}
     * @private
     * @url '/comparisons/'
     * @description получение списка каталогов у товаров которые сравниваются.
     */
    async _getCompareCatalogs(){
        runInAction(()=>{this._loading = true })
        await ajaxFetch({
            url:'/comparisons/',
            method:"GET"
        }).then(response=>{
            let [ok,]= response
            if(ok){
                ok.then(res=> runInAction(()=>{ this._catalogs = res}) )
                this._getAmt()
            }
        }).finally(()=>{
             runInAction(()=>{ this._loading = false})
        })
    }


    /**
     * @async
     * @param product_id
     * @return {Promise<void>}
     * @description добавить товар в список для сравнения если его там ещё нет.
     * @description если товар добавлен -> стираются данные о каталогах
     * чтобы их можно было запросить снова.
     * @url `/comparisons/add/`
     */
    async addToCompare(product_id){
        if(!this.checkProductToCompare(product_id)) {
            runInAction(()=>{this._loading = true })
            await ajaxFetch({
                url:`/comparisons/add/`,
                method:'POST',
                data:JSON.stringify({'product_id':product_id})
            }).then(response=>{
                let [ok,] = response
                if(ok){
                    runInAction(()=>{
                        this._productsListId.push(product_id)
                        this._amt+=1;
                        this._catalogs = undefined
                    })
                }

            }).finally(()=>{
                runInAction(()=>{ this._loading = false})
            })
        }
    }

    /**
     * @async
     * @param product_id
     * @return {Promise<void>}
     * @description убрать товар из списка для сравнения
     * @url `/comparisons/del/'
     */
    async delFromCompare(product_id){
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

    /**
     * @description проверить находится ли товар в списке для сравнения. по id.
     * @param {Number} product_id
     * @return {boolean}
     * @description с начало проверяет наличие id в
     * @description status this._productsListId.
     * @description если не находит, выполняет запрос к серверу.
     * @url `/comparisons/check/${product_id}/
     */
    checkProductToCompare(product_id){
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

    /**
     * @description очищает данные на стороне клиента
     */
    clean(){
        runInAction(()=>{
            this._amt = undefined
            this._catalogs = undefined
            this._loading = false
            this._products = undefined
        })
    }
    
}
let stateCompare = new CompareProductsState()

export default stateCompare;