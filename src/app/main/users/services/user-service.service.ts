import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Car} from '../interfaces/car'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(private http: HttpClient) {}

  getCarsSmall(){
    return this.http.get('../../../../assets/json/small-car.json')
     .toPromise()
    .then(res => <Car[]> res)
    .then(data => { return data; });
    }
}
