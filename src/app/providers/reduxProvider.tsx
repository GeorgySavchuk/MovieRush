import {ReactNode} from "react";
import {Provider} from "react-redux";
import {setupStore} from '../../shared/model'

export const reduxProvider = (component: () => ReactNode) => () => (
    <Provider store={setupStore()}>
        {component()}
    </Provider>
)