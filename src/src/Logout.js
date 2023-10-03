import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import authStore from "../components/mbox/AuthStore";
import stateBasket from "../components/mbox/BasketState";

export default function Logout(props){
    /*
    * выход их профиля.
    * зависит от authStore.
    * */
    let navigate = useNavigate()
    useEffect(()=>{

        authStore.logout().then(()=>stateBasket.cleanInfo())

        navigate('/')
    })

    return <></>


}