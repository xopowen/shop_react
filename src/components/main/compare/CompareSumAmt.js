import {observer} from "mobx-react-lite";

import ElementCounter from "../../header/ElementCounter";
import stateCompare from "../../mbox/CompareProducts";

let CompareSumAmt = observer(()=>{
    //отображение количество товаров для сравнения зависит от stateCompare
    let amt = stateCompare.amt
    if(amt && amt > 0)
    return   <ElementCounter value={ amt }  />


})

export default CompareSumAmt;