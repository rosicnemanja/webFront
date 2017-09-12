import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ComplaintTheme } from '../_models/complaintTheme';
import { ComplaintSubforum } from '../_models/complaintSubforum';

import 'rxjs/add/operator/toPromise';
import { ComplaintComment } from "_models/complaintComment";
import { User } from "_models";
import { Message } from "_models/message";

const headers = new Headers({'Content-Type': 'application/json'});
const baseUrl = "http://localhost:1172";

@Injectable()
export class ComplaintsService {
    constructor(private http: Http) { 
    }

    getComplaintsForComments() : Promise<ComplaintComment[]> {
        return this.http.get(baseUrl + '/api/complaincomment?$expand=User,Author,Comment/Theme/SubForum/ResponsibleModerator,Comment/Author').toPromise().then(response => { return response.json() as ComplaintComment[]; }).catch(this.handleError);
    }

    getComplaintsForThemes() : Promise<ComplaintTheme[]> {
        return this.http.get(baseUrl + '/api/complaintheme?$expand=User,Theme/Author,Theme/SubForum/ResponsibleModerator').toPromise().then(response => { return response.json() as ComplaintTheme[]; }).catch(this.handleError);
    }

    getComplaintsForSubforums() : Promise<ComplaintSubforum[]> {
        return this.http.get(baseUrl + '/api/complainsubforum?$expand=User,Subforum/ResponsibleModerator').toPromise().then(response => { return response.json() as ComplaintSubforum[]; }).catch(this.handleError);
    }

    create(complainTheme: ComplaintTheme) {
        return this.http.post(baseUrl + '/api/complaintheme', complainTheme).map((response: Response) => response.json());
    }

    createComplaintForSubforum(complainSubforum: ComplaintSubforum) {
        return this.http.post(baseUrl + '/api/complainsubforum', complainSubforum).map((response: Response) => response.json());
    }

    createComplaintForComment(complainComment: ComplaintComment) {
        return this.http.post(baseUrl + '/api/complaincomment', complainComment).map((response: Response) => response.json());
    }

    deleteComplaintForComment(id: number) {
        return this.http.delete(baseUrl + '/api/complaincomment/' + id).map((response: Response) => response.json());
    }

    acceptComplaintForComment(id: number,complainComment: ComplaintComment) {
        return this.http.put(baseUrl + '/api/complaincomment/' + id, complainComment).map((response: Response) => response.json());
    }

    deleteComplaintForTheme(id: number) {
        return this.http.delete(baseUrl + '/api/complaintheme/' + id).map((response: Response) => response.json());
    }

    acceptComplaintForTheme(id: number, complainTheme: ComplaintTheme) {
        return this.http.put(baseUrl + '/api/complaintheme/' + id, complainTheme).map((response: Response) => response.json());
    }

    deleteComplaintForSubforum(id: number) {
        return this.http.delete(baseUrl + '/api/complainsubforum/' + id).map((response: Response) => response.json());
    }

    acceptComplaintForSubforum(id: number, complaintSubforum: ComplaintSubforum) {
        return this.http.put(baseUrl + '/api/complaintheme/' + id, complaintSubforum).map((response: Response) => response.json());
    }

    warnAuthor(id: number, message: Message) {
        debugger
        return this.http.put(baseUrl + '/api/messages/' + id, message).map((response: Response) => response.json());
    }

    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}