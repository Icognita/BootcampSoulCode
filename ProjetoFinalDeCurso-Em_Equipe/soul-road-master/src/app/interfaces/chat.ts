import { DatePipe } from "@angular/common";

export interface Chat {
    key?: string;
    texto: string;
    nome: string;
    foto: string;
    uid: string;
    dataHora: number;
}