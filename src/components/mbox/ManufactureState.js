import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

/**
 * @class ManufactureState
 * @type {makeAutoObservable}
 * @description status-manager хранения карточек производителей.
 */
class ManufactureState{

    _elements = undefined

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @return {status<undefined|Array<Object>>}
     * @getter
     */
    get elements(){
        if(!this._elements){
            this._getElements()
            return this._elements
        }
        return this._elements
    }

    /**
     *
     * @private
     * @url '/manufactures/'
     * @description получение данных о производителях
     */
    _getElements(){
        ajaxFetch({
            url:'/manufactures/',
            method:"GET"
        }).then(response=>{
            let [ok,] = response
            if(ok){
                ok.then(res=>runInAction(()=>this._elements = res))
            }
        })
    }

}
const stateManufacture  =  new ManufactureState()
export default stateManufacture;