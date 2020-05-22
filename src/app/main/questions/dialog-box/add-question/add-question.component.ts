import { Component, OnInit, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KidderQuestionModel } from '../../model/KidderQuestionModel';
import { UserQuestionModel } from '../../model/UserQuestionModel';
import { TxtQuesInfoModel } from '../../model/TxtQuesInfoModel';
import { UserModel } from 'src/app/main/users/model/UserModel';
import { DgrmImageInfoModel } from '../../model/DgrmImageInfoModel';
import { QuestionService } from '../../question.service';
import { KiKidderQuestModel } from '../../model/KiKidderQuestModel';
import { QuestionLevel } from 'src/app/main/Constant/QuestionLevel';
import { GeneralSubject } from 'src/app/main/Constant/DummyData';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit,OnChanges {

  @Input() display : boolean;
  @Input("questModel") questModel : KiKidderQuestModel;
  @Output() displayFlagEmitter : EventEmitter<boolean> = new EventEmitter();
  text: string;
  cities1: SelectItem[];
  uploadedFiles: any[] = [];

    cities2: any[];

    selectedSubject: any;
    
    selectedTopic: any;
    optionA : any;
    optionB : any;
    optionC : any;
    optionD : any;
    val1 : any;
    txtQuestion : string;
    subjectList: any[]=[];
    topicList :any[]=[];
    filteredTopics : any[]=[];
   imageNames : any[]=[];
    user : UserModel;
    myfile : any[]=[];
    isEdit : boolean = false;
    imageList : DgrmImageInfoModel[]=[];
    dgrms : any[]=[];
    images = [];
    myForm = new FormGroup({
     file: new FormControl('', [Validators.required]),
     fileSource: new FormControl('', [Validators.required])
   });
  constructor(public level : QuestionLevel, private questService : QuestionService) { }

  ngOnInit(): void {
 

    console.log('############',this.questModel,this.display)
    this.subjectList = GeneralSubject.subject;
    this.topicList = GeneralSubject.Topics;
    

    
    
  }

  ngOnChanges()
  {
    setTimeout(() => {
      if(this.display && this.questModel != null)
      {
        this.updateEditQuestModel();
      }else{
          this.isEdit = false;
      }
     

    }, 200);
  }
  
  updateEditQuestModel()
  {
      this.isEdit = true;
      this.txtQuestion = this.questModel.txtQuesInfoModel.quesTxt;
      this.optionA = this.questModel.ki_kidder_quest_optionA;
      this.optionB = this.questModel.ki_kidder_quest_optionB;
      this.optionC = this.questModel.ki_kidder_quest_optionC;
      this.optionD = this.questModel.ki_kidder_quest_optionD;
     
      this.selectedSubject = {};

      for(let k=0;k<this.subjectList.length;k++)
      {
          if(this.subjectList[k].name == this.questModel.ki_kidder_quest_sub)
          {
              this.selectedSubject.name = this.subjectList[k].name;
              this.selectedSubject.code = this.subjectList[k].code;
              this.selectedSubject.id = this.subjectList[k].id;
              break;
          }
      }
      this.selectedTopic = {};

      for(let k=0;k<this.topicList.length;k++)
      {
          if(this.topicList[k].name == this.questModel.ki_kidder_quest_topic)
          {
              this.selectedTopic.name = this.topicList[k].name;
              this.selectedTopic.scode = this.topicList[k].scode;
              this.selectedTopic.id = this.topicList[k].id;

              break;
          }
      }
      this.filteredTopics = this.topicList.filter((topic=> topic.scode == this.selectedSubject.code));

      if(this.questModel.ki_kidder_quest_optionA == this.questModel.ki_kidder_quest_ans)
      {
          this.val1 = "A";
      }else if(this.questModel.ki_kidder_quest_optionB == this.questModel.ki_kidder_quest_ans)
      {
          this.val1 = "B";
      }else if(this.questModel.ki_kidder_quest_optionC == this.questModel.ki_kidder_quest_ans)
      {
          this.val1 = "C";
      }else if(this.questModel.ki_kidder_quest_optionD == this.questModel.ki_kidder_quest_ans)
      {
          this.val1 = "D";
      }

      this.images = [];
      this.imageList = [];
      this.questModel.dgrmImageInfoModels.forEach(element => {
        this.images.push(element.dgrm_img_base64);
        this.imageList.push(element);
        this.myForm.controls.fileSource.value.push(element.dgrm_img_base64);
        this.myForm.setValidators(Validators.required);
        
      });


  }


  onSelectSubject()
  {
    console.log(this.selectedSubject)
    if(this.selectedSubject)
    {
      this.filteredTopics = this.topicList.filter((topic=> topic.scode == this.selectedSubject.code));

    }
    console.log(this.topicList)
  }

  onSelectTopic(){
      console.log(this.selectedTopic);
  }

  onHideDialog()
  {
      this.display = false;
      this.clearQuestForm();
      this.displayFlagEmitter.emit(this.display);
  }

  clearQuestForm()
  {
    this.selectedSubject = null;
    this.selectedTopic = null;
    this.txtQuestion = null;
    this.optionA = null;
    this.optionB = null;
    this.optionC = null;
    this.optionD = null;
    this.selectedSubject = null;
    this.selectedTopic = null;
    this.images = [];

  }

  // upload(event){
  //   console.log(event);
  // }


  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

}

    onFileChange(event) {
      if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
                  var reader = new FileReader();
                  reader.onload = (event:any) => {
                    console.log(event.target.result);
                     this.images.push(event.target.result); 
                     this.myForm.patchValue({
                        fileSource: this.images
                     });
                  }
    
              reader.readAsDataURL(event.target.files[i]);
              this.imageNames.push(event.target.files[i].name);
         
          }
      }
    }
    get f(){
      return this.myForm.controls;
    }


    onSave(){
      if(!this.txtQuestion)
      {
          return;
      }
      let kidderQuestion : KidderQuestionModel = new KidderQuestionModel();
      let question :  KiKidderQuestModel = new KiKidderQuestModel();
      let txt : TxtQuesInfoModel = new TxtQuesInfoModel();
      txt.quesTxt = this.txtQuestion;
      this.user = new UserModel();
      this.user.user_name = "Sonu";
      this.user.user_password="sonu@123";
      this.user.user_username="Sonu";
      question.txtQuesInfoModel = txt;
      question.userModel = this.user;

      if(this.val1 == "A")
      {
        question.ki_kidder_quest_ans = this.optionA;

      }else if(this.val1 == "B")
      {
          question.ki_kidder_quest_ans = this.optionB
      }else if(this.val1 == "C")
      {
          question.ki_kidder_quest_ans = this.optionC
      }else if(this.val1 == "D")
      {
          question.ki_kidder_quest_ans = this.optionD;
      }

      question.ki_kidder_quest_marks = 50;
      question.ki_kidder_quest_name = "dummy";
      question.ki_kidder_quest_optionA = this.optionA;
      question.ki_kidder_quest_optionB = this.optionB;
      question.ki_kidder_quest_optionC = this.optionC;
      question.ki_kidder_quest_optionD = this.optionD;
      question.ki_kidder_quest_level = QuestionLevel.EASY;
      question.ki_kidder_quest_sub = this.selectedSubject.name;
      question.ki_kidder_quest_topic = this.selectedTopic.name;
       let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();
       this.dgrms = [];
      if(this.myForm.valid)
      {
        let index = 0;
        this.myForm.controls.fileSource.value.forEach(element => {
            dgrm.dgrm_img_base64 = element;
            dgrm.dgrm_img_name = this.imageNames[index];
            index++;
            this.dgrms.push(dgrm);
        });
      }

      question.dgrmImageInfoModels = this.dgrms;

      if(this.isEdit)
      {
        this.dgrms = [];
          question.dgrmImageInfoModels.forEach(element => {
            let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();

            dgrm.dgrm_img_base64 = element.dgrm_img_base64;
            dgrm.dgrm_img_name = element.dgrm_img_name;
            dgrm.dgrm_img_path = element.dgrm_img_path;
            dgrm.toBeDeleted = false;
            dgrm.dgrm_img_id = element.dgrm_img_id;
            this.dgrms.push(dgrm);
          });

          this.questModel.dgrmImageInfoModels.forEach(element => {
            let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();

            dgrm.dgrm_img_base64 = element.dgrm_img_base64;
            dgrm.dgrm_img_name = element.dgrm_img_name;
            dgrm.dgrm_img_path = element.dgrm_img_path;
            dgrm.toBeDeleted = true;
            dgrm.dgrm_img_id = element.dgrm_img_id;
            this.dgrms.push(dgrm);
          });
      }

     
      this.questService.saveQuestion(question).subscribe((res : KiKidderQuestModel)=>{
          console.log(res);
      })
      
    }

    deleteImage(url)
    {
        let index = this.images.indexOf(url);
        this.images.splice(index,1);
        if(this.images.length == 0)
        {
            this.myForm.controls.fileSource.value.push([]);
        }
    }

}
