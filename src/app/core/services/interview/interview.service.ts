import { Injectable } from '@angular/core';
import { Interview } from '@core/datas/interview-question.data';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  constructor() {}

  public getQuestions(...lists: Interview[][]): string[] | null {
    const filePaths: string[] = [];

    for (const list of lists) {
      if (list.length === 0) {
        console.warn('Empty list passed to picker, skipping.');
        continue;
      }
      const randomIndex = Math.floor(Math.random() * list.length);
      filePaths.push(list[randomIndex].filePath);
    }

    return filePaths;
  }
}
