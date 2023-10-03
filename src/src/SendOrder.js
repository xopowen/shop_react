import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import clientState from "../components/mbox/ClientState";
import authStore from "../components/mbox/AuthStore";

import {observer} from "mobx-react-lite";

import fromFormDataToDict from "../components/helpFunction/fromFormDataToDict";
import FormBody from "../components/formComponents/forms/formsUserInfo/FormBody";
import stateBasket from "../components/mbox/BasketState";
import LinkTerms from "../components/formComponents/LinkTerms";



let SendOrder = observer(({head})=>{
    /*
    props->{head - заголовок}
    страница оформления заказа выданных в корзине заказов.
    Также отображается форма для изменения данных о пользователе необходимых для оформления заказа
    зависит от clientState,authStore,stateBasket
    */
    let info = clientState.info
    let ref = useRef()
    let navigate = useNavigate()
    let [error,setError] = useState()
    useEffect(()=>{
        if(!authStore.isAuth)
            clientState.clean()

    },[authStore.isAuth])

    function haveChangeInfo( e ){
        e.preventDefault()
        let data = fromFormDataToDict(ref.current)
        clientState.changeInfo(data).then(()=>{
            return stateBasket.formalizationSelectOrder()
        }).then(()=>{
            navigate('/order-successfully-completed/')
        },
            (res)=>{
                setError(res)
            }
        )

    }

    return <section className=" sections">

        <div className="sections__body">
            {info && <form ref={ref}
                            onSubmit={haveChangeInfo}
                           className="form" action="">
                <div className="form__header">
                    <h2 className=" sections__head">{head}</h2>
                </div>
                <FormBody />
                <div className="form__footer">
                    <input type="submit" className="blow-button" title=""/>
                    {error && <p className={'error'}>{error}</p> }
                    <LinkTerms/>
                </div>
            </form>}
        </div>

    </section>

})
export default SendOrder;