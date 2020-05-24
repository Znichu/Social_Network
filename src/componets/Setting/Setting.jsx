import React from "react";
import {withRedirect} from "../../hoc/hoc";

const Setting = () => {
    return (
        <div>
            Setting
        </div>
    )
};

let Redirect = withRedirect(Setting);

export default Redirect;