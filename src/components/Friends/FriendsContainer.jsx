import Friends from "./Friends";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        friend: state.friendsBlock.friend
    }
};

const FriendsContainer = connect (mapStateToProps) (Friends);

export default FriendsContainer;