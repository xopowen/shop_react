import loupe from "../../img/icons/search.svg";
import React, {useEffect, useState, useTransition} from "react";

import ajaxFetch from "../helpFunction/ajaxFetch";
import {Link} from "react-router-dom";
import Spinner from "../Spinner";


export default function Search() {
    /* Поиск по названиям категорий и товаров.
    * использует useTransition для избегания блокировки ввода в строку поиска
    * */
    const [isPending, startTransition] = useTransition()
    let [choice, setChoice] = useState()
    let [countPromis,setCountPromis] = useState(0)
    let [inputText,setTextInput] = useState('')
    let [inputFocus, setInputFocus] = useState(false)

    function haveFocus(e){
        setInputFocus(true)
    }
    function haveBlur(e){
        setInputFocus(false)
    }
    function haveSearch(e) {

    }
    function haveGetFilterChoice(e) {
        setTextInput(e.target.value)
    }

    useEffect(()=>{
        if (inputText.length > 0) {
            setCountPromis((a) => a + 1)
            let call = (res) => {
                startTransition(() => setChoice(res))
                setCountPromis((a) => a - 1)
            }
            let resp = ajaxFetch({
                url: `/search/${inputText}/`,
                method: 'GET',
            })
            resp.then(prop => {
                let [ok, error] = prop
                ok.then(res => call(res))
            })

        } else {
            setChoice({})
        }
    },[inputText])

    return <form   className="header__search" onSubmit={haveSearch} method="post">
        <button className={'button-not-background'} type="submit">
            <img src={loupe} alt="Search"/>
        </button>
        <input name="search" onFocus={haveFocus} onBlur={haveBlur}  onInput={haveGetFilterChoice} value={inputText} placeholder="Поиск медицинского оборудования" type="search"/>
        <ul className={''}>
            { countPromis>0 && <li className={'not-hover'}>
                <Spinner addClass={''}/>
            </li>}
            { inputFocus && <>
                {choice?.products && choice.products.map(v => {
                    return <li key={v.id}>
                        <Link to={`catalog/${v.catalog.name}/${v.name}`}>
                            {v.name}
                        </Link>
                    </li>
                })}
                {choice?.categories && choice.categories.map(v => {
                    return <li key={v.id} value={v.name}>
                        <Link to={`catalog/${v.name}/`}>
                            {v.name}
                        </Link>
                    </li>
                })}
            </> }
        </ul>
    </form>

}