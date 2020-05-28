import {addPost} from "../../redux/posts-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {withRedirect} from "../../hoc/hoc";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        posts: state.myPostsPage,
    }
};

export default compose( withRedirect, connect (mapStateToProps, {addPost}) ) (MyPosts);
