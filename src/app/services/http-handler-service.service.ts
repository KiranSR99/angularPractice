import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerServiceService {

  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  //POST Method
  addPersonalDetail(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/personalDetail/save`, data);

  }
}