import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService{
 currentUser:IUser 

 constructor(private http: HttpClient) {}

 loginUser(userName:string, password:string){

  let loginInfo = { username: userName, password: password };
  let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
  
  return this.currentUser = {
      id: 1,
      userName: loginInfo.username,
      firstName: loginInfo.username,
      lastName: ''
   }
    
 }

 isAuthenticated(){
  return !!this.currentUser
 }

 updateCurrentUser(firstName:string, lastName:string){
  this.currentUser.firstName = firstName
  this.currentUser.lastName = lastName
 }
}