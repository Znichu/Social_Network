import {actions} from "../../redux/posts-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {withRedirect} from "../../hoc/hoc";
import {compose} from "redux";
import {PostType, ProfileType} from "../../type/types";
import {RootState} from "../../redux/redux-store";

type MapStatePropsType = {
    posts: Array<PostType>
    avatar: ProfileType | null
}

let {addPost} = actions;

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        posts: state.myPostsPage.posts,
        avatar: state.myProfile.profile
    }
};

export default compose( withRedirect, connect (mapStateToProps, {addPost}) ) (MyPosts);
