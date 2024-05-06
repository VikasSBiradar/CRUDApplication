import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule,NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  form! : FormGroup; 

  constructor(public postService : PostService,
              private router : Router  
  ){}

  ngOnInit() : void {
    this.form = new FormGroup({
      title : new FormControl('', Validators.required),
      body : new FormControl('', Validators.required),
    })
  }

  get formControl(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((result : any)=>{
      console.log('Post created successfully!');
      this.router.navigateByUrl('post/index');
    })
  }



}
