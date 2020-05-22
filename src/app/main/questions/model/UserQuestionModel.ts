import { QuizModel } from '../../quizes/model/QuizModel'
import { UserModel } from '../../users/model/UserModel'
import { TxtQuesInfoModel } from './TxtQuesInfoModel'
import { ImageInfoModel } from './ImageInfoModel'

export class UserQuestionModel{
      user_quest_id : number;
	  user_quest_name : string;
	  user_quest_marks: number;
	  user_quest_optionA: string
	  user_quest_optionB: string
	  user_quest_optionC: string
	  user_quest_optionD: string
	  user_quest_ans: string
	  quizModel: QuizModel;
	  userModel: UserModel
	  imageInfoModel: ImageInfoModel
	  txtQuesInfoModel: TxtQuesInfoModel
}