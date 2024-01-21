export  interface UserModel{
    name:string,
    email:string,
    address:string,
}
export  interface PostModel{
    id:number,
    title:string,
    keyword:string,
    des:string,
    slug:string,
    image:string,
    publish:number,
    content:string,
    rating:number,
    status:string,
    medium:string,
    created_at:string
    user_id:string,
    collabrators:string[],
    deletePost:(id: number)=> void;
}
export interface PostAddModel{
    title:string,
    content:string,
    medium:string,
    rating:number,
    status:string,
    user_id:number,
}