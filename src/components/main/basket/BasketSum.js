import {observer} from "mobx-react-lite";
import stateBasket from "../../mbox/BasketState";
import {useNavigate} from "react-router-dom";

/**
 *
 * @type {React.FunctionComponent}
 * @depend stateBasket
 * @see stateBasket
 * @description собирает сумму выбранных о товарах в Basket.
 * @description если выбранные товары нужно оформить перенаправлять на '/set-order/'.
 * @description если выбранный товаров нет кнопка будит не активна
 */
let BasketSum = observer(()=>{
    let navigate = useNavigate()
    let amt = stateBasket.getSumPriceForAmt()
    function haveRedirectToSetOrder(e){
        if(stateBasket.getSumPriceForAmt() > 0)
        navigate('/set-order/')
        e.preventDefault()
    }




    return  <article className="basket__check check">
        <div className="check__body">
            <p className="check__text">Итоговая стоимость:</p>
            <p className="check__sum-price"> {stateBasket.getSumPriceForAmt()||0} р</p>
        </div>
        <div className="check__footer">
            <button onClick={haveRedirectToSetOrder} className={`${amt >0 && 'blow-button'} check__button`}>
                оформить заказ
            </button>
            <p className="check__subtext">
                Нажимая на кнопку «Оформить заказ»,
                я соглашаюсь с условиями.
            </p>
        </div>
    </article>
})
export default BasketSum;