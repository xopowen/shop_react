import {getCookie} from "./getCookie";


export default function getCsrftoken() {
    //  получаем токен
    return  getCookie('csrftoken')

}
