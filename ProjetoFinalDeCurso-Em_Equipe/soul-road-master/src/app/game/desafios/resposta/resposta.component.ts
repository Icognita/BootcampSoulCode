import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Resposta } from 'src/app/interfaces/resposta';
import { RespostaService } from 'src/app/services/resposta.service';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.css']
})
export class RespostaComponent implements OnInit {

  @Input() user: RegisterData;  
 
  public User: RegisterData[] = []
  public usuario: RegisterData;
  respostas$?: Observable<Resposta[]>;
  user_atual_id:string=''
  id: number[] = [];

  allRespostas$?: Observable<Resposta[]>;

  constructor(
    private respostaService: RespostaService,
    private authService: AuthenticationService

  ) {}

  ngOnInit(): void {
    this.allRespostas$ = this.respostaService.getAllRespostas();

    this.authService.user.subscribe((user) => {
      if (user) {        
       console.log("UID usuario atual ="+user.uid);
       this.user_atual_id=user.uid;
        this.respostas$ = this.respostaService.getRespostas(user.uid);        
      }      
    });
    
    this.authService.getUsers().subscribe(
      (user: RegisterData[]) => {
        this.User = user;    
        console.log(this.User);
        for (let i = 0; i <= this.User.length; i++) {
          if(this.User[i].key == this.user_atual_id){
            this.usuario= this.User[i];
             console.log("Usuario Logado: ",this.usuario.fullname);
          }
          
          this.id[i] = i + 1
        }
      }
    )
  }

 

  


}




