import { Component, OnInit } from '@angular/core';
import { CateDesafios } from 'src/app/interfaces/categoriaDesafios';
import { DesafioService } from 'src/app/services/desafio.service'; 

@Component({
  selector: 'app-add-categoria-desafios',
  templateUrl: './add-categoria-desafios.component.html',
  styleUrls: ['./add-categoria-desafios.component.css']
})
export class AddCategoriaDesafiosComponent implements OnInit {

  categoriaDesafios: CateDesafios = {} as CateDesafios  

  onSubmit(){    
    this.addCategoria();    
  }

  addCategoria() {
    this.desafiosService.addCategoria(this.categoriaDesafios);
    alert("Categoria adicionada com sucesso");
  }

  constructor(private desafiosService: DesafioService) { }

  ngOnInit(): void {
  }

}
