import { Component, OnInit } from '@angular/core';
import { Turma } from 'src/app/interfaces/turma';
import { TurmasService } from 'src/app/services/turmas.service';

@Component({
  selector: 'app-add-turma',
  templateUrl: './add-turma.component.html',
  styleUrls: ['./add-turma.component.css']
})
export class AddTurmaComponent implements OnInit {

  turma: Turma = {} as Turma 
 

  onSubmit(){    
    this.addTurma();    
  }

  addTurma() {
    this.turmaService.addTurma(this.turma);
    alert("Turma adicionada com sucesso!");
  }

  constructor(private turmaService: TurmasService) { }

  ngOnInit(): void {    
  }

}
