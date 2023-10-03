import React from "react";

export default function Textarea ({name,placeholder,labelClass,ariaInvalid}){
    // поле для ввода больших текстов
    return <label className={labelClass}>
        <textarea name={name}
    placeholder={placeholder}
    title={placeholder}
    aria-invalid = {ariaInvalid}/>
    </label>
}