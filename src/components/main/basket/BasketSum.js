import {observer} from "mobx-react-lite";
import stateBasket from "../../mbox/BasketState";
import {useNavigate} from "react-router-dom";

let BasketSum = observer((props)=>{
    /*
    * собирает сумму выбранных о товарах в Basket. Зависит от stateBasket.
    * если выбранные товары нужно оформить перенаправлять на '/set-order/'.
    * если выбранный товаров нет кнопка будит не активна
    * */

    let navigate = useNavigate()
    let amt = stateBasket.getSumPriceForAmt()
    function haveRedirectToSetOrder(e){
        if(stateBasket.getSumPriceForAmt() > 0)
        navigate('/set-order/')
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