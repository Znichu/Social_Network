import axios from "axios";
import {PhotosType, ProfileType, UserType} from "../type/types";

const instance = axios.create ({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {"API-KEY": "6b2fd528-e763-4090-9008-f558677adae7"}
});

export const authAPI = {
    getAuth () {
        return instance.get<MeType>("/auth/me")
            .then(response => response.data)
    },
    login (email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>("/auth/login" , {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout () {
        return instance.delete<ResponseType>("/auth/login")
            .then(response => response.data)
    }
};

export const usersAPI = {
    getUsers (currentPage: number, totalPageCount: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${totalPageCount}`)
            .then(response => response.data)
    }
};

export const profileAPI = {
    getProfile (userId: number | null) {
        return instance.get<ProfileType>("profile/" + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>("profile/status/" + userId)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>("/profile/status/", {status: status})
            .then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>("/profile", profile)
            .then(res => res.data)
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<SavePhotoType>("/profile/photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};

export const followAPI = {
    follow (userId: number) {
        return instance.post<ResponseType>("/follow/" + userId, {})
            .then(response => response.data)
    },
    unfollow (userId: number) {
        return instance.delete<ResponseType>("/follow/" + userId)
            .then(response => response.data)
    }
};

export const securityAPI = {
    captchaUrl () {
        return instance.get<CaptchaUrlType>("/security/get-captcha-url")
            .then(response => response.data)
    }
};


type MeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
type LoginType = {
    data: {
        userId: number
    }
    resultCode: number
    messages: Array<string>
}
type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type ResponseType = {
    data: {}
    resultCode: number
    messages: Array<string>
}
type CaptchaUrlType = {
    url: string
}
type SavePhotoType = {
    data: {
        photos: PhotosType
    }
    resultCode: number
    messages: Array<string>
}