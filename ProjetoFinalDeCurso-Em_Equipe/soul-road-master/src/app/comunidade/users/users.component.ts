import { Component, Input, OnInit } from '@angular/core';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUsersComponent } from './update-users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() user: RegisterData;  

  id: number[] = []
  public User: RegisterData[] = []
  term;
  page: number = 1
 
  public usuario: RegisterData; 
  user_atual_id:string=''

  constructor(private authService: AuthenticationService, private modalService: NgbModal) { }

  openUpdateUserModal(users: RegisterData) {
    const modalRef = this.modalService.open(UpdateUsersComponent);
    modalRef.componentInstance.users = users;
  }

  ngOnInit(): void { 
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

    
    //usuarios aguardando liberação
    /* this.auth.getUsersAuthorization().subscribe(
     (user: RegisterData[]) => {
       this.User = user

        for (let i = 0; i <= this.User.length; i++) {
         this.id[i] = i + 1
       } 
     }
   )    */
  }

  key: string = 'id'
  reverse: boolean = false
  sort(key) {
    this.key = key
    this.reverse = !this.reverse
  }
}
