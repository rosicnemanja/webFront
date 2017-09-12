import { User } from "_models";

export class Message {
    Id: number;
    Sender: User;
    Receiver: User;
    Text: string;
    Readed: boolean;
}