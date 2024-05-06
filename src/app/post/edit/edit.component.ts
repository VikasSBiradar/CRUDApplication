import { Component } from '@angular/core';
import { Post } from '../post';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id!:number;
  post!:Post;
  form!:FormGroup

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() : void{
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data : Post)=>{
      this.post = data;
    })

    this.form = new FormGroup({
      title : new FormControl('', [Validators.required]),
      body : new FormControl('', [Validators.required])
    })
  }

  get formControl(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res : any) =>{
      console.log('Post updated successfully!');
      this.router.navigateByUrl('post/index');
    })
  }
}
