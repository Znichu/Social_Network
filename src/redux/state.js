let rerenderTree = () => {
    console.log();
}

let state = {
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
}

window.state = state;

export const addPost = () => {   //функция для добавления нвого поста в стэйт
    let newPost = {
        id: 4,
        message: state.myPostsPage.newPostText,
        likesCount: 0
    };
    state.myPostsPage.posts.push(newPost); //добавляет новый пост в state для добавления используеться метод push()
    state.myPostsPage.newPostText = ''; //обнуление, зачищает поле ввода поста
    rerenderTree(state);
}

export const updatePostText = (newText) => {
    state.myPostsPage.newPostText = newText;
    rerenderTree(state);
}

export const addMessage = () => {
    let newMessage = {
        id: 7,
        message: state.messagesPage.newMessageText
    };
    state.messagesPage.messages.push(newMessage);
    state.messagesPage.newMessageText = '';
    rerenderTree(state);
}

export const updateMessageText = (newTextMessage) => {
    state.messagesPage.newMessageText = newTextMessage;
    rerenderTree(state);
}

export const subscribe = (observer) => {  
    rerenderTree = observer
}

export default state;


