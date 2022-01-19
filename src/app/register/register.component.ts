import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public formBuilder : FormBuilder) { }

  public registerForm!: FormGroup;
  public submitted = false;
  public loading = false;

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required],
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
      console.log(this.registerForm.controls);
      console.log(this.registerForm.controls['adresse'].value);

      let value = [{
        nom : this.registerForm.controls['nom'].value,
        email : this.registerForm.controls['email'].value,
      }]
      localStorage.setItem("formulaire", JSON.stringify(value));
    }
  }

}
