import { UserModel } from '../../users/model/UserModel';
import { TxtQuesInfoModel } from './TxtQuesInfoModel';
import { DgrmImageInfoModel } from './DgrmImageInfoModel';

export class KiKidderQuestModel{

    ki_kidder_quest_id : number;

	 ki_kidder_quest_name : string;
	
	 ki_kidder_quest_optionA : string;
	
	 ki_kidder_quest_optionB : string;
	
	 ki_kidder_quest_optionC : string;
	
	 ki_kidder_quest_optionD : string;
	
	 ki_kidder_quest_level : number;
	
	 ki_kidder_quest_ans : string;
	ki_kidder_quest_sub  : string;
	uniqueCode : string;
	
	 ki_kidder_quest_topic  : string;
	ki_kidder_quest_marks : number;

	 userModel : UserModel ;

	 txtQuesInfoModel : TxtQuesInfoModel;

	 dgrmImageInfoModels : Array<DgrmImageInfoModel>;
}