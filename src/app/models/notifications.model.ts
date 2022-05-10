import { User } from './user.model';
export class Notifications {
    followingId: User;
    message: string;
    readstatus: boolean;
    timestamp: string;
}
export interface NotificationResponse {
    action: boolean;
    followerId: string;
    notiId: string;
}