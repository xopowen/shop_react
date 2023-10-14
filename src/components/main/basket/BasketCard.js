import {observer} from "mobx-react-lite";

import PictureMixin from "../../helpFunction/PictureMixin";
import CounterBasket from "./CounterBasket";

import stateBasket from "../../mbox/BasketState";

import basketImg from '../../../img/icons/basket.svg'

/**
 *
 * @type {React.FunctionComponent<{readonly data?: Object}>}
 * @example
 *     data-> {
 *     "id":22,
 *     "product":
 *         { "id":5,
 *         "name":"ДЕФИБРИЛЛЯТОР-МОНИТОР  ДКИ-Н-11",
 *         "catalog":
 *             {"id":3,
 *             "name":"Дефибреляторы",
 *             "img":"/media/catalog/%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80_%D0%B4%D0%B8%D1%84%D1%8B_1_xb6V280.png",
 *             "order":1},
 *         "act":0,
 *         "price":10000.0,
 *         "currency":"₽",
 *         "feedback":[{"score":0}],
 *          "img":[
 *                 {"link":"/media/img/2023/09/18/product_%D0%B4%D0%B8%D1%84%D1%8B.png"}]
 *          ,"avg_score":0},
 *          "amt":1,
 *          "issued":false}
 * @depend stateBasket
 * @see stateBasket
 * @description  карточка товара в Basket.
 * @description  При выборе попадает в список выбранный в stateBasket который
 * @description в последствии можно отравить на сервер для оформления заказа.
 * @return {React.FunctionComponentElement}

 */
let BasketCard = observer(({data})=>{

    let product = data.product

    function haveCheckBox(e){
        if(e.target.checked){
            stateBasket.addToSelected(data)
        }else{
            stateBasket.delFromSelected(data)
        }
    }

    return <article className="basket__card basket-card">
        <div className="basket-card__col-1">
            <input onChange={haveCheckBox}
                   checked={stateBasket.isSelected(data)}
                   type="checkbox"
                   id={`basket-card-${product.id}`}
            />
            <label htmlFor={`basket-card-${product.id}`}>
            </label>
            <PictureMixin img={product.img.length > 0 ? product.img[0].link:0}/>
        </div>

        <h5 className="basket-card__title">
            {product?.name}
        </h5>
        <p className="basket-card__price">
            <span>{product.price}</span>
            <span className="basket-card__currency">{product.currency}</span>
        </p>
        <CounterBasket placeholder={1}
                 name={''}
                 mainClass={'basket-card__amt'}
                 element={data}/>
        <p className="basket-card__price">
            <span data-amt="sum">
                {product.price * data.amt}
            </span>
            <span data-amt="currency" className="basket-card__currency">
                {product.currency}
            </span>
        </p>
        <button onClick={()=>stateBasket.delToBasket(data.product.id)} className="basket-card__del">
            <img src={basketImg} alt={''}/>
        </button>
    </article>
})

export default BasketCard;