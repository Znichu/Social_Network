import React from "react";
import s from "./Post.module.css"


const Post = (props) => {
    return (
        <div className={s.post_content}>
            <div className={s.post_container}>
                <img className={`${s.profile_photo_md} ${s.pull_left}`}
                     src="https://avatars2.githubusercontent.com/u/23550189?s=400&v=4" alt=""/>
                <div className={s.post_detail}>
                    <div className="user_info">
                        <h5><a href="#">Sergey Neplashov </a></h5>
                        <p className={s.text_muted}>Published about 3 mins ago</p>
                    </div>
                </div>
                <div className={s.post_text}>
                    <p> {props.message} </p>
                </div>
                <div>
                    <span className={s.main_like}>You and {props.likes} people like this</span>
                </div>
            </div>
        </div>
    );
}
export default Post;