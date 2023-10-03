import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {HEADERS} from "../constants";


import useIntObs from "../hooks/useIntObs";
import ajaxFetch from "../helpFunction/ajaxFetch";

export default function BurgerMenu(props) {
    /*
    отображает бургер меню где с лева категории а с права вариантны первого фильтра
    url:'/burger-menu/',

    get from ajax {
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
    * */

    const [data, setData] = useState([])
    const [activeCatalog, setActiveCatalog] = useState({})
    let [ref,isView] = useIntObs()

    //activeData - нужна для отображения вариантов первого фильтра
    let activeData = data.find((value)=>value.id === activeCatalog )

    useEffect(() => {
        ajaxFetch({
            url:'/burger-menu/',
            method:'GET'
        }).then(response => {
            let [ok,error] = response
            if(ok){
                ok.then(res=>setData(res))
            }
        })
    }, [])


    return <nav onMouseLeave={()=>props?.haveShow && props.haveShow(false)} ref={ref} className="burger-menu burger-menu_active opacity">
        <ul className="burger-menu__catalog">
            {data.length > 0 && data.map((v  ) => {
                return   <li key={v.id} onMouseEnter={()=>setActiveCatalog(v.id)} className="burger-menu__item">
                    <Link to={'catalogs/' + v.name+'/'}
                          state={v.name} >
                        {v.name}
                    </Link>
                </li>
            })}
        </ul>
        <ul className="burger-menu__start-filter">
            {activeData?.choices  && activeData.choices.filter(value =>value?.show_menu === true).map(
                (v) => {return   <li key={v.id} className="burger-menu__item">
                        <Link to={`${'catalogs/'}${activeData.name}/?${v.property.name}=${v.value}`}
                              state={{ startFilter: [v.property.name,v.value] }}
                        >
                            {v.value}
                        </Link>
                    </li>
                })}
        </ul>
    </nav>
}