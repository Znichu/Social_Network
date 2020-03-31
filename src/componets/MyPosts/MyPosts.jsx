import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";


const MyPosts = (props) => {

    let postsElement =
        props.state.posts.map(p => <Post message={p.message} likes={p.likesCount} />);

    let newPostElement = React.createRef();

    let addPost = () => { // функция обработки onClick
        props.addPost(); //
    }

    let onPostChange = () => { //обработчик onChange
        let text = newPostElement.current.value; //берет текст из значения поля для ввода
        props.updatePostText(text); //значение textarea передается в аргументы функции, которая находится в state и прокинута сюда через пропс
    }

    return (
        <div className="container">
            <div className={s.create_post}>

                <div className={s.form_group}>
                            <textarea onChange={onPostChange} ref={newPostElement} className={s.form_control} name="texts" id="exampleTextarea" cols="30"
                                      rows="1" value={props.state.newPostText} placeholder='Что у Вас нового?'/>
                    <button onClick={ addPost } className={s.btn_primary}>Опубликовать</button>
                </div>
            </div>
            <h5 style={{textAlign:"center", marginBottom:"20px", marginTop:"45px"}}>My posts</h5>
            <div>
                {postsElement}
            </div>

        </div>


    );
}
export default MyPosts;