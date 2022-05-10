import { User } from './user.model';
import { Comment } from './comment.model';
import { Following } from './following.model';

export class ImagesWall {
    filename: string;
    comments: string[];
    timestamp: string;
    _id: string;
    userData: string;
    id: string;
    commento: Comment[]
}
export class Stories {
    filename: string;
    userData: User;
    duration: string[];
    likes: string;
    views: string[]
    timestamp: string;
    _id: string;
}

export class StoriesFilter {
    users: {
        noSeen: Following[],
        seen: Following[]
      }
    stories: {
        noSeen: Array<Stories[]>,
        seen: Array<Stories[]>
    };
}

export class ProfileImage {
    filename: string;
    timestamp: string;
    _id: string;
}