import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './main/users/users.component';
import { ClassComponent } from './main/class/class.component';
import { SubjectComponent } from './main/subject/subject.component';
import { QuestionsComponent } from './main/questions/questions.component';
import { QuizesComponent } from './main/quizes/quizes.component';
import { AnalysisComponent } from './main/analysis/analysis.component';
import { PurchaserComponent } from './main/purchaser/purchaser.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'Home/Analysis',
    pathMatch:'full'
  },
  {
    path:'Home/Users',
    component:UsersComponent
  },
  {
    path:'Home/Classes',
    component:ClassComponent
  },
  {
    path:'Home/Subjects',
    component:SubjectComponent
  },
  {
    path:'Home/Questions',
    component:QuestionsComponent
  },
  {
    path:'Home/Quize',
    component : QuizesComponent
  },
  {
    path:'Home/Analysis',
    component:AnalysisComponent
  },
  {
    path:'Home/Purchaser',
    component:PurchaserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
