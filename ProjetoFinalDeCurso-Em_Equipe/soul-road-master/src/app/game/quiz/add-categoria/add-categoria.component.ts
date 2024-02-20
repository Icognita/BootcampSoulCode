import { Component, OnInit } from '@angular/core';
import { Cate } from 'src/app/interfaces/categoria';
import { QuizService } from 'src/app/services/quiz.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { FormsModule } from '@angular/forms';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

  categoria: Cate = {} as Cate
  image: File | null = null  


  changeImage(images: File | null){
    if(images){
      this.image = images;
      document.getElementById("customFileLabel").innerText='Ajuste o recorte do seu selo:';
    }
  }

  onSubmit(){
    this.uploadService.uploadImage(this.image!, (url) => {
      this.categoria.selo = url
      this.addCategoria();
    });
  }

  addCategoria() {
    this.quizService.addCategoria(this.categoria);
    alert("Categoria adicionada com sucesso");
  }

  constructor(private quizService: QuizService, private uploadService: UploadImageService) { }

  ngOnInit(): void {
  }

  /**
   * Image Cropper (experimental)
   */
   imageChangedEvent: any = '';
   croppedImage: any = '';
   croppedImgFile: any;
 
 
   fileChangeEvent(event: any): void {
     this.imageChangedEvent = event;
   }
 
   imageCropped(event: ImageCroppedEvent) {
     this.croppedImage = event.base64;
     this.croppedImgFile = base64ToFile(this.croppedImage);
 
     this.croppedImgFile = new File([this.croppedImgFile], 'badge.jpg', {
       type: this.croppedImgFile.type,
     });
     console.log('croppedImgFile: ', this.croppedImgFile);
     this.changeImage(this.croppedImgFile);
   }
 
   imageLoaded() {
     // show cropper
   }
   cropperReady() {
     // cropper ready
   }
   loadImageFailed() {
     // show message
   }

}
