import { Injectable } from '@angular/core';
import { Post  } from "./post.model";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn : 'root' })
export class PostService {
    private posts : Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http : HttpClient) {}

    getPosts() {
        this.http.get<{message : string, posts : Post[]}>('http://localhost:3000/api/posts')
        .subscribe((postData) => {
            this.posts = postData.posts;
            this.postUpdated.next([...this.posts]);
        });
    }

    addPost(id: string, title: string, content: string) {
        const post: Post = {id : id, title : title, content : content};
        // Update server
        this.http.post<{message : string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            console.log(responseData);
            this.posts.push(post);
            this.postUpdated.next([...this.posts]);
        });

    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

}
