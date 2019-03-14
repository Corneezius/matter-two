import { FormService } from './../form.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/post.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  posts: Post[] = [];
  post: Post;
  constructor(private service: FormService) { }

  ngOnInit() {
    this.post = new Post();
    this.service.getPosts();
    this.service.getPostUpdateListener()
      .subscribe(posts => {
        this.posts = posts;
      });
  }
  submit(val: Post) {
    this.post.clientName = '';
    this.post.dueDate = '';
    this.post.servedDate = '';

    if(this.post.byCtorder == undefined) {
      this.post.byCtorder = false;
    }

    if(this.post.srvdOnDef == undefined) {
      this.post.srvdOnDef = false;
    }

    if(this.post.srvdOnPlt == undefined) {
      this.post.srvdOnPlt = false;
    }

    if(this.post.caseStatus == undefined) {
      this.post.caseStatus = false;
    }

    if(this.post.clientStatus == undefined) {
      this.post.clientStatus = false;
    }
    let pst = new Post(null,this.post.clientName,this.post.discoveryType,this.post.dateServed, this.post.byCtorder, this.post.dueDate, this.post.directedToParty, this.post.directedTo, this.post.servedBy, this.post.due, this.post.toCltforCert, this.post.servedDate, this.post.discNotes, this.post.caseStatus, this.post.clientStatus,this.post.answered,this.post.srvdOnDef, this.post.srvdOnPlt, this.post.ltSent, this.post.certReceived) ;
    this.post = new Post();
    console.log(pst);
    this.service.savePost(pst);
    window.location.reload();
  }

  delete(id) {
    this.service.deletePost(id);
  }
}
