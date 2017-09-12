import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, Theme, ComplaintTheme } from '../_models/';
import { ThemesService } from '../_services'

import { ComplaintsService, AlertService } from '../_services/index';
import { ComplaintSubforum } from "_models/complaintSubforum";
import { ComplaintComment } from "_models/complaintComment";

@Component({
    moduleId: module.id,
    templateUrl: 'complaint.component.html'
})

export class ComplaintThemeComponent {
    subjectName: String;
    user: String;
    loggedUser: User;
    complaintText: string;

    constructor( private router: Router,
                 private themesService: ThemesService,
                 private complaintsService: ComplaintsService,
                 private alertService: AlertService ) { }
    
    postComplain() {
      this.getLoggedUser();
      var complaintSubject = localStorage.getItem("complaintSubject");
      if (complaintSubject == "theme") {
            var theme = JSON.parse(localStorage.getItem('theme'));
            if(theme.Author.Id == this.loggedUser.Id) {
                this.alertService.error('You are author of complaint content!');
            } else {
            var complaintTheme = new ComplaintTheme();
            complaintTheme.User = this.loggedUser;
            complaintTheme.Author = theme.Author;
            complaintTheme.Theme = theme;
            complaintTheme.TimeStamp = new Date(Date.now()); 
            complaintTheme.Text = this.complaintText;

            this.complaintsService.create(complaintTheme).subscribe(
                        data => {
                            this.alertService.success('Posted complain for theme successfully', true);
                            this.router.navigate(['/themes']);
                        },
                        error => {
                            this.alertService.error('Error while posting complaint!');
                        });
            }
      }
       if (complaintSubject == "subforum") {
            var subforum = JSON.parse(localStorage.getItem('subForumJSON'));
            if(subforum.ResponsibleModerator.Id == this.loggedUser.Id) {
                this.alertService.error('You are responsible moderator of complaint content!');
            } else {
            var complaintSubforum = new ComplaintSubforum();
            complaintSubforum.Author = subforum.ResponsibleModerator;
            complaintSubforum.Subforum = subforum;
            complaintSubforum.User = this.loggedUser;
            complaintSubforum.Text = this.complaintText;
            complaintSubforum.TimeStamp = new Date(Date.now());
            
            this.complaintsService.createComplaintForSubforum(complaintSubforum).subscribe(
                        data => {
                            this.alertService.success('Posted complain for subforum successfully', true);
                            this.router.navigate(['/themes']);
                        },
                        error => {
                            this.alertService.error('Error while posting complaint!');
                        });
            }
       }
       if (complaintSubject == "comment") {
            var comment = JSON.parse(localStorage.getItem('commentJSON'));
            if(comment.Author.Id == this.loggedUser.Id) {
                this.alertService.error('You are author of complaint content!');
            } else {
            var complaintComment = new ComplaintComment();
                complaintComment.Author = comment.Author;
                complaintComment.Comment = comment;
                complaintComment.User = this.loggedUser;
                complaintComment.Text = this.complaintText;
                complaintComment.TimeStamp = new Date(Date.now());

                this.complaintsService.createComplaintForComment(complaintComment).subscribe(
                            data => {
                                this.alertService.success('Posted complain for comment successfully', true);
                                this.router.navigate(['/themes']);
                            },
                            error => {
                                this.alertService.error('Error while posting complaint!');
                            });
            }
       }
    }

    private getLoggedUser() {
        this.user = sessionStorage.getItem("user");        
        if (this.user != null)
        {
            this.loggedUser = JSON.parse(sessionStorage.getItem("user"));
        }
    }  
}