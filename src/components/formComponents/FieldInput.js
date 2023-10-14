import React from "react";
import ErrorFORM from "../helpFunction/ErrorFORM";

/**
 *
 * @param {string} name
 * @param {string} placeholder
 * @param {string} type
 * @param {boolean} ariaInvalid
 * @param {boolean} readOnly
 * @param {any} defaultValue
 * @param { Object } errors - отобразит ошибки по ключу {name}
 * @description
 * @return {JSX.Element}
 * @description поле ввода для формы.
 */
export default function FieldInput ({name,placeholder,type,ariaInvalid,readOnly,defaultValue,errors}){

    return <label className="form__field">

        <input type={type}
               aria-invalid={ariaInvalid}
               name={name}
               readOnly={readOnly}
               placeholder={placeholder}
               title={placeholder}
               defaultValue={defaultValue}
        />
        {errors?.[name]  && <ErrorFORM errors_list={errors[name]} />}
    </label>
}