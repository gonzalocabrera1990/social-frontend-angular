import { Image } from './image.model';
import { Followers } from './followers.model';
import { Following } from './following.model';
import { ImagesWall, Stories } from './imageswall.model';
import { Notifications } from './notifications.model';
import { ImageStart } from './imagestart.model';

export class User {
    country: string;
    date: string;
    sex: string;
    admin: boolean;
    firstname: string;
    lastname: string;
    phrase: string;
    publicStatus: boolean;
    image: Image;
    _id: string;
    username: string;
    followers: Followers[];
    following: Following[];
    imagesWall: ImagesWall[];
    videosWall: ImagesWall[];
    notifications: Notifications[];
    start: ImageStart[];
    stories: Stories[];
}