import React from "react";

/**
 *
 * @param {string} name
 * @param {string} placeholder
 * @param {string} labelClass - addition of class set in label
 * @param {boolean} ariaInvalid
 * @description поле для ввода больших текстов
 * @return {JSX.Element}
 * @constructor
 */
export default function Textarea ({name,placeholder,labelClass,ariaInvalid}){

    return <label className={labelClass}>
        <textarea name={name}
    placeholder={placeholder}
    title={placeholder}
    aria-invalid = {ariaInvalid}/>
    </label>
}