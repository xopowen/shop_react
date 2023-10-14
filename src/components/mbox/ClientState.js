import {makeAutoObservable, runInAction, toJS} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";


/**
 * @class ClientState
 * @type {makeAutoObservable}
 * @description
 *         * хранить информацию о клиенте необходимую для оформления заказов.
 *         * собрал в себе все методы работы.
 */
class ClientState{
    _info = undefined
    _loading = false
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    /**
     * @getter
     * @description получение информации о пользователе
     * @return {status<undefined | Object>}
     */
    get info(){
        if(!this._info){
            this.getInfo()
        }
        return this._info
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
     * @method
     * @param oldInfo
     * @param newInfo
     * @return {boolean}
     * @description проверка, что информация была изменена
     */
    isChangeInfo(oldInfo,newInfo){
        for (const newInfoElement of   Object.keys(newInfo)) {

            if(oldInfo[newInfoElement] === newInfo[newInfoElement]){
                continue
            }
            if(oldInfo.user[newInfoElement] === newInfo[newInfoElement]){
                continue
            }
            return false
        }

      return  true
    }

    /**
     * @async
     * @description получение информации с сервера.
     * @url '/client-info/'
     * @return {Promise<void>}
     */
    async getInfo(){
        runInAction(()=>this._loading = true)
        await ajaxFetch({
         url:'/client-info/',
         method:'GET',
        }).then(response=>{
                 let [ok,error] = response
                 if(ok){
                     ok.then(res=>{
                         runInAction(()=>{
                         this._info = res
                     })
                 })}
                 if(error){
                     runInAction(()=>{
                         error.then(()=>{
                             this._info = undefined
                         })
                     })
                 }
        }).finally(()=> runInAction(()=>this._loading = false))

    }

    /**
     * @description  удаление данный на стороне клиента
     * @return {Promise<void>}
     */
    async clean(){
       await runInAction(()=>{
           this._info = undefined
       })
    }
    /**
     * @async
     * @param newInfo
     * @description изменение данный на стороне сервера.
     * @description запрос на изменение отправится только если данные действительно изменились
     * @return {Promise<void>}
     */
    async changeInfo(newInfo){
       if(!this.isChangeInfo(toJS(this._info),newInfo)){
           runInAction(()=>this._loading = true)
        await ajaxFetch({
            url:'/client-info/',
            method:'PUT',
            data: JSON.stringify(newInfo)
        }).then(reponse=>{
                let [ok] = reponse
                if(ok){
                    this.getInfo()
                }
            })
            .finally(()=>runInAction(()=>this._loading = false)
        )

       }

    }

}
let clientState = new ClientState();
export default clientState;