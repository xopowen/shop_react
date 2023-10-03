import React from "react";
import {Link} from "react-router-dom";

export default function LinkTerms (){
    // ссылка на данный об условиях
    return <Link to="#" className="form__text-smail">
        {" Нажимая на кнопку «отправить», я соглашаюсь с условиями."}
    </Link>
}
