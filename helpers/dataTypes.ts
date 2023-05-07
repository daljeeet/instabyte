export interface commentType {
    id?:string,
    reply_count?:number|string,
    created_at?:number|string,
    updated_at?:number|string,
    author: string,
    author_data?:commentAuther[],
    body: string,
    post_id: string | number,
    parent_id?:string|number
}
export interface commentAuther{
    _id:string,
    username:string,
    profile:string,
}

export type postDataType = {
    caption: string,
    imgUrl: string[],
    author: string,
    posted_on: string | number,
    likes: string[],
    comments_count: number,
    _id?: string,
    result?: userdataType[]
}
export type userdataType = {
    name: string | null,
    username?: string | null;
    email: string | null,
    id: string | null,
    profile: string | null,
    cover?: string
    _id?: string
    bookmarks?: string[]
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