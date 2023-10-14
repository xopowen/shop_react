import Network from "../components/subComponents/Network";

import phone from '../img/icons/phone.svg'

import React from "react";
import FormOrderCallback from "../components/formComponents/forms/FormOrderCallback";


/**
 *
 * @param {String} head
 * @return {JSX.Element}
 * @constructor
 * @component
 * @description  Страница статической информации.
 */
export default function Requisites ({head}){

    return <>
        <section className="sections">
            <h1 className="sections__head">
                {head}
            </h1>
            <div className="sections__body tablets">
                <address className="tablets__item tablets__item_blue">
                    ИП
                    Богатырёв
                    Константин
                    Сергеевич
                </address>
                <address className="tablets__item">
                    Адрес регистрации: 426000, Удмуртская Респ, г. Ижевск
                </address>
                <address className="tablets__item tablets__item_blue">
                    ИНН 183112400380
                </address>
                <address className="tablets__item">
                    <img src={phone} alt={''}/>
                    +7 982 993 90 05
                </address>
                <address className="tablets__item">
                    ОГРНИП 311183116700040
                </address>
                <address className="tablets__item">
                    Почтовый адрес: 426011
                    г. Ижевск,
                    ул. Пушкинская, 290
                </address>
                <address className="tablets__item tablets__item_blue">
                    Время работы: пн- пт с 10:00 - 19:00
                </address>
                <address className="tablets__item">
                    Социальные сети
                    <Network/>
                </address>
                <address className="tablets__item">
                    <img src={phone} alt={''} />
                    +7 982 993 90 05
                </address>
                <address className="tablets__item">
                    E-mail: 5078096@mail.ru
                </address>
                <address className="tablets__item tablets__item_blue">
                    Осуществляем поставки по всей территории РФ и ближнего зарубежья.
                </address>
            </div>
        </section>
        <FormOrderCallback/>
    </>
}