import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public formBuilder : FormBuilder, private router : Router) { }

  public registerForm!: FormGroup;
  public submitted = false;
  public loading = false;

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({

      name: ['', Validators.required],
      player: ['', Validators.required],
    })
  
    this.loading = true;
  }

  get formB(){
    {return this.registerForm.controls;}
  }

  public onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      console.log("error", this.registerForm.invalid);
    }else{

      let value = {
        name : this.registerForm.controls['name'].value,
        score : 0
      }

      localStorage.setItem(this.registerForm.controls['player'].value, JSON.stringify(value));

      this.router.navigate(["game"]);
    }
  }
}