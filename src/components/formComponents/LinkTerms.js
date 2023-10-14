import React from "react";
import {Link} from "react-router-dom";

/**
 * @description ссылка на данный об условиях
 * @return {JSX.Element}
 * @constructor
 */
export default function LinkTerms (){

    return <Link to="#" className="form__text-smail">
        {" Нажимая на кнопку «отправить», я соглашаюсь с условиями."}
    </Link>
}
