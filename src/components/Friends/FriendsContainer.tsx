import Friends from "./Friends";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {FriendsType} from "../../type/types";

type MapStatePropsType = {
    friend: Array<FriendsType>
}

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        friend: state.friendsBlock.friend
    }
};

const FriendsContainer = connect (mapStateToProps) (Friends);

export default FriendsContainer;