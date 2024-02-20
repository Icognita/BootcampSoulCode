import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  codes: Record<string, string> = {
    'auth/user-not-found': 'Usuário não cadastrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/email-already-in-use': 'Email já está em uso.',
  };

  formatError(code: string) {
    return this.codes[code] || 'Um erro ocorreu';
  }
}

