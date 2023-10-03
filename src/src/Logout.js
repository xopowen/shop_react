import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import authStore from "../components/mbox/AuthStore";
import stateBasket from "../components/mbox/BasketState";
import clientState from "../components/mbox/ClientState";

export default function Logout(props){
    /*
    * выход их профиля.
    * зависит от authStore.
    * */
    let navigate = useNavigate()
    useEffect(()=>{

        authStore.logout()
            .then(()=>{stateBasket.cleanInfo()
                       return  clientState.clean()})
            .then(()=> navigate('/',{replace:true}))
    })

    return <></>


}