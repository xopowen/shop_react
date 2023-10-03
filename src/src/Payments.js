import pdf_file from "../img/icons/pdf-file.svg"
export default function Payments({head}){
    /*
    props->{head - заголовок}
    Страница статической информации.
    */
    return<>

        <section className="sections">
            <h1 className="sections__head">
                {head}
            </h1>
            <div className="sections__body tablets">
                <address className="tablets__item tablets__item_min tablets__item_blue">
                    Мы осуществляем отгрузку медицинского оборудования
                    и комплектующих по всей России.
                </address>
                <address className="tablets__item tablets__item_min">
                    Доставка и самовывоз осуществляются при условии 100% предоплаты счета.
                </address>
                <address className="tablets__item tablets__item_min">
                    Оплата подтверждается при поступлении денежных средств на р/с Поставщика.
                </address>
                <address className="tablets__item tablets__item_blue tablets__item_min">
                    Наша компания работает как с физическими,  так и с юридическими лицами по безналичному расчету.
                </address>
                <address className="tablets__item tablets__item_blue tablets__item_min">
                    Для бюджетных организаций предусмотрена отсрочка платежа до 30 дней
                </address>

            </div>
        </section>
        <section className="sections">
            <ul className="sections__body agreement-list">
                <li className="agreement-list__item">
                    <img src={pdf_file} alt="file"/>
                    <a href=""download="true"> Договор отсрочки платежа</a>
                </li>
                <li className="agreement-list__item">
                    <img src={pdf_file} alt="file"/>
                    <a href="" download="true">Договор оплаты</a>
                </li>
                <li className="agreement-list__item">
                    <img src={pdf_file} alt="file"/>
                    <a href="" download="true"> Приложение к договору</a>
                </li>
            </ul>
        </section>
    </>
}