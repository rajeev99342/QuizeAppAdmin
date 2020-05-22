import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConstant } from '../Constant/Urls';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseApiUrl =  UrlConstant.devAPIUrl ;
  constructor(private http :HttpClient) {
    

  }

  
  saveQuestion(kidderQuest)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  

    
     return  this.http.post(this.baseApiUrl+"/kidderAdmin"+"/saveQuestionByAdmin",kidderQuest,{responseType: 'json', headers})
  }

  getQuestionByUser(username)
  {
    return this.http.get(this.baseApiUrl+"/kidderAdmin"+"/getQuestByAdmin"+"/"+`${username}`)
  }

}
