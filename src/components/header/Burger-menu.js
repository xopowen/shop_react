import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import useIntObs from "../hooks/useIntObs";
import ajaxFetch from "../helpFunction/ajaxFetch";

/**
 *
 * @param props
 * @description данные получают с сервера.
 * @description отображает бургер меню где с лева категории а с права вариантны первого фильтра
 * @return {JSX.Element}
 * @constructor
 * @url '/burger-menu/'

 */
export default function BurgerMenu(props) {
/**
@example
data->{
    "id": 6,
        "name": "ИМПЛАНТЫ",
        "order": 5,
        "choices": [
        {
            "id": 1,
            "name": "Автоматический",
            "showPopup": true,
            "selected": false,
            "filter": 1,
            "catalog": 6
        },
    ]
}
    */
    const [data, setData] = useState([])
    const [activeCatalog, setActiveCatalog] = useState({})
    let [ref,] = useIntObs()

    //activeData - нужна для отображения вариантов первого фильтра
    let activeData = data.find((value)=>value.id === activeCatalog )

    useEffect(() => {
        ajaxFetch({
            url:'/burger-menu/',
            method:'GET'
        }).then(response => {
            let [ok,] = response
            if(ok){
                ok.then(res=>setData(res))
            }
        })
    }, [])


    return <nav onMouseLeave={()=>props?.haveShow && props.haveShow(false)} ref={ref} className="burger-menu burger-menu_active opacity">
        <ul className="burger-menu__catalog">
            {data.length > 0 && data.map((v  ) => {
                return   <li key={v.id} onMouseEnter={()=>setActiveCatalog(v.id)} className="burger-menu__item">
                    <Link to={'catalogs/' + v.name}
                          state={v.name} >
                        {v.name}
                    </Link>
                </li>
            })}
        </ul>
        <ul className="burger-menu__start-filter">
            {activeData?.choices  && activeData.choices.filter(value =>value?.show_menu === true).map(
                (v) => {return   <li key={v.id} className="burger-menu__item">
                        <Link to={`${'catalogs/'}${activeData.name}?${v.property.name}=${v.value}`}
                              state={{ startFilter: [v.property.name,v.value] }}
                        >
                            {v.value}
                        </Link>
                    </li>
                })}
        </ul>
    </nav>
}