import { Post } from './Models/post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  savePost(post: Post) {
    this.http
      .post<{message: string, post: Post}>('http://localhost:3000/api/posts', post)
      .subscribe((resp) => {
        console.log(resp.message);
        console.log(resp.post);
        this.posts.push(resp.post);
        this.postsUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        console.log(postData);
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  deletePost(id) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + id)
    .subscribe(responseData => {
      const updatedPosts = this.posts.filter(post => post.Id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }


}
