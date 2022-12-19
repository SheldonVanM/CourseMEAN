import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
    selector : 'app-post-list',
    templateUrl : './post-list.component.html',
    styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    @Input() posts : Post[] = [];
    postsService : PostService;
    private postsSub : Subscription = new Subscription();

    constructor(postsService : PostService) {
        this.postsService = postsService;
    }

    ngOnDestroy(): void {
        this.postsSub.unsubscribe();
    }

    ngOnInit(): void {
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((posts : Post[]) => {
                this.posts = posts;
            });
    }

    remove() {
        
    }

}
