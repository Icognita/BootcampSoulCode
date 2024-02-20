import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { Router } from '@angular/router';
import { Turma } from 'src/app/interfaces/turma';
import { TurmasService } from 'src/app/services/turmas.service';
import {
  base64ToFile,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css'],
})
export class UpdateUsersComponent implements OnInit {
  users: RegisterData = {} as RegisterData;

  allTurmas?: Observable<Turma[]>;

  public User: RegisterData[] = [];
  public usuario: RegisterData;

  caminho_imagem: string = '';
  image: File | null = null;

  user_atual_id: string = '';
  id: number[] = [];
  
  onSubmit() {
    // carrega imagem e retorna URL para salvar no firebase
    if (this.image !== null) {
      this.uploadService.uploadImage(this.image!, (url) => {
        this.users.picProfile = url;
        console.log('caminho da imagem=' + this.users.picProfile);
        // atualiza o usuario
        this.updateUser();
      });
    } else {
      //se nao tiver imagem ,salva tambem
      this.updateUser();
    }
  }

  /**
   * Salva a imagem no banco de dados,mas o caminho fica no picprofile =''
   * @param images
   */
  changeImage(images: File | null) {
    console.log("images: ", images)
    if (images) {
      this.image = images;
      console.log('imagem nome:' + this.image.name);
      document.getElementById('customFileLabel').innerHTML =
        'Ajuste a exibição da sua foto de perfil:'
    }
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

    this.croppedImgFile = new File([this.croppedImgFile], 'profile.jpg', {
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

  updateUser() {
    console.log(this.users);
    this.authService.updateUsers(this.users).then(this.activeModal.dismiss);
    try {
      alert('Usuário atualizado com sucesso!');
    } catch (e) {
      alert('Erro ao atualizar usuário.');
    }
  }

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private turmaService: TurmasService,
    public activeModal: NgbActiveModal,
    private uploadService: UploadImageService
  ) {}

  ngOnInit(): void {
    this.allTurmas = this.turmaService.getAllTurmas();

    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
        console.log('UID usuario atual =' + user.uid);
        this.user_atual_id = user.uid;
      }
    });

    this.authService.getUsers().subscribe((user: RegisterData[]) => {
      this.User = user;
      console.log(this.User);
      for (let i = 0; i <= this.User.length; i++) {
        if (this.User[i].key == this.user_atual_id) {
          this.usuario = this.User[i];
          console.log('Usuario Logado: ', this.usuario.fullname);
        }

        this.id[i] = i + 1;
      }
    });
  }
 
}
