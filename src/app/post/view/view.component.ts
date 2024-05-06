import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
    id!: number;
    post!: Post;

    constructor(
      public postService: PostService,
      private route: ActivatedRoute,
      private router: Router
     ) {}

     ngOnInit(): void {
      this.id = this.route.snapshot.params['postId'];
      this.postService.find(this.id).subscribe((data: Post)=>{
        this.post = data;
      });
    }
}
