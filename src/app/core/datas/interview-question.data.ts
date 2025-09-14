export enum InterviewQuestionType {
  NAME = 'name',
  SELF_INTRO = 'self-intro',
  STRENGTH = 'strength',
  WEAKNESS = 'weakness',
  STRENGTH_WEAKNESS = 'strength_weakness'
}

interface Interview {
  id: number;
  type: InterviewQuestionType;
  filePath: string;
}

const baseNamePath = 'assets/question/name/';
const baseSelfIntroPath = 'assets/question/self-introduction/';
const baseStrengthWeaknessIntroPath = 'assets/question/strength-weakness/';

export const InterviewNameData: Interview[] = [
  {
    id: 1,
    type: InterviewQuestionType.NAME,
    filePath: baseNamePath + 'q_name_1.mp3'
  },
  {
    id: 2,
    type: InterviewQuestionType.NAME,
    filePath: baseNamePath + 'q_name_2.mp3'
  },
  {
    id: 3,
    type: InterviewQuestionType.NAME,
    filePath: baseNamePath + 'q_name_3.mp3'
  }
];

export const InterviewSelfIntroData: Interview[] = [
  {
    id: 1,
    type: InterviewQuestionType.SELF_INTRO,
    filePath: baseSelfIntroPath + 'q_self_introduction_1.mp3'
  }
];

export const InterviewStrengthWeaknessData: Interview[] = [
  {
    id: 1,
    type: InterviewQuestionType.STRENGTH_WEAKNESS,
    filePath: baseStrengthWeaknessIntroPath + 'q_s_and_w_1.mp3'
  }
];
