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
    aboutMe: string
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
    small: string
    large: string
}
export type DialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    newMessagesCount: number
    photos: PhotosType
}
export type MessageType = {
    id: number
    message: string
}
export type FriendsType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type UsersFilterType = {
    term: string
    friend: null | boolean
}
