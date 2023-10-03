import {makeAutoObservable, runInAction, toJS} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";


class ClientState{
    _info = undefined

    constructor() {
        /*
        * хранить информацию о клиенте необходимую для оформления заказов.
        * собрал в себе все методы работы с этим функционалом.
        * */
        makeAutoObservable(this, {}, {autoBind: true});
    }

    get info(){
        //получение информации
        if(!this._info){
            this.getInfo()
        }
        return this._info
    }

    isChangeInfo(oldInfo,newInfo){
        // проверка, что информация была изменена
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

    getInfo(){
        // получение информации с сервера.
        ajaxFetch({
         url:'/client-info/',
         method:'GET',
        }).then(response=>{
         let [ok,error] = response
         if(ok){
             ok.then(res=>{
                 runInAction(()=>{
                 this._info = res
             })
         })
         }
         if(error){
             runInAction(()=>{
                 error.then(()=>{
                     this._info = undefined
                 })
             })
         }
        })

    }
    async clean(){
        // удаление данный на стороне клиента
       await runInAction(()=>{
           this._info = undefined
       })
    }

    async changeInfo(newInfo){
        // изменение данный на стороне сервера.
       if(!this.isChangeInfo(toJS(this._info),newInfo))
        await ajaxFetch({
            url:'/client-info/',
            method:'PUT',
            data: JSON.stringify(newInfo)
        }).then(reponse=>{
            let [ok,error] = reponse
            if(ok){
                this.getInfo()
            }
        })


    }

}
let clientState = new ClientState();
export default clientState;