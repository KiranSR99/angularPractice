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

  //GET Method
  getPersonalDetail(): Observable<any>{
    return this.http.get(`${this.apiUrl}/personalDetail/fetch`);
  }

  //GET Method (get by Id)
  getPersonalDetailById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/personalDetail/fetch/`+id)
  }

  //DELETE Method
  deletePersonalDetail(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/personalDetail/delete/`+id);
  }

  //UPDATE Method
  updatePersonalDetail(data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/personalDetail/update`, data);
  }

  //GET Method (GET Method to get the family detail)
  getFamilyDetailById(id: number) : Observable<any>{
    return this.http.get(`${this.apiUrl}/familyDetail/fetch/${id}`)
  }

  //DELETE method to delete family detail by id
  deleteFamilyDetailById(id: number){
    return this.http.delete(`${this.apiUrl}/familyDetail/delete/${id}`);
  }
}