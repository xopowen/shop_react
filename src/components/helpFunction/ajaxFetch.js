import {HEADERS} from "../constants";
import getCsrftoken from "./getCsrftoken";
import authStore from "../mbox/AuthStore";

export default async function ajaxFetch({url,method,data=undefined,headers={}}){
    /*
    * возвращает промис который, приводит к промисам [ок: Promise  ->  если ответ сервера был положительным,
    *                                                error: Promise->  промесс с ошибками
    *                                                status: int -> код ответа].
    * одновременно может быть только 1 из них.
    * в случаи ошибки 401 - запрос не авторизирован.
    * идёт проверка действительности refresh токен и повторная отправка запоса
    * */
    let option = {
        method:method,
        headers: Object.assign(HEADERS.ajax,headers)

    }

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
                })
            }
        }else{
            if(result.body){
                error = result.text().then(res=>{
                    if(res){
                        return JSON.parse(res)
                    }
                })
            }
        }
    })
    .catch(e=>{
        console.log(Object.assign(e,{url:url}))
        })
    return [res,error,status]
}

