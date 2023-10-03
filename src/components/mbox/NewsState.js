import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";


class NewsState{
    _previous = null
    _elements = undefined
    _next = null
    _loading = false

    constructor() {
        makeAutoObservable(this)
    }

    get elements(){
        if(!this._elements){
            this._getElements()
            return this._elements
        }
        return this._elements
    }
    get isNext(){
        return this._next !== null
    }
    get isLoading(){
        return this._loading
    }
    _getElements(url = '/news/'){
        runInAction(()=>this._loading = true)
        ajaxFetch({
            url:url,
            method:'GET',
        }).then(response=>{
            runInAction(()=>this._loading = false)
            let [ok,error,status] = response
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
        })
    }

    getElement(id){
        if(this._elements){

            return this._elements.find(v=>v.id === +id)
        }
    }

    next(){

        this._getElements('/news/'+this._next)
    }


}
const newsState =  new NewsState()
export default newsState;