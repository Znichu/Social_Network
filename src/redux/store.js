import PostsReducer from "./posts-reducer";
import MessageReducer from "./messages-reducer";
import friendsReducer from "./friend-reducer";


let store = {
    _state: {
        myPostsPage: {
            posts: [
                {
                    id: 1,
                    message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ',
                    likesCount: 25
                },
                {
                    id: 2,
                    message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing duskam azer. ',
                    likesCount: 32
                },
                {
                    id: 3,
                    message: 'Images come in all sizes. So do screens. Responsive images automatically adjust to fit the size of the screen.',
                    likesCount: 105
                }
            ],
            newPostText:''
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Serg'},
                {id: 3, name: 'Juliya'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Lena'}
            ],
            messages: [
                {id: 1, message: 'Hello.'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'I\'m fine.'},
                {id: 4, message: 'What you did now?'},
                {id: 5, message: 'Read book.'},
                {id: 6, message: 'Cool.'},
            ],
            newMessageText: ''
        },
        friendsBlock:{
            friend: [
                {id: 1, name: 'Serg'},
                {id: 2, name: 'Dima'},
                {id: 3, name: 'Lena'}
            ]
        }
    },

    getState() {
      return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer
    },

    _callSubscriber () {
        console.log('State changed');
    },

    // addPost () {   //функция для добавления нвого поста в стэйт
    //     let newPost = {
    //         id: 4,
    //         message: this._state.myPostsPage.newPostText,
    //         likesCount: 0
    //     };
    //     this._state.myPostsPage.posts.push(newPost); //добавляет новый пост в state для добавления используеться метод push()
    //     this._state.myPostsPage.newPostText = ''; //обнуление, зачищает поле ввода поста
    //     this._callSubscriber(this._state);
    // },
    // updatePostText (newText) {
    //     this._state.myPostsPage.newPostText = newText;
    //     this._callSubscriber(this._state);
    // },
    // addMessage () {
    //     let newMessage = {
    //         id: 7,
    //         message: this._state.messagesPage.newMessageText
    //     };
    //     this._state.messagesPage.messages.push(newMessage);
    //     this._state.messagesPage.newMessageText = '';
    //     this._callSubscriber(this._state);
    // },
    // updateMessageText (newTextMessage) {
    //     this._state.messagesPage.newMessageText = newTextMessage;
    //     this._callSubscriber(this._state);
    // },

    dispatch (action) {
        this._state.myPostsPage = PostsReducer(action, this._state.myPostsPage);
        this._state.messagesPage = MessageReducer(action, this._state.messagesPage);
        this._state.friendsBlock = friendsReducer(action, this._state.friendsBlock);


        this._callSubscriber(this._state);
    },

};


window.state = store;
export default store;


