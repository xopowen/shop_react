import {Link} from "react-router-dom";
import {createPortal} from "react-dom";
import {useRef} from "react";


export default function ProductAddedBasket({producID,haveShow}){
    /*
    портал.
    Окно отображается поверх остальных.
    Уведомление о добавлении товара в карзину.
    * */
    let ref = useRef()
    function haveShowProxy(e){

        let positionRef = ref.current.getBoundingClientRect()

        if(e.clientY > positionRef.top &&
            e.clientY < positionRef.bottom &&
            e.clientX > positionRef.left &&
            e.clientX < positionRef.right){
            return;
        }

        haveShow(false)
    }

    return ( createPortal(
        <section onClick={haveShowProxy} className="over-page over-page_active" id='product-added'>
            <article ref={ref} className="pop-up-card">
                <h2>Товар добавлен в корзину!</h2>
                <div className="pop-up-card__buttols">

                    <button onClick={()=> haveShow(false)} className="blow-button">продолжить покупки</button>


                    <Link to={'basket/'}>
                        <button className="blow-button">перейти в корзину</button>
                    </Link>

                </div>
            </article>
        </section>,
        document.body

    ))
}