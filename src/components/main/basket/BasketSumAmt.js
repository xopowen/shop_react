import ElementCounter from "../../header/ElementCounter";
import {observer} from "mobx-react-lite";
import stateBasket from "../../mbox/BasketState";

/**
 *
 * @type {React.FunctionComponent}
 * @description Отображает количество товаров в корине.
 * @depend stateBasket.
 * @see stateBasket
 */
const BasketSumAmt = observer(()=>{
    let amt = stateBasket.amt

    return  <ElementCounter value={   amt }  />


})
export default BasketSumAmt;