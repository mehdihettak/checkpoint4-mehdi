import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BackendService } from '../backend.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-artiste',
  templateUrl: './form-artiste.component.html',
  styleUrls: ['./form-artiste.component.scss']
})
export class FormArtisteComponent implements OnInit {

  public loginForm: FormGroup;
  submitted = false;
  public artiste = [];
  

  constructor(public router: Router, public formBuilder: FormBuilder, private http: HttpClient, private backendService: BackendService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(1)]],
      age: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
     
    });

  }

  onPost() {
    this.submitted = true;
    console.log('formulaire 1 validé');

    console.log(this.loginForm.value as JSON);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.backendService.addArtist(this.loginForm.value).subscribe((data) => { this.artiste = data; console.log(this.artiste)});
    ;
  }



}
  
