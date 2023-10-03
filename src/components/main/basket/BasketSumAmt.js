import ElementCounter from "../../header/ElementCounter";
import {observer} from "mobx-react-lite";
import stateBasket from "../../mbox/BasketState";

const BasketSumAmt = observer(()=>{
    // Отображает количество товаров в корине. Зависит от stateBasket.
    let amt = stateBasket.amt

    return  <ElementCounter value={   amt }  />


})
export default BasketSumAmt;