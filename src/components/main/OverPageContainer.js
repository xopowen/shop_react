import {createPortal} from "react-dom";

/**
 *
 * @param props
 * @return {React.ReactPortal}
 * @constructor
 * @description  Отображает children элемент поверх других с затемнением остальных.
 */
export default function OverPageContainer(props ){

    return createPortal(
        <section className={`over-page ${props.isShow && 'over-page_active'}`} >
            {props.children}
        </section>,
        document.querySelector('main')
    )
}