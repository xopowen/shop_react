import {useState} from "react";

/**
 *
 * @param {string} name
 * @param {string|undefined} mainClass
 * @param {string|undefined} placeholder
 * @param {Number|undefined} startValue
 * @return {JSX.Element}
 * @description поле счётчик для изменения количества элементов перед отправкой формы.
 */
export default function Counter({name,
                                mainClass,
                                placeholder,
                                startValue}){

    let [counter,setConter]=useState(startValue || 0 )

    function haveMines(e){
        if(counter<=0){
            e.preventDefault()
            return
        }
        setConter(counter-1)
        e.preventDefault()
    }

    function haveMax(e){
        if(counter >= 99){
            e.preventDefault()
            return
        }
        setConter(counter+1)
        e.preventDefault()
    }

    return <div className={`${mainClass} amt`}  >
        <button className="amt__subtract"
                onClick={haveMines}>
            -
        </button>
        <label> <input className="amt__answer"
                       name={name}
                       type = {'number'}
                       min={0}
                       max={99}
                       onChange={e=>{setConter(+e.target.value)}}
                       placeholder={placeholder}
                       value={ counter > 0 && counter }
        /></label>
        <button className="amt__add"
                onClick={haveMax}>
            +
        </button>
    </div>
}