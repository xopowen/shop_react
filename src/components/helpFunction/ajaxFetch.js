import {HEADERS} from "../constants";
import getCsrftoken from "./getCsrftoken";
import authStore from "../mbox/AuthStore";

/**
 *
 * @param {string} url
 * @param {string} method
 * @param {Object} data
 * @param {Object} headers
 * @default HEADERS.ajax if method in [post,put,delete]
 * @see HEADERS.ajax
 * @return {Promise<*[]>}
 * @example
 * [ок: Promise  ->  если ответ сервера был положительным,
 *  error: Promise->  промесс с ошибками,
 *  status: int -> код ответа]
 * @description возвращает промис который,c промисам.
 * @description одновременно может быть только 1 из них.
 * @description в случаи ошибки 401 - запрос не авторизирован.
 * @description идёт проверка действительности refresh токен и повторная отправка запоса
 */
export default async function ajaxFetch({url,
                                            method,
                                            data=undefined,
                                            headers={}}){

    let option = {
        method:method,
        headers: Object.assign(HEADERS.ajax,headers)

    }

    /**
     * @param {string} method
     * @return {boolean}
     */
    function isNotSafeRequest(method){
        return [ 'post','put','delete'].includes(method.toLowerCase())

    }

    if( isNotSafeRequest(method) ){
        option.headers = Object.assign(option.headers,{'X-CSRFToken': getCsrftoken()})
    }
    if(data){
        option.body = data
    }
    let res;
    let error;
    let status;
    await fetch(url,option)
        .then(result=>{
            status = result.status
            if(status === 401 && isNotSafeRequest(method) ){
               if( authStore.isRefreshLinkValid){
                   authStore.checkAuth().then(()=>{
                       if( authStore.isRefreshLinkValid){
                         return ajaxFetch({url,method,data,headers})
                       }
                   })
               }
            }

        if(result.ok){
            if(result.body){
                res =  result.text().then(res=>{
                    if(res){
                       return JSON.parse(res)
                    }
                }).catch(e=>{
                    console.log({url:url})
                })
            }
        }else{
            if(result.body){
                error = result.text().then(res =>{

                    if(res){
                        try {
                            return JSON.parse(res)
                        }catch (e){
                             return   Promise.reject( 'error request')
                        }

                    }
                }).catch(e=>{
                    console.log({url:url})
                })
            }
        }
    })
    .catch(e=>{
        console.log({url:url})
        // console.log(Object.assign(e,))
        })
    return [res,error,status]
}

