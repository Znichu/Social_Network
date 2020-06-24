import Friends from "./Friends";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";

let mapStateToProps = (state: RootState) => {
    return {
        friend: state.friendsBlock.friend
    }
};

const FriendsContainer = connect (mapStateToProps) (Friends);

export default FriendsContainer;