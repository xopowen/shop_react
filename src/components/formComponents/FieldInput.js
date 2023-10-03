import React from "react";
import ErrorFORM from "../helpFunction/ErrorFORM";

export default function FieldInput ({name,placeholder,type,ariaInvalid,readOnly,defaultValue,errors}){
    /*поле ввода для формы.
    * props -> {name,
    * placeholder: str устанавливает также и title,
    * type,
    * ariaInvalid,
    * readOnly,
    * defaultValue,
    * errors:{} -  отобразит ошибки по ключу {name}
    * }
    *
    * */
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