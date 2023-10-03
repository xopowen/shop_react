import {observer} from "mobx-react-lite";
import BasketSum from "../components/main/basket/BasketSum";
import BasketCard from "../components/main/basket/BasketCard";
import stateBasket from "../components/mbox/BasketState";
//img
import check_printer from '../img/icons/check-printer.svg';





let Basket =  observer(({head})=>{
    /*
    * props->{head - заголовок}
    * корзина пользователя зависит от stateBasket.
    * */
    let  cardList = stateBasket.elements

    return <section className="sections sections_head-left">
        <div className="sections__header">
            <h2 className="sections__head">{head}</h2>
        </div>
        <div className="sections__body basket">
            <button className={'button_print'} onClick={()=>stateBasket.deleteAllOrderProduct()}>
                очистить корзину
            </button>
            <button className={'button_print'}>
                <img src={check_printer}/>
                Распечатать
            </button>
            <div className="basket__cards">
                <div className="basket__heard-list">
                    <p>фото</p>
                    <p>Товар</p>
                    <p>Цена</p>
                    <p>Количество</p>
                    <p>Сумма</p>
                    <p></p>
                </div>
                <div className="basket__list">
                    {cardList &&  cardList.map(v=>{
                        return <BasketCard key={v.id}  data={v}/>
                    }) }

                </div>
            </div>

            <BasketSum/>
        </div>
    </section>
})
export default Basket;