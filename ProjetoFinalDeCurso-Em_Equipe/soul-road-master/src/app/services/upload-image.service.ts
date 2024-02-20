import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({

  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: AngularFireStorage) { }

  
  uploadImage(file: File, onUpload: (imageURL: string) => void){
    const time = new Date();
    const filename = `${time}${file.name}`;
    const ref = this.storage.ref(filename)

    const task = this.storage.upload(filename,  file)

    task.snapshotChanges().pipe(finalize(() => ref.getDownloadURL().subscribe(onUpload))).subscribe()
    //percentageChanges para saber porcentagem faça tbm uma callback dela

  }
}
