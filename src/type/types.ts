export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: null | string
    large: null |string
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}