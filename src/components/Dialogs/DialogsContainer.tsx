import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withRedirect} from "../../hoc/hoc";
import {compose} from "redux";
import {RootState} from "../../redux/redux-store";
import {DialogType, MessageType} from "../../type/types";
import {actions} from "../../redux/messages-reducer";

let {addMessage} = actions;

type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
};


export default compose(connect (mapStateToProps, {addMessage}), withRedirect) (Dialogs);
