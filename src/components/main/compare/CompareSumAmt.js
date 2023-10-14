import {observer} from "mobx-react-lite";

import ElementCounter from "../../header/ElementCounter";
import stateCompare from "../../mbox/CompareProducts";

/**
 *
 * @type {React.FunctionComponentElement}
 * @description отображение количество товаров для сравнения
 * @depend  stateCompare
 * @see stateCompare
 */
let CompareSumAmt = observer(()=>{
    let amt = stateCompare.amt
    if(amt && amt > 0)
    return   <ElementCounter value={ amt }  />
})

export default CompareSumAmt;