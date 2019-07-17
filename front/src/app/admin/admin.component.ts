import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

artisteForm:FormGroup = this.fb.group({
  name: ['',Validators.required],
  description: ['', Validators.required],
  age: ['', Validators.required]
})
artistData;
myArtists;
  constructor(private back:BackendService,private fb:FormBuilder) { }

  ngOnInit() {
    this.back.getArtist().subscribe(res => {
      this.myArtists = res
    })
  }

  addArtist(id:number) {
    this.artistData = this.artisteForm.value
    this.back.addArtist(this.artistData).subscribe(res => {
      console.log(res)
    })
  }

  deleteArtist(id:number){
    this.myArtists.splice(id -1, 1);
    this.back.deleteArtist(id).subscribe(res => {
      console.log(res)
    })
  }
}
