import { User } from './user.model'
export class Comment {
    _id: string;
    comment: string;
    author: User;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface CommentInterface {
    comment: string,
    author: string,
    image: string
}