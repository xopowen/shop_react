import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

class AuthStore {
    isAuth = false;
    isAuthInProgress = false;
    isRefreshLinkValid = true;
    constructor() {
        /*
        *  собрал в себе все методы работы с аунтфикацией.
        * */
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async login(email, password) {
        //авторизация пользователя.
        this.isAuthInProgress = true;
        await ajaxFetch({
            url: '/dj-rest-auth/login/',
            method: 'POST',
            data: JSON.stringify({"email":email, 'password':password})
        }).then(response => {
            let [ok, error,status] = response
            if(ok){
              runInAction(()=> {
                  this.isAuth = true
                  this.isRefreshLinkValid = true
              })
            }
        }).finally(()=>{
            runInAction(()=> {
                this.isAuthInProgress = false;
            })
        })
    }

    async checkAuth() {
        //проверка действительности refresh токена
        if(this.isRefreshLinkValid){
            this.isAuthInProgress = true;
            await ajaxFetch({
                url: '/dj-rest-auth/token/refresh/',
                method: 'POST',
            }).then(response => {
                let [ok, error,status] = response
                if(ok){
                    runInAction(()=> { this.isAuth = true})
                }
                if(status === 401){
                    runInAction(()=>{
                        this.isRefreshLinkValid = false
                    })
                }
            }).finally(()=>{
                runInAction(()=> {
                    this.isAuthInProgress = false;
                })
            })
        }
    }

    async logout() {
        //удаление данный на сервере, что пользователь с данными токенами аундефецирован
        runInAction(()=>{
            this.isAuthInProgress = true;
        })

        await ajaxFetch({
            url: '/dj-rest-auth/logout/',
            method: 'POST',
        }).then(response => {
            let [ok, error] = response
            if(ok){
                runInAction(()=> {
                    this.isAuth = false
                    this.isRefreshLinkValid = false
                })
            }
        }).finally(()=>{
            runInAction(()=> {
                this.isAuthInProgress = false;
            })
        })

    }

    async authAjaxFetch(ajaxFetch){
        //обертка для запросов которые требуют аундифекацию
        await ajaxFetch.then(response=>{
            let [ok,error,status] = response
            if(status === 401){
                this.checkAuth()
            }
        })
        return ajaxFetch
    }
}
let authStore = new AuthStore()
export default authStore;