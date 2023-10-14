import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import authStore from "../components/mbox/AuthStore";
import stateBasket from "../components/mbox/BasketState";
import clientState from "../components/mbox/ClientState";
import stateCompare from "../components/mbox/CompareProducts";

/**
 *
 * @returns {JSX.Element}
 * @description выход их профиля.
 * @description зависит от authStore.
 * @description вызывает очистку данных stateBasket, clientState,stateCompare
 * @see stateBasket
 * @see clientState
 * @see stateCompare
 * @description перенаправляет на "/" используя useNavigate
 */
export default function Logout(){
    let navigate  = useNavigate();
    useEffect(()=>{
        authStore.logout()
            .then(()=>{stateBasket.cleanInfo()
                        stateCompare.clean()
                       return clientState.clean()})
            .then(()=> navigate('/',{replace:true}))
    })
    return <></>


}