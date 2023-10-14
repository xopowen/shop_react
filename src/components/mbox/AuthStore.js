import {makeAutoObservable, runInAction} from "mobx";
import ajaxFetch from "../helpFunction/ajaxFetch";

/**
 * @class AuthStore
 * @type {makeAutoObservable}
 * @description  собрал в себе все методы работы с аунтфикацией пользователя.
 */
class AuthStore {
    isAuth = false;
    isAuthInProgress = false;
    isRefreshLinkValid = true;
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    /**
     * @async
     * @method
     * @see ajaxFetch
     * @url '/dj-rest-auth/login/'
     * @param {string} email
     * @param {number|string} password
     * @return {Promise<response>}
     * @description использует ajaxFetch
     * @description авторизация пользователя по почте и паролю.
     * @description изменяет status<isAuth> на true если данные верны
     */
    async login(email, password) {
        this.isAuthInProgress = true
        let res;
        await ajaxFetch({
            url: '/dj-rest-auth/login/',
            method: 'POST',
            data: JSON.stringify({"email":email, 'password':password})
        }).then(response => {
            let [ok,] = response
            if(ok){
              runInAction(()=> {
                  this.isAuth = true
                  this.isRefreshLinkValid = true
              })
            }
            res = response
        }).finally(()=>{
            runInAction(()=> {
                this.isAuthInProgress = false;
            })
        })
        return res
    }

    /**
     * @async
     * @see ajaxFetch
     * @url '/dj-rest-auth/token/refresh/',
     * @description проверка действительности refresh токена
     * @return {Promise<void>}
     */
    async checkAuth() {
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

    /**
     * @async
     * @url '/dj-rest-auth/logout/'
     * @description удаление данный на сервере, что пользователь с данными токенами аундефецирован
     * @return {Promise<void>}
     */
    async logout() {
        runInAction(()=>{
            this.isAuthInProgress = true;
        })
        await ajaxFetch({
            url: '/dj-rest-auth/logout/',
            method: 'POST',
        }).then(response => {
            let [ok,] = response
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
    /**
     * @async
     * @url '/dj-rest-auth/logout/'
     * @description обертка для запросов которые требуют аундифекацию
     * @return {Promise<void>}
     */
    async authAjaxFetch(ajaxFetch){
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