import {withProviders} from "./providers";
import {RouterProvider} from "react-router-dom";
import {router} from "../shared/routing";

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
};

export default withProviders(App)