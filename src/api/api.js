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
    },
    login (email, password, rememberMe = false) {
        return instance.post("/auth/login" , {email, password, rememberMe})
            .then(response => response.data)
    },
    logout () {
        return instance.delete("/auth/login")
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
    },
    getStatus(userId) {
        return instance.get("profile/status/" + userId)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put("/profile/status/", {status: status})
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put("/profile/photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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