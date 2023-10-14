import {getCookie} from "./getCookie";


/**
 * @description получаем токен
 * @return {string}
 */
export default function getCsrftoken() {
    return  getCookie('csrftoken')

}
