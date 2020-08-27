import {instance} from "./api";


export const dialogsApi = {
    getDialogs () {
        return instance.get('/dialogs')
            .then(res => res.data)
    },
    getFriendListMessages (userId: number) {
        return instance.get(`/dialogs/${userId}/messages`)
            .then(res => res.data)
    },
    startChatting(userId: number) {
        return instance.put(`/dialogs/${userId}`)
    },
    sendMessage (userId: number, body: string) {
        return instance.post(`/dialogs/${userId}/messages`, {body: body})
    }
}