import { User, Subforum } from '../_models/index';

export class ComplaintSubforum {
    Id: number;
    Subforum: Subforum;
    Author: User;
    User: User;
    TimeStamp: Date;
    Text: string;
}