import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BackendService } from '../backend.service';
import { ArtistData } from '../models/artisteData.model';

@Component({
  selector: 'app-form-artiste',
  templateUrl: './form-artiste.component.html',
  styleUrls: ['./form-artiste.component.scss']
})
export class FormArtisteComponent implements OnInit {

  artisteForm:FormGroup = this.fb.group({
    name: ['',Validators.required],
    description: ['', Validators.required],
    age: ['', Validators.required]
  })
  artistData:ArtistData;
  myArtists;
    constructor(private back:BackendService,private fb:FormBuilder) { }
  
    ngOnInit() {
      this.back.getArtist().subscribe(res => {
        this.myArtists = res
      })
    }
  
    addArtist() {
      this.artistData = this.artisteForm.value
      this.back.addArtist(this.artistData).subscribe(res => {
        console.log(res)
      })
    }}

