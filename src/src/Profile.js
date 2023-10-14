import FormChangeInfoUser from "../components/formComponents/forms/FormChangeInfoUser";
import {Link} from "react-router-dom";

import clientState from "../components/mbox/ClientState";

import {observer} from "mobx-react-lite";
import fromFormDataToDict from "../components/helpFunction/fromFormDataToDict";
//img
import shopping_bag from '../img/icons/shopping-bag.svg';
import reward from '../img/icons/reward.svg';
import feedback from '../img/icons/feedback.svg';
import service from '../img/icons/service.svg';
import Spinner from "../components/Spinner";

/**
 *
 * @type {React.FunctionComponent<{readonly head?: String}>}
 * @param {string} head заголовок
 * @component
 * @description отображает форму с данными пользователя.
 * @depend clientState.
 * @see clientState
 * @return {JSX.Element}
 */
let Profile = observer(({head})=>{

    let info = clientState.info


    /**
     * @param {HTMLFormElement} form
     * @description формирует данные из формы и взывает clientState.changeInfo
     * @link clientState.changeInfo
     * @callback clientState.changeInfo
     */
    function haveChangeInfo( form){

        if(form){
            clientState.changeInfo(fromFormDataToDict(form))
        }

    }

    return <>
        <section className="sections">
            <h1 className="sections__head">{head}</h1>
            <div className="sections__body profile">
                {clientState.isLoading && <Spinner/>}
                {info && <FormChangeInfoUser onSubmit={haveChangeInfo}/>}
                <section className="profile__catalog-events">
                    <Link to="/personal-area/orders">
                        <button className="white-button">
                            <img src={shopping_bag} title={'Заказы'} alt={''}/>
                            <span>Заказы</span>
                        </button>
                    </Link>

                    <Link to="/comparisons">
                        <button className="white-button">
                            <img src={reward} title={'Список сравнений'} alt={''}/>
                            <span>Список сравнений</span>
                        </button>
                    </Link>
                    <Link to="/personal-area/feedbacks">
                        <button className="white-button">
                            <img src={feedback} title={'Отзывы'} alt={''}/>
                            <span>Отзывы</span>
                        </button>
                    </Link>
                    <Link to="/logout" title={"выход"}>
                        <button className="white-button" >
                            <span>выход</span>
                        </button>
                    </Link>
                    <button className="blow-button">
                        <img src={service} title={'Служба поддержки (связь с продавцом)'} alt={''}/>
                        <span>Служба поддержки (связь с продавцом)</span>
                    </button>
                </section>
            </div>
        </section>
    </>
})

export default Profile;