export interface commentType {
    id?: string,
    reply_count?: number | string,
    created_at?: number | string,
    updated_at?: number | string,
    author: string,
    author_data?: commentAuther[],
    body: string,
    post_id: string | number,
    parent_id?: string | number
}
export interface commentAuther {
    _id: string,
    username: string,
    image: string,
}

export type postDataType = {
    caption: string,
    imgUrl: string[],
    author: string,
    posted_on?: string | number,
    likes?: string[],
    comments_count?: number,
    _id?: string,
}
export type resPostDataType = {
    caption: string,
    imgUrl: string[],
    author: string,
    posted_on: string | number,
    likes: string[],
    comments_count: number,
    _id: string,
    author_data: commentAuther[]
}

export type resUserdataType = {
    name: string | null,
    username: string | null;
    email: string | null,
    image: string | null,
    cover: string;
    _id: string;
    followers_count: number
    following_count: number
}
export type userdataType = {
    name: string | null,
    image: string | null,
    _id: string,
}

export type postData = {
    caption: string,
    imgUrl: string[],
    owner: string,
    posted_on: string,
    likes: string[],
    id: string | number,
    comments: commontsType[],
}
type commontsType = { user: string, comment: string }