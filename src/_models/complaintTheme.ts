import { User, Theme } from '../_models/index';

export class ComplaintTheme {
    Id: number;
    Theme: Theme;
    Author: User;
    User: User;
    TimeStamp: Date;
    Text: string;
}