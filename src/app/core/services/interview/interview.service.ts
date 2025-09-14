import { Injectable } from '@angular/core';
import { AllQuestionData, Interview } from '@core/datas/interview-question.data';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  constructor() {}

  public getQuestions(...lists: Interview[][]): Interview[] {
    const selectedQuestions: Interview[] = [];

    for (const list of lists) {
      if (list.length === 0) {
        console.warn('Empty list passed to picker, skipping.');
        continue;
      }

      const randomIndex = Math.floor(Math.random() * list.length);
      selectedQuestions.push(list[randomIndex]);
    }

    return selectedQuestions;
  }

  public getRandomQuestion(): Interview | null {
    const combinedList: Interview[] = AllQuestionData;

    if (combinedList.length === 0) {
      console.warn('All lists are empty — no question to pick.');
      return null;
    }

    const randomIndex = Math.floor(Math.random() * combinedList.length);
    return combinedList[randomIndex];
  }
}
