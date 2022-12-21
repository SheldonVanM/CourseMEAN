import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.model";
import { PostService } from "../posts.service";

@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html',
    styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredTitle = "";
    enteredContent = "";

    constructor(public postsService : PostService) { }

    onAddPost(form : NgForm) {
        if( form.invalid ) {
            return;
        }
        const post : Post = {
            id : "f23425kgnw",
            title : form.value.title,
            content : form.value.content
        };
        this.postsService.addPost(post.id, post.title, post.content);
        form.resetForm();
    }

}



