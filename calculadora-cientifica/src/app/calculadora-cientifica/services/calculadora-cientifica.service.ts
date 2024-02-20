/** 
*Serviço responsável por executar as operações da calculadora.

*@author Mirian  <mirianvir@hotmial.com>
*@since 1.0

*/


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraCientificaService {

  /* definindo as contantes utilizadas
para identificar as operações de cálculo. */
static readonly SOMA: string = '+';
static readonly SUBTRACAO: string = '-';
static readonly DIVISAO: string = '/';
static readonly MULTIPLICACAO: string = '*';
static readonly SQR: string = 'sqrt'
static readonly PW2: string = 'pwtwo'
static readonly PW3: string = 'pwthree'

  constructor() { }
  /**
   * Método que calcula uma operação matemática dado dois numeros e uma operação;
   * Suporta as operações de adição, subtração, divisão e multiplicação.
   * @param num1 number
   * @param num2 number
   * @param operacao string operação a ser executada
   * @returns number Resultado da operação
   */

   calcular(num1:number, num2: number, operacao:string):number{
    let resultado:number;

    switch(operacao) {
      case CalculadoraCientificaService.SOMA:
        resultado = num1 + num2;
      break;
      case CalculadoraCientificaService.SUBTRACAO:
        resultado = num1 - num2;
      break;
      case CalculadoraCientificaService.DIVISAO:
        resultado = num1 / num2;
      break;
      case CalculadoraCientificaService.MULTIPLICACAO:
        resultado = num1 * num2;
      break;
      case CalculadoraCientificaService.SQR:
        resultado = Math.sqrt(num1);
        break;

      case CalculadoraCientificaService.PW2:
        resultado = Math.pow(num1, 2);
        break;

      case CalculadoraCientificaService.PW3:
        resultado = Math.pow(num1, 3);
        break;

      default:
        resultado =0;

    }
    return resultado;
  }
}

