import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  saveData( namedata: string ,data: any ){
    localStorage.setItem( namedata, data);
  }

  getData( namedata: string ){
   return localStorage.getItem( namedata );
  }

  removeData( namedata: string ){
    localStorage.removeItem( namedata );
  }
}
