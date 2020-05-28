import {addMessage} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withRedirect} from "../../hoc/hoc";
import {compose} from "redux";



let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
};


export default compose(connect (mapStateToProps, {addMessage}), withRedirect) (Dialogs);
