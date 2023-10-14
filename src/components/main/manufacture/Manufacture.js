import React from "react";

import {useLocation} from "react-router-dom";

import stateManufacture from "../../mbox/ManufactureState";
import {observer} from "mobx-react-lite";

import CardInfo from "../../subComponents/CardInfo";
import ManufactureCard from "./ManufactureCard";

/**
 *
 * @type {React.FunctionComponent<{readonly head?: string}>}
 * @depend stateManufacture
 * @see stateManufacture
 * @description в зависимости от расположения отображает список производителей в 2 вариатнах
 * @description ManufactureCard- если элемент на pathname: '/manufactures/'
 * @description CardInfo - иначе

 */
let Manufacture = observer(({head}) => {

    const locations = useLocation()
    const data = stateManufacture.elements

    let isPage = locations.pathname === '/manufactures';

    let listElem = data && data.map((v, i) => {
        let Elem = isPage ? CardInfo : ManufactureCard;
        return <Elem key={i} data={v}/>
    })

    return <section className={`sections ${isPage ? '' : 'sections_full' }`}>
        <div className="sections__header">
            <h3 className="sections__head">{head}</h3>
        </div>
        <div className={`sections__body ${isPage ? 'news' :  'manufacture' }`}>
            {listElem}
        </div>
    </section>

})

export default Manufacture;