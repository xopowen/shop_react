import {createPortal} from "react-dom";

export default function OverPageContainer(props ){
    /*
    Портал.
    Отображает children элемент поверх других с задернением остальных.

    * */
    return createPortal(
        <section className={`over-page ${props.isShow && 'over-page_active'}`} >
            {props.children}
        </section>,
        document.querySelector('main')
    )
}