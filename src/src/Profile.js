import FormChangeInfoUser from "../components/formComponents/forms/FormChangeInfoUser";
import {Link} from "react-router-dom";
//img
import shopping_bag from '../img/icons/shopping-bag.svg'
import list from '../img/icons/list.svg'
import reward from '../img/icons/reward.svg'
import feedback from '../img/icons/feedback.svg'
import service from '../img/icons/service.svg'
import clientState from "../components/mbox/ClientState";
import {useEffect} from "react";
import authStore from "../components/mbox/AuthStore";
import {observer} from "mobx-react-lite";
import fromFormDataToDict from "../components/helpFunction/fromFormDataToDict";

let Profile = observer(({head})=>{
    /*
     props->{head - заголовок}
     отображает форму с данными пользователя
     зависит от clientState
     * */
    let info = clientState.info

    useEffect(()=>{
        if(!authStore.isAuth)
            clientState.clean()

    },[authStore.isAuth])

    function haveChangeInfo( form){
        let data = fromFormDataToDict(form)
        clientState.changeInfo(data)
    }

    return <>
        <section className="sections">
            <h1 className="sections__head">{head}</h1>
            <div className="sections__body profile">
                {info && <FormChangeInfoUser onSubmit={haveChangeInfo}/>}
                <section className="profile__catalog-events">
                    <Link to="/personal-area/orders/">
                        <button className="white-button">
                            <img src={shopping_bag} title={'Заказы'}/>
                            <span>Заказы</span>
                        </button>
                    </Link>

                    <Link to="/comparisons/">
                        <button className="white-button">
                            <img src={reward} title={'Список сравнений'}/>
                            <span>Список сравнений</span>
                        </button>
                    </Link>
                    <Link to="/personal-area/feedbacks/">
                        <button className="white-button">
                            <img src={feedback} title={'Отзывы'}/>
                            <span>Отзывы</span>
                        </button>
                    </Link>
                    <Link to="/logout/" title={"выход"}>
                        <button className="white-button" >
                            <span>выход</span>
                        </button>
                    </Link>
                    <button className="blow-button">
                        <img src={service} title={'Служба поддержки (связь с продавцом)'}/>
                        <span>Служба поддержки (связь с продавцом)</span>
                    </button>
                </section>
            </div>
        </section>
    </>
})

export default Profile;