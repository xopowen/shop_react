import MapSection from "../components/main/MapSection";
import deliverySvg from '../img/icons/delivery.svg'
import locationSvg from '../img/icons/location.svg'
import Counter from "../components/subComponents/Counter";
export default function Delivery({head}){
    /*
    * props->{head - заголовок}
    Страница статической информации.
    * */
    return <>
        <section className="sections">
            <h1 className="sections__head">{head}</h1>
        </section>
        <address className="send-info">
            <h5>
                <img src={locationSvg}/>
                    <span>Самовывоз со склада по адресу: УР, г. Ижевск, ул. Пушкинская 290.</span>
            </h5>
        </address>
        <MapSection/>
        <section className="sections">
            <address className="send-info">
                <h5>
                    <img src={deliverySvg}/>
                    <span>Доставка ведущими Транспортными компаниями</span>
                </h5>
                <p>
                    Мы осуществляем доставку любыми транспортными компаниями: Деловые Линии, СДЭК, ПЭК, по установленным
                    тарифам
                    на перевозки. При необходимости осуществляем индивидуальную доставку через другие службы доставки.
                </p>
            </address>
        </section>

        <form className="sections form form_with-frame sections_head-left" action="">
            <div className="form__header form__header_while">
                <h2 className="sections__head">Онлайн-калькулятор стоимости доставки</h2>
            </div>
            <div className="form__body form__body_text-aria-left">
                <label className="form__field">
                    <input type="text" name="city-send" placeholder="город отправитель" title="город отправитель"/>
                </label>
                <label className="form__field">
                    <input type="text" name="city-get" placeholder="город получатель" title="город получатель"/>
                </label>
                <div className="form__field">
                    <p>Вес:</p>
                    <Counter name={'weight'} placeholder={'кг'} mainClass={'form__amt'}/>

                </div>
                <div className="form__field">
                    <p>Длина:</p>
                    <Counter name={'long'} placeholder={'см'} mainClass={'form__amt'}/>
                </div>
                <div className="form__field">
                    <p>Ширина:</p>
                    <Counter name={'wide'} placeholder={"см"} mainClass={'form__amt'}  />
                </div>
                <div className="form__field">
                    <p>Высота:</p>
                    <Counter name={'height'} placeholder={"см"} mainClass={'form__amt'}/>

                </div>
                <div className="form__field form__field_radio">
                    <input id="delivery-to-point-issue-orders" type="checkbox" name="type_order" value="visitor"/>
                        <label htmlFor="delivery-to-point-issue-orders">доставка до пункта выдачи заказов </label>
                </div>
                <div className="form__field form__field_radio">
                    <input id="delivery-by-courier-to-door" type="checkbox" name="type_order" value="visitor"/>
                        <label htmlFor="delivery-by-courier-to-door">доставка курьером до двери </label>
                </div>
            </div>
            <div className="form__footer">
                <input type="submit" className="blow-button" title="расчет" value={'расчет'}/>
                    <a href="#" className="form__text-smail">Нажимая на кнопку «отправить», я соглашаюсь с
                        условиями.</a>
            </div>
        </form>

    </>
}