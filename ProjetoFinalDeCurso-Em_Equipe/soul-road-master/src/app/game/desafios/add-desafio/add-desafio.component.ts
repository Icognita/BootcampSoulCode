import { Component, OnInit } from '@angular/core';
import { CateDesafios } from 'src/app/interfaces/categoriaDesafios';
import { Desafio } from 'src/app/interfaces/desafio';
import { DesafioService } from 'src/app/services/desafio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-desafio',
  templateUrl: './add-desafio.component.html',
  styleUrls: ['./add-desafio.component.css']
})
export class AddDesafioComponent implements OnInit {

  desafio: Desafio = {} as Desafio
  allCategoria?: Observable<CateDesafios[]>
  categoriaDesafios: CateDesafios
  valor: any

  onSubmit(){  
    this.addDesafio();
  }

  addDesafio(){
    this.desafioService.addDesafio(this.desafio)
    alert("Desafio adicionado com sucesso");
  }

  constructor(private desafioService: DesafioService) { }

  ngOnInit(): void {
    this.allCategoria = this.desafioService.getAllCategoriaDesafios()
  }

  pegaValor(valor): void{
    this.valor = valor;
    console.log("valor capturado: ", this.valor);
  }
}
