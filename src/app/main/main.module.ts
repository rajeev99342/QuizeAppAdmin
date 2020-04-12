import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { UsersComponent } from './users/users.component';
import { ClassComponent } from './class/class.component';
import { SubjectComponent } from './subject/subject.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuestionsComponent } from './questions/questions.component';
import { SchoolsComponent } from './schools/schools.component';
import {TableModule} from 'primeng/table';
import { UserServiceService } from './users/services/user-service.service';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import { QuizesComponent } from './quizes/quizes.component';
import { AnalysisComponent } from './analysis/analysis.component';
import {ChartModule} from 'primeng/chart';
import { PurchaserComponent } from './purchaser/purchaser.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        QuestionsComponent,
        UsersComponent,
        ClassComponent,
        SubjectComponent,
        SchoolsComponent,
        QuizesComponent,
        AnalysisComponent,
        PurchaserComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      TableModule,
      ButtonModule,
      ChartModule,
      DropdownModule,
      FormsModule
      
    ],
    exports:[
        QuestionsComponent,
        SchoolsComponent,
        QuizesComponent,
        UsersComponent,
        SubjectComponent,
        ClassComponent,
        TableModule,
        ChartModule,
        HttpClientModule,
        DropdownModule,
        ButtonModule,
        FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    providers: [UserServiceService],
    bootstrap: []
  })
  export class MainModule { }