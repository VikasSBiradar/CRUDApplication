import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgFor,CommonModule,RouterModule,RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  posts : Post[] = [];

  constructor(public postService : PostService){}

  ngOnInit() : void{
    this.postService.getAll().subscribe((data : Post[])=>{
      //data = data?.slice(0,5);
      this.posts = data;
      console.log(this.posts);
    })
  }

  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
}
