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

    // selectedSubject: any;
    
    // selectedTopic: any;
    // optionA : any;
    // optionB : any;
    // optionC : any;
    // optionD : any;
    // val1 : any;
    // txtQuestion : string;
    subjectList: any[]=[];
    topicList :any[]=[];
    filteredTopics : any[]=[];
   imageNames : any[]=[];
    user : UserModel;
    myfile : any[]=[];
    isEdit : boolean = false;
    isNewImage : boolean = false;
    imageList : DgrmImageInfoModel[]=[];
    dgrms : any[]=[];
    images = [];
    myForm = new FormGroup({
     file: new FormControl('', null),
     fileSource: new FormControl('', [Validators.required]),
     selectedSubject: new FormControl('', [Validators.required]),
     selectedTopic: new FormControl('', [Validators.required]),
     optionA: new FormControl('', [Validators.required]),
     optionB: new FormControl('', [Validators.required]),
     optionC: new FormControl('', [Validators.required]),
     optionD: new FormControl('', [Validators.required]),
     txtQuestion: new FormControl('', [Validators.required]),
     val1: new FormControl('', [Validators.required]),
   
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
        this.buildFormModel();
      }else{
          this.isEdit = false;
      }
     

    }, 200);
  }
  
  buildFormModel()
  {
      this.isNewImage = false;
      this.isEdit = true;
      this.myForm.controls.txtQuestion.setValue(this.questModel.txtQuesInfoModel.quesTxt);
      this.myForm.controls.optionA.setValue(this.questModel.ki_kidder_quest_optionA);
      this.myForm.controls.optionB.setValue(this.questModel.ki_kidder_quest_optionB);

      this.myForm.controls.optionC.setValue(this.questModel.ki_kidder_quest_optionC);
      this.myForm.controls.optionD.setValue(this.questModel.ki_kidder_quest_optionD);
     
      let selectedSubject : any = {};

      for(let k=0;k<this.subjectList.length;k++)
      {
          if(this.subjectList[k].name == this.questModel.ki_kidder_quest_sub)
          {
              selectedSubject.name = this.subjectList[k].name;
              selectedSubject.code = this.subjectList[k].code;
              selectedSubject.id = this.subjectList[k].id;
              this.myForm.controls.selectedSubject.setValue(selectedSubject);

              break;
          }
      }
      let selectedTopic : any = {};

      for(let k=0;k<this.topicList.length;k++)
      {
          if(this.topicList[k].name == this.questModel.ki_kidder_quest_topic)
          {
              selectedTopic.name = this.topicList[k].name;
              selectedTopic.scode = this.topicList[k].scode;
              selectedTopic.id = this.topicList[k].id;
              this.myForm.controls.selectedTopic.setValue(selectedTopic);
              break;
          }
      }
      this.filteredTopics = this.topicList.filter((topic=> topic.scode == selectedSubject.code));

      if(this.questModel.ki_kidder_quest_optionA == this.questModel.ki_kidder_quest_ans)
      {
          this.myForm.controls.val1.setValue("A");
      }else if(this.questModel.ki_kidder_quest_optionB == this.questModel.ki_kidder_quest_ans)
      {
        this.myForm.controls.val1.setValue("B");
      }else if(this.questModel.ki_kidder_quest_optionC == this.questModel.ki_kidder_quest_ans)
      {
        this.myForm.controls.val1.setValue("C");
      }else if(this.questModel.ki_kidder_quest_optionD == this.questModel.ki_kidder_quest_ans)
      {
        this.myForm.controls.val1.setValue("D");
      }

      this.images = [];
      this.imageList = [];
      
      // this.myForm.controls.file.setValue('/fake/path');
      this.questModel.dgrmImageInfoModels.forEach(element => {
        this.images.push(element.dgrm_img_base64);
        this.imageList.push(element);
        
      });

      this.myForm.controls.fileSource.setValue([this.imageList]);

  }


  onSelectSubject()
  {
   
    if(this.myForm.controls.selectedSubject.value)
    {
      this.filteredTopics = this.topicList.filter((topic=> topic.scode == this.myForm.controls.selectedSubject.value.code));

    }
    console.log(this.topicList)
  }

  onSelectTopic(){
      
  }

  onHideDialog()
  {
      this.display = false;
      this.clearQuestForm();
      this.displayFlagEmitter.emit(this.display);
      // this.questModel = null;
      this.images = [];
  }

  clearQuestForm()
  {
    this.myForm.reset();

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

 

      if(this.isEdit && this.images.length != 0)
      {
          return ;
      }else{

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

    }
    get f(){
      return this.myForm.controls;
    }


    onSave(){

      console.log('FFFFFF',this.myForm.controls)

      if(!this.myForm.valid)
      {
          return;
      }else{


  
       
        let kidderQuestion : KidderQuestionModel = new KidderQuestionModel();
        let question :  KiKidderQuestModel = new KiKidderQuestModel();
        let txtQuestModel : TxtQuesInfoModel = new TxtQuesInfoModel();
        txtQuestModel.quesTxt = this.myForm.controls.txtQuestion.value;
        this.user = new UserModel();
        this.user.user_name = "Sonu";
        this.user.user_password="sonu@123";
        this.user.user_username="Sonu";
        if(this.isEdit)
        {
              txtQuestModel.uniqueCode = this.questModel.txtQuesInfoModel.uniqueCode;
              question.uniqueCode = this.questModel.uniqueCode;
        }
        question.txtQuesInfoModel = txtQuestModel;
        question.userModel = this.user;
  
        if(this.myForm.controls.val1.value == "A")
        {
          question.ki_kidder_quest_ans = this.myForm.controls.optionA.value;
  
        }else if(this.myForm.controls.val1.value == "B")
        {
            question.ki_kidder_quest_ans = this.myForm.controls.optionB.value
        }else if(this.myForm.controls.val1.value == "C")
        {
            question.ki_kidder_quest_ans = this.myForm.controls.optionC.value
        }else if(this.myForm.controls.val1.value == "D")
        {
            question.ki_kidder_quest_ans = this.myForm.controls.optionD.value;
        }
  
        question.ki_kidder_quest_marks = 50;
        question.ki_kidder_quest_name = "dummy";
        question.ki_kidder_quest_optionA = this.myForm.controls.optionA.value;
        question.ki_kidder_quest_optionB = this.myForm.controls.optionB.value;
        question.ki_kidder_quest_optionC = this.myForm.controls.optionC.value;
        question.ki_kidder_quest_optionD = this.myForm.controls.optionD.value;
        question.ki_kidder_quest_level = QuestionLevel.EASY;
        question.ki_kidder_quest_sub = this.myForm.controls.selectedSubject.value.name;
        question.ki_kidder_quest_topic = this.myForm.controls.selectedTopic.value.name;
         this.dgrms = [];

        if(this.isEdit && this.isNewImage)
        {
          let index = 0;
          this.myForm.controls.fileSource.value.forEach(element => {
            let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();

              dgrm.dgrm_img_base64 = element;
              dgrm.dgrm_img_name = this.imageNames[index];
              dgrm.toBeDeleted = false;
              index++;
              this.dgrms.push(dgrm);
          });
  
            this.questModel.dgrmImageInfoModels.forEach(element => {
              let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();
              dgrm.dgrm_img_base64 = element.dgrm_img_base64;
              dgrm.dgrm_img_name = element.dgrm_img_name;
              dgrm.dgrm_img_path = element.dgrm_img_path;
              dgrm.toBeDeleted = true;
              dgrm.uniqueCode = element.uniqueCode;
              dgrm.dgrm_img_id = element.dgrm_img_id;
              this.dgrms.push(dgrm);
            });
        }else if(this.isEdit && !this.isNewImage)
        {
 
          this.questModel.dgrmImageInfoModels.forEach(element => {
            let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();

            dgrm.dgrm_img_base64 = element.dgrm_img_base64;
            dgrm.dgrm_img_name = element.dgrm_img_name;
            dgrm.dgrm_img_path = element.dgrm_img_path;
            dgrm.toBeDeleted = false;
            dgrm.uniqueCode = element.uniqueCode;
            dgrm.dgrm_img_id = element.dgrm_img_id;
            this.dgrms.push(dgrm);
          });
        }else if(this.isEdit == false)
        {
          let index = 0;
          this.myForm.controls.fileSource.value.forEach(element => {
            let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();

              dgrm.dgrm_img_base64 = element;
              dgrm.dgrm_img_name = this.imageNames[index];
              dgrm.toBeDeleted = false;
              index++;
              this.dgrms.push(dgrm);
          });
        }
        question.dgrmImageInfoModels = this.dgrms;

        this.questService.saveQuestion(question).subscribe((res : KiKidderQuestModel)=>{
            console.log(res);
            this.isNewImage = false;
            this.clearFormExceptSubjectAndTopic();
            this.displayFlagEmitter.emit(false)
            
        })
      }

      
    }

    deleteImage(url)
    {
        this.isNewImage = true;
        let index = this.images.indexOf(url);
        this.images.splice(index,1);
      
    }

   get isDisable()
    {
        if(this.images.length != 0 && this.isEdit)
        {
          return true;
        }else if(this.images.length == 0 && this.isEdit){
          return false
        }
    }
    deleteImages()
    {
      this.imageNames = [];
      this.isNewImage = true;
        this.myForm.controls.file.reset();
        this.myForm.controls.fileSource.reset();
        this.images = [];
    }

    clearFormExceptSubjectAndTopic()
    {
      this.myForm.controls.txtQuestion.reset();
      this.myForm.controls.optionA.reset();
      this.myForm.controls.optionB.setValue(null);
      this.myForm.controls.optionA.reset();
      this.myForm.controls.optionC.reset();
      this.myForm.controls.optionD.reset();
      this.myForm.controls.val1.reset();
      this.myForm.controls.file.reset();
  

      this.myForm.controls.fileSource.reset();


      this.images = [];

    }

}
