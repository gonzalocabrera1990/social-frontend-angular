import { User } from './user.model';
import { Comment } from './comment.model';
export class Content {
    commento: Comment[][];
    comments: string[];
    id: string;
    imageId: ImagenID;
    timestamp: string;
    userId: User;
    _id: string;
}
export class ContentVideo {
    commento: Comment[][];
    comments: string[];
    id: string;
    videoId: ImagenID;
    timestamp: string;
    userId: User;
    _id: string;
}
interface ImagenID {
    comments: string[];
    filename: string;
    likes: string[];
    timestamp: string;
    userData: string;
    _id: string;
}