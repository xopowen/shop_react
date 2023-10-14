
import {observer} from "mobx-react-lite";
import stateBasket from "../../mbox/BasketState";

/**
 * @param {string} name
 * @param {string} mainClass - дополнительный класс
 * @param {string} placeholder
 * @param {Object} element -  от куда нужно брать значение.
 * @type {React.FunctionComponent}
 * @depend stateBasket
 * @see stateBasket
 * @description счётчик для изменения количества товара в заказе.
 * @description min 0.
 * @description max 99.
 */
let CounterBasket = observer(({name,mainClass,placeholder,element})=>{

    function haveMines(e){
        stateBasket.minesAmtToOrder(element)
        e.preventDefault()
    }

    function haveMax(e){
        stateBasket.addAmtToOrder(element)
        e.preventDefault()
    }

    return <div className={`${mainClass} amt`}  >
        <button className="amt__subtract"
                onClick={haveMines}>
            -
        </button>
        <label> <input className="amt__answer"
                       name={name}
                       type = {'number'}
                       min={0}
                       max={99}
                       onChange={e=>{}}
                       placeholder={placeholder}
                       value={ element.amt > 0 && element.amt }
        /></label>
        <button className="amt__add"
                onClick={haveMax}>
            +
        </button>
    </div>
})
export default CounterBasket;