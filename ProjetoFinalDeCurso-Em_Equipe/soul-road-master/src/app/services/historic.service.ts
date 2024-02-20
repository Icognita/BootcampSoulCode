import { Injectable } from '@angular/core';
import { Historic } from '../interfaces/historic.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  constructor() { }

  readLocaStorage():Historic[]{
    return localStorage['historic'] ? JSON.parse(localStorage['historic']) : [];
  }
}
