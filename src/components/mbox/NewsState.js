import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";


/**
 * @class NewsState
 * @type {makeAutoObservable}
 * @description status-manager хранения карточек новостей.
 * @description в новостях присутствует пагинация.
 */
class NewsState{
    _previous = null
    _elements = undefined
    _next = null
    _loading = false

    constructor() {
        makeAutoObservable(this)
    }

    /**
     *
     * @return {status<undefined|Array<Object>>}
     */
    get elements(){
        if(!this._elements){
            this._getElements()
        }
        return this._elements
    }

    /**
     * @description проверка что больше нет загружаемых элементов.
     * @return {boolean}
     * @getter
     */
    get isNext(){
        return this._next !== null
    }

    /**
     * @description проверка идёт ли загрузка элементов
     * @return {boolean}
     * @getter
     */
    get isLoading(){
        return this._loading
    }
    _getElements(url = '/news/'){
        runInAction(()=>this._loading = true)
        ajaxFetch({
            url:url,
            method:'GET',
        })
            .then(response=>{
                let [ok] = response
                if(ok){
                    ok.then(res=>runInAction(()=>{
                        if(!this._elements){
                            this._elements = res.results
                        }else{
                            let additionRes = res.results.filter(v=>!this._elements.find(el=>el.id === v.id) )
                            this._elements = this._elements.concat(additionRes)
                        }

                        this._next = res.next !== null ?  new URL(res.next).search: null
                        this._previous = res.previous
                    }))
                }
        }).finally(()=>{
            runInAction(()=>this._loading = false)
        })
    }

    /**
     *
     * @param {Number} id
     * @return {status<Object|undefined>}
     * @description получение элемента из списка по id
     * @description если элемента нет возвратит undefined
     * @method
     */
    getElement(id){
        if(this._elements){

            return this._elements.find(v=>v.id === +id)
        }
    }

    /**
     * @method
     * выполняет загрузку следующей страницы в пагинации.
     */
    next(){
        this._getElements('/news/'+this._next)
    }


}
const newsState =  new NewsState()
export default newsState;