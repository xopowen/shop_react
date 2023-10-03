import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

class ManufactureState{

    _elements = undefined

    constructor() {
        /*
        * хранить данные о списке производителей.
        * */
        makeAutoObservable(this)
    }
    get elements(){
        if(!this._elements){
            this._getElements()
            return this._elements
        }
        return this._elements
    }

    _getElements(){
        ajaxFetch({
            url:'/manufactures/',
            method:"GET"
        }).then(response=>{
            let [ok,error] = response
            if(ok){
                ok.then(res=>runInAction(()=>this._elements = res))
            }
        })
    }

}
const stateManufacture  =  new ManufactureState()
export default stateManufacture;