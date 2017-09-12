import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintSubforum } from "_models/complaintSubforum";
import { ComplaintTheme, User } from "_models";
import { ComplaintComment } from "_models/complaintComment";
import { ComplaintsService, AlertService } from "_services";
import { Message } from "_models/message";

@Component({
    moduleId: module.id,
    templateUrl: 'showComplaints.component.html'
})

export class ShowComplaintComponent implements OnInit {
    complaintsForSubforums: ComplaintSubforum[];
    complaintsForThemes: ComplaintTheme[];
    complaintsForComments: ComplaintComment[];
    loggedUser: User;
    isLoggedUserAdmin = true

    constructor(
        private router: Router,
        private complaintsService: ComplaintsService,
        private alertService: AlertService
        ) { }

    ngOnInit() {
        this.getLoggedUser()
        if (this.loggedUser.Role == 0) {
             this.getAllComplaints()
        } else if (this.loggedUser.Role == 1){
            this.isLoggedUserAdmin = false
            this.getComplaintsForResponsibleModerator()
        }
    }

    private getAllComplaints() {
        this.complaintsService.getComplaintsForSubforums().then( 
            complaintsForSubforums => {
                this.complaintsForSubforums = complaintsForSubforums;}
        );
        this.complaintsService.getComplaintsForThemes().then( 
            complaintsForThemes => {
                this.complaintsForThemes = complaintsForThemes;}
        );
        this.complaintsService.getComplaintsForComments().then( 
            complaintsForComments => {
                this.complaintsForComments = complaintsForComments;}
        );
        
    }

    private getComplaintsForResponsibleModerator() {
        this.complaintsService.getComplaintsForThemes().then( 
            complaintsForThemes => {
                this.complaintsForThemes = complaintsForThemes.filter(cft => cft.Theme.SubForum.ResponsibleModerator_Id == this.loggedUser.Id);}
        );
        this.complaintsService.getComplaintsForComments().then( 
            complaintsForComments => {
                this.complaintsForComments = complaintsForComments.filter(cfc => cfc.Comment.Theme.SubForum.ResponsibleModerator_Id == this.loggedUser.Id);}
        );
    }

    private getLoggedUser() {
        var user = sessionStorage.getItem("user");        
        if (user != null)
        {
            this.loggedUser = JSON.parse(sessionStorage.getItem("user"));
        }
    }

    acceptSubforumComplaint(subforumComplaint: ComplaintSubforum) {
        this.complaintsService.acceptComplaintForSubforum(subforumComplaint.Id, subforumComplaint).subscribe(
                result => {
                this.alertService.success("Successfuly accepted complaint for subforum");
                this.ngOnInit();
                },
                error => this.alertService.error("Error while accepting complaint for subforum")
        );
    } 

    declineSubforumComplaint(subforumComplaint: ComplaintSubforum) {
        this.complaintsService.deleteComplaintForSubforum(subforumComplaint.Id).subscribe(
                result => {
                this.alertService.success("Successfuly deleted complaint for subforum");
                this.ngOnInit();
                },
                error => this.alertService.error("Error while deleting complaint for subforum")
         );
    }

    acceptThemeComplaint(themeComplaint: ComplaintTheme) {
         this.complaintsService.acceptComplaintForTheme(themeComplaint.Id, themeComplaint).subscribe(
                result => {
                this.alertService.success("Successfuly accepted complaint for theme");
                this.ngOnInit();
                },
                error => this.alertService.error("Error while accepting complaint for theme")
        );
    } 

    declineThemeComplaint(themeComplaint: ComplaintTheme) {
        this.complaintsService.deleteComplaintForTheme(themeComplaint.Id).subscribe(
                result => {
                this.alertService.success("Successfuly deleted complaint for theme");
                this.ngOnInit();
                },
                error => this.alertService.error("Error while deleting complaint for theme")
         );
    } 

    acceptCommentComplaint(commentComplaint: ComplaintComment) {
        this.complaintsService.acceptComplaintForComment(commentComplaint.Id, commentComplaint).subscribe(
                result => {
                this.alertService.success("Successfuly accepted complaint for comment");
                this.ngOnInit();
                },
                error => this.alertService.error("Error while accepting complaint for comment")
        );
    };

    declineCommentComplaint(commentComplaint: ComplaintComment) {
        this.complaintsService.deleteComplaintForComment(commentComplaint.Id).subscribe(
                result => {
                this.alertService.success("Successfuly deleted complaint for comment");
                this.ngOnInit();
                },
                error => this.alertService.error("Error while deleting complaint for comment")
         );
    } 

    warnAuthor(complaintTheme: ComplaintTheme) {
        var message = new Message();
        message.Readed = false;
        message.Receiver = complaintTheme.Theme.Author;
        message.Sender = complaintTheme.User;
        message.Text ="Warning has been sent for " + complaintTheme.Theme.Title;
        this.complaintsService.warnAuthor(this.loggedUser.Id, message).subscribe(
                result => {
                },
         );
    }

    warnAuthorOfSubforum(complaintSubforum: ComplaintSubforum){
        var message = new Message();
        message.Readed = false;
        message.Receiver = complaintSubforum.Subforum.ResponsibleModerator;
        message.Sender = complaintSubforum.User;
        message.Text ="Warning has been sent for " + complaintSubforum.Subforum.Name;
        this.complaintsService.warnAuthor(this.loggedUser.Id, message).subscribe(
                result => {
                },
        );
    }

    warnAuthorOfComment(complaintComment: ComplaintComment){
        var message = new Message();
        message.Readed = false;
        message.Receiver = complaintComment.Comment.Author;
        message.Sender = complaintComment.User;
        message.Text ="Warning has been sent for " + complaintComment.Comment.Content;
        this.complaintsService.warnAuthor(this.loggedUser.Id, message).subscribe(
                result => {
                },
        );
    }
}