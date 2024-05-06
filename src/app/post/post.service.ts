import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "https://jsonplaceholder.typicode.com";

  headerOptions = {
    headers : new HttpHeaders({
      'Content-Type' :'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<any>{
    return this.httpClient.get(this.apiURL + '/posts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post : Post) : Observable<any>{
    return this.httpClient.post(this.apiURL + '/posts/', JSON.stringify(post))
    .pipe(catchError(this.errorHandler))
  }

  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/posts/' + id)
    .pipe(catchError(this.errorHandler))
  }

  update(id:number, post:Post): Observable<any> {
    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.headerOptions)
    .pipe( catchError(this.errorHandler))
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.headerOptions)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error : any){
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);

  }
}
