import {useEffect} from "react";
import {useRef} from "react";

import TelNumberMask from "../helpFunction/TelNumberMask";
import phone from "../../img/icons/phone.svg";


/**
 *
 * @param {string} name
 * @param {Boolean} ariaInvalid
 * @param {string | undefined} defaultValue
 * @param {Boolean} required
 * @description поле ввода номера телефона с маской.
 * @see TelNumberMask
 * @return {JSX.Element}
 * @constructor
 */
export default function PhoneInput({name, ariaInvalid, defaultValue, required}) {
    let ref = useRef()

    useEffect(() => {
        let maskListener = new TelNumberMask(ref.current)
        return () => {
            maskListener.defEvents()
        }
    }, [])
    return <label className="form__field form__field_tel">
        <img src={phone} alt={name}/>
        <input ref={ref}
               required={required}
               aria-invalid={ariaInvalid}
               type="tel"
               name={name}
               defaultValue={defaultValue || "+ 7 (___)-___-__-__"}
               title="ваш номер телефона"/>
    </label>
}
