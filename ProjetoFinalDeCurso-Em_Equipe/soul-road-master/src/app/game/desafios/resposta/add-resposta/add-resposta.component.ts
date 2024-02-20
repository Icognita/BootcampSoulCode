import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Desafio } from 'src/app/interfaces/desafio';
import { Resposta } from 'src/app/interfaces/resposta';
import { RespostaService } from 'src/app/services/resposta.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-resposta',
  templateUrl: './add-resposta.component.html',
  styleUrls: ['./add-resposta.component.css']
})
export class AddRespostaComponent implements OnInit {

  @Input() desafio: Desafio = {} as Desafio

  resposta: Resposta = {} as Resposta
  arquivo: File | null = null

  changeArquivo(arquivos: FileList | null) {
    if (arquivos) {
      this.arquivo = arquivos[0]
      document.getElementById("customFileLabel").innerHTML = this.arquivo.name;
    }
  }

  onSubmit() {
    this.uploadService.uploadImage(this.arquivo!, (url) => {
      this.resposta.arquivoResposta = url
      this.addResposta();      
    });
  }

  addResposta() {
    console.log("resposta: ", this.resposta, "desafio: ", this.desafio)
    this.respostaService.addResposta(this.resposta, this.desafio).then(this.activeModal.dismiss)  
  }

  constructor(private respostaService: RespostaService, private uploadService: UploadImageService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

}
