import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import clientState from "../components/mbox/ClientState";

import {observer} from "mobx-react-lite";

import fromFormDataToDict from "../components/helpFunction/fromFormDataToDict";
import FormBody from "../components/formComponents/forms/formsUserInfo/FormBody";
import stateBasket from "../components/mbox/BasketState";
import LinkTerms from "../components/formComponents/LinkTerms";


/**
 *
 * @type {React.FunctionComponent<{readonly head?: String}>}
 * @param {String} head
 * @return JSX.Element
 * @description страница оформления заказа выданных в корзине заказов.
 * @description Также отображается форма для изменения данных о пользователе 
 * необходимых для оформления заказа.
 * @depend clientState,stateBasket
 * @see clientState
 * @see stateBasket
 * 
 */
let SendOrder = observer(({head})=>{
 
    let info = clientState.info
    let ref = useRef()
    let navigate = useNavigate()
    let [error,setError] = useState()

    function haveChangeInfo(e){
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
                           className="form">
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