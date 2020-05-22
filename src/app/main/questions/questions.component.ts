import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from './question.service';
import {UserQuestionModel} from './model/UserQuestionModel'
import { UserModel } from '../users/model/UserModel';
import { KiKidderQuestModel } from './model/KiKidderQuestModel';
import { DisplayQuestModel } from './model/DisplayQuestModel';

import {} from '../Constant/QuestionLevel'
import { GeneralSubject } from '../Constant/DummyData';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  cars: any[];
  cols: any[]=[];
  displayAddNewQuesDiaglog : boolean = false;
  user = null;
  displayQuestList : KiKidderQuestModel[]=[];

  questModel : KiKidderQuestModel;

  displayRowData : DisplayQuestModel[]=[];
  topicList :any[]=[];

  constructor(
    private questService : QuestionService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("/assets/json/users.json").subscribe((data)=>{
      console.log('data->',data);
      this.cars = data["data"];
      this.topicList = GeneralSubject.Topics;
      let tempTopicList : any[]=[];
      tempTopicList = this.topicList;
      this.topicList = [];
      tempTopicList.forEach(element => {
        this.topicList.push({label:element.name,value:element.name});
      });

  })
  this.user = new UserModel();
  this.user.user_name = "Sonu";
  this.user.user_password="sonu@123";
  this.user.user_username="Sonu";
  this.questService.getQuestionByUser(this.user.user_username).subscribe((quest:KiKidderQuestModel[])=>{
    console.log(quest);
    this.displayQuestList = quest;
    console.log(this.displayQuestList);
    for (let header in this.displayQuestList[0]){
        if(header == "txtQuesInfoModel")
        {
            // this.cols.push({field:"Question",header:"Question"});
            this.cols[0] = {field:"question",header:"Question"};

        }else if(header == "ki_kidder_quest_marks")
        {
          // this.cols.push({field:"Marks",header:"Marks"})
          this.cols[1] = {field:"marks",header:"Marks"};

        }else if(header == "ki_kidder_quest_sub")
        {
            // this.cols.push({field:"Subject",header:"Subject"});
            this.cols[2] = {field:"subject",header:"Subject"};

        }else if(header == "ki_kidder_quest_topic")
        {
          this.cols[3]  = {field:"topic",header:"Topic"};
          // this.cols.push({field:"Topic",header:"Topic"})

        }else if(header == "ki_kidder_quest_ans")
        {
          this.cols[4] = {field:"answer",header:"Answer"};
        }
    }

    this.buildDisplayRowData();

  })


  }

  buildDisplayRowData()
  {
    this.displayRowData = [];
      if(this.displayQuestList.length != 0)
      {
       
        this.displayQuestList.forEach(element => {
          let dQuestModel : DisplayQuestModel = new DisplayQuestModel();
  
            dQuestModel.answer = element.ki_kidder_quest_ans;
            dQuestModel.marks = element.ki_kidder_quest_marks;
            dQuestModel.question = element.txtQuesInfoModel.quesTxt;
            dQuestModel.topic = element.ki_kidder_quest_topic;
            dQuestModel.subject  = element.ki_kidder_quest_sub;
            dQuestModel.uniqueCode = element.uniqueCode;
            this.displayRowData.push(dQuestModel);
  
        });
      }

  }

  addNewQues()
  {
      this.displayAddNewQuesDiaglog = true;
  }
  displayFlagChangedOnClose(event)
  {
      this.displayAddNewQuesDiaglog = false;
      this.refreshQuestion();
  }

  onRowDblClick(a,b)
  {
    console.log(a,b);
    for(let p=0;p<this.displayQuestList.length;p++)
    {
        if(this.displayQuestList[p].uniqueCode == b.uniqueCode)
        {
          this.questModel = this.displayQuestList[p];
          this.displayAddNewQuesDiaglog = true;

          break;
        }
    }
  }

  refreshQuestion()
  {
    this.questService.getQuestionByUser(this.user.user_username).subscribe((quest:KiKidderQuestModel[])=>{
      console.log(quest);
      this.displayQuestList = quest;
      console.log(this.displayQuestList);
      for (let header in this.displayQuestList[0]){
          if(header == "txtQuesInfoModel")
          {
              // this.cols.push({field:"Question",header:"Question"});
              this.cols[0] = {field:"question",header:"Question"};
  
          }else if(header == "ki_kidder_quest_marks")
          {
            // this.cols.push({field:"Marks",header:"Marks"})
            this.cols[1] = {field:"marks",header:"Marks"};
  
          }else if(header == "ki_kidder_quest_sub")
          {
              // this.cols.push({field:"Subject",header:"Subject"});
              this.cols[2] = {field:"subject",header:"Subject"};
  
          }else if(header == "ki_kidder_quest_topic")
          {
            this.cols[3]  = {field:"topic",header:"Topic"};
            // this.cols.push({field:"Topic",header:"Topic"})
  
          }else if(header == "ki_kidder_quest_ans")
          {
            this.cols[4] = {field:"answer",header:"Answer"};
          }
      }
  
      this.buildDisplayRowData();
  
    })
  
  }

}
