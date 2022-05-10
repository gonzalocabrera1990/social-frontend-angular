import { User } from "./user.model";

export class Inbox {
    members: Members;
    room: string;
    talk: Messages[];
    timestamp: string;
    _id: string;
}

interface Members {
    userOne: User;
    userTwo: User;
}

interface Messages {
    author: string;
    content: string;
    seen: boolean;
    timestamp: string;
}