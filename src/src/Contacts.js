import Network from "../components/subComponents/Network";
import FormOrderCallback from "../components/formComponents/forms/FormOrderCallback";
import MapSection from "../components/main/MapSection";


export default function Contacts({head}){
    /*
    props->{head - заголовок}
    Страница статической информации.
    */

return <>
    <section className="sections">
        <h1 className="sections__head">
            {head}
        </h1>
        <div className="sections__body tablets">
            <address className="tablets__item">
                Адрес: 426011 г. Ижевск,
                ул. Пушкинская, 290
            </address>
            <address className="tablets__item">
                E-mail: 5078096@mail.ru
            </address>
            <address className="tablets__item">
                +7 982 993 90 05
            </address>
            <address className="tablets__item tablets__item_blue">
                Время работы: пн- пт с 10:00 - 19:00
            </address>
            <address className="tablets__item">
                Социальные сети
                <Network/>
            </address>
        </div>
    </section>
    <MapSection/>
    <FormOrderCallback/>

</>
}