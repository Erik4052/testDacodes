import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.github.com';

  constructor(private http:HttpClient) { }

   searhUsers(query:string):Observable<any> {
    return this.http.get(`${this.apiUrl}/search/users?q=${query}`);
  }

  getUserDetails(userName:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/users/${userName}`);
  }

  getFollowerCount(username: string): Observable<number> {
    const url = `${this.apiUrl}/${username}/followers`;
    return this.http.get<any[]>(url).pipe(
      map((followers) => {
        return followers.length;
      }),
      catchError((error) => {
        console.error('Error al obtener seguidores:', error);
        return throwError('Error al obtener seguidores');
      })
    );
  }
  
//Endpoints que devuelven Promise

 /* searchUsers(query: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/search/users?q=${query}`).toPromise();
  }

  getUserDetails(username: string): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`).toPromise();
  } */


}
