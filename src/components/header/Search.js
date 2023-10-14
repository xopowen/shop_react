import loupe from "../../img/icons/search.svg";
import React, {useEffect, useState, useTransition} from "react";

import ajaxFetch from "../helpFunction/ajaxFetch";
import {Link} from "react-router-dom";
import Spinner from "../Spinner";


/**
 *
 * @return {JSX.Element}
 * @component
 * @description Поиск по названиям категорий и товаров.
 *  использует useTransition для избегания блокировки ввода в строку поиска
 */
export default function Search() {
    const [isPending, startTransition] = useTransition()
    /**
     * @param choice
     * @example
     * {"products":
     *      [
     *        {"name":"PAD","id":3,"catalog":3},
     *      ]
     * "categories":
     *      [
     *      {"name":"Дефибреляторы","id":3}
     *      ]
     *  }
     */
    let [choice, setChoice] = useState()
    let [countPromis,setCountPromis] = useState(0)
    let [inputText,setTextInput] = useState('')
    let [inputFocus, setInputFocus] = useState(false)

    function haveFocus(e){
        setInputFocus(true)
        e.preventDefault()
    }
    function haveBlur(e){
        setInputFocus(false)
        e.preventDefault()
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
                let [ok, ] = prop
                ok.then(res => call(res))
            })

        } else {
            setChoice(undefined)
        }
    },[inputText])

    return <form   className="header__search" onSubmit={haveSearch} method="post">
        <button className={'button-not-background'} type="submit">
            <img src={loupe} alt="Search"/>
        </button>
        <input name="search" onFocus={haveFocus} onBlur={haveBlur}  onInput={haveGetFilterChoice} value={inputText} placeholder="Поиск медицинского оборудования" type="search"/>
        <ul>
            { countPromis > 0 && <li className={'not-hover'}>
                <Spinner/>
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