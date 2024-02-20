import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { Router } from '@angular/router';
import { Turma } from 'src/app/interfaces/turma';
import { TurmasService } from 'src/app/services/turmas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * Classe que contém os campos de registro do aluno,professor e administrador
 */
export class RegisterComponent implements OnInit {

  data: RegisterData = {} as RegisterData
  allTurmas?: Observable<Turma[]>

  registerError: string = ''
  //teste validacao formulario
  formCad: FormGroup;
  //######## imagem do perfil
  // image: File | null = null;
  // caminho_imagem: string ='';

 
  // changeImage(images: FileList | null) {
  //   if (images) {
  //     this.image = images[0];
  //     console.log("imagem nome:" + this.image.name);
  //     document.getElementById("customFileLabel").innerHTML = "arquivo selecionado:" + this.image.name;
  //   }
  // }

  /**
   * Se der erro ao cadastrar imagem de permissao,tem que alterar a regra no storage
   * e tirar o campo  if request.auth != null
   */
  onSubmit() {
    if (this.formCad.valid) {
      //aqui da upload na imagem e retorna o URL no Firebase,e salva no modelo
      // this.uploadService.uploadImage(this.image!, (url) => {
      // this.data.picProfile = url;
      // console.log("caminho da imagem="+this.data.picProfile);            
      
      // });
      this.authenticationService.signup(this.data);
      this.router.navigate(['/']);  
    } else {
      console.log("entrou ELSE Formcad.invalid")
    }

  }//onsubmit

  /**
   * Se for selecionado um pais diferente do brasil, coloca em estados 'outros'
   */
  onChange() {
    if (this.data.country !== 'Brasil') {
      this.data.state = "Outros";
      this.formCad.get('state').disable;
    }
  }

  /**
   * Cria um Formbuilder para fazer validações no formulario de cadastro
   * @param formBuilder 
   * @param authenticationService 
   */
  constructor(private formBuilder: FormBuilder,
    private turmaService: TurmasService,
    private authenticationService: AuthenticationService,
    private uploadService: UploadImageService,
    private router: Router) {
    //criando formBuilder para validações
    this.formCad = formBuilder.group({
      // Pattern para nome minusculo ,menos numeros
      fullname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z ]+$')])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$')])],
      birthdate: ['', Validators.compose([Validators.required])],
      //regex pra testar password
      //Minimum eight characters, at least one letter and one number:
      // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
      // password minimo 1 mauscula e 1 caracteres especial ^(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$
      password: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$")])],
      state: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      classroom: ['', Validators.compose([Validators.required])],
      // (xx)xxxxxxxxx  ou (DDD)xxxxxxxxx inclui 9 digito para celulares
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern("(?:^\\([0]?[1-9]{2}\\)|^[0]?[1-9]{2}[\\.-\\s]?)[9]?[1-9]\\d{3}[\.-\\s]?\\d{4}$")])]
    });
    // Fim validações
    this.authenticationService.errorEmitter.subscribe((msg) => (this.registerError = msg))
    //mostra o valor do campo fullname enquanto é digitado
    // this.formCad.get('fullname').valueChanges.subscribe(valor=>{
    //   console.log(valor);
    //});

  }//constructor

  /**
   * Ao iniciar o componente, colocar os valores no select
   */
  ngOnInit(): void {
    this.allTurmas = this.turmaService.getAllTurmas()
    this.data.country = "Selecione um País";
    this.data.state = "Selecione o Estado";
    this.data.classroom = "Selecione a Turma"
  }

}//exports
