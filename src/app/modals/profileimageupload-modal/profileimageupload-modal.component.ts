import { Component, Inject, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-profileimageupload-modal',
  templateUrl: './profileimageupload-modal.component.html',
  styleUrls: ['./profileimageupload-modal.component.css']
})
export class ProfileimageuploadModalComponent implements OnInit {
  @Input() profileImage: Image;
  @Output() newUploadEvent = new EventEmitter<File>();
  file:File = null;
  imageShowen: any = null;
  loadingProfileImage: boolean = false;

  constructor(@Inject('baseURL') private baseURL,
  public dialogRef: MatDialogRef<ProfileimageuploadModalComponent>) { }

  ngOnInit() {
  }
  onChangeImageUpload(event) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    this.imageShowen = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imageShowen = reader.result; 
    }
  }
  cleanInput() {
    this.imageShowen = null;
    this.file = null;
    this.dialogRef.close()
   }
  onUpload() {
    this.loadingProfileImage = true;
    this.newUploadEvent.emit(this.file);
  }
}
