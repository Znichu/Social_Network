import axios from "axios";
import {PhotosType, UserType} from "../type/types";

export const instance = axios.create ({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {"API-KEY": "b8-f438-4eab-b20e-a45dfe437f13"}
});


export type MeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
export type LoginType = {
    data: {
        userId: number
    }
    resultCode: number
    messages: Array<string>
}
export type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export type ResponseType = {
    resultCode: number
    messages: string[],
    data: {}
}
export type CaptchaUrlType = {
    url: string
}
export type SavePhotoType = {
    data: {
        photos: PhotosType
    }
    resultCode: number
    messages: Array<string>
}