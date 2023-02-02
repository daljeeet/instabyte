export type postData = {
    caption: string,
        imgUrl: string[],
        owner: string,
        posted_on:string,
        likes: string[],
        id: string | number,
        comments:commontsType[],
}
type commontsType = {user:string,comment:string}