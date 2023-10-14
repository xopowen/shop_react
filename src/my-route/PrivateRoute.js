import { Navigate  } from "react-router-dom";

import { observer } from "mobx-react-lite";
import authStore from "../components/mbox/AuthStore";

/**
 *
 * @param props
 * @return {JSX.Element|*}
 * @constructor
 * @description проверяет статус авторизации пользователя
 * @description если пользователь не авторизован перенаправляет на страницу авторизации.
 */
const PrivateRoute = (props) => {

    if (authStore.isAuthInProgress) {
        return <div>Checking auth...</div>;
    }
    if (authStore.isAuth) {

        return props.children
    } else {
        if(authStore.isRefreshLinkValid){
            authStore.checkAuth()
            return <></>
        }
        return <Navigate to="/login" />;
    }
};

export default observer(PrivateRoute);