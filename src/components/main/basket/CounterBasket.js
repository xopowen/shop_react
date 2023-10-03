
import {observer} from "mobx-react-lite";
import stateBasket from "../../mbox/BasketState";




let CounterBasket = observer(({name,mainClass,placeholder,element})=>{
     /*
     props->{name
     ,mainClass - дополнительный класс
     ,placeholder
     ,element - element{Order} от куда нужно брать значение.
     }
     * счётчик для изменения количества товара в заказе. Зависит от stateBasket.
     * min 0.
     * max 99.
     * */


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