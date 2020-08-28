import {instance, ResponseType} from "./api";

export const followAPI = {
    follow(userId: number) {
        return instance.post<ResponseType>("/follow/" + userId, {})
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>("/follow/" + userId)
            .then(response => response.data)
    }
};