import { User, Comment } from '../_models/index';

export class ComplaintComment {
    Id: number;
    Comment: Comment;
    Author: User;
    User: User;
    TimeStamp: Date;
    Text: string;
}