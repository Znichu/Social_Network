import * as axios from "axios";

const instance = axios.create ({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "6b2fd528-e763-4090-9008-f558677adae7"}
});

export const authAPI = {
    getAuth () {
        return instance.get("/auth/me")
            .then(response => response.data)
    }
};

export const usersAPI = {
    getUsers (currentPage, totalPageCount) {
        return instance.get(`users?page=${currentPage}&count=${totalPageCount}`)
            .then(response => response.data)
    }
};

export const profileAPI = {
    getProfile (userId) {
        return instance.get("profile/" + userId)
            .then(response => response.data)
    }
};

export const followAPI = {
    follow (userId) {
        return instance.post("follow/" + userId, {})
            .then(response => response.data)
    },
    unfollow (userId) {
        return instance.delete("follow/" + userId)
            .then(response => response.data)
    }
};