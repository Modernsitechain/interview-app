import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import {
  InterviewNameData,
  InterviewSelfIntroData,
  InterviewStrengthWeaknessData
} from '@core/datas/interview-question.data';
import { InterviewService } from '@core/services';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [ButtonDirective, IconComponent],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewComponent {
  private audio = new Audio();
  private readonly interviewService = inject(InterviewService);

  public interviewStarted = signal<boolean>(false);
  public readonly interviewQuestions = signal<string[] | undefined>(undefined);

  public questionIdx = signal<number>(0);

  public lastQuestion = computed<boolean>(() => {
    if (!this.interviewQuestions()) return false;
    if (this.questionIdx() >= this.interviewQuestions()!.length) return true;

    return false;
  });

  public currentAudio = computed<string | null>(() => {
    if (!this.interviewQuestions()) return null;
    else return this.interviewQuestions()![this.questionIdx() - 1];
  });

  constructor() {
    effect(() => {
      const path = this.currentAudio();
      if (path) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.src = path;
        this.audio.load();
        this.audio.play().catch(err => console.error('Audio play failed', err));
      }
    });
  }

  public getInterviewQuestion() {
    const question = this.interviewService.getQuestions(
      InterviewNameData,
      InterviewSelfIntroData,
      InterviewStrengthWeaknessData
    );

    console.log(question);
  }

  public startInterview(): void {
    const question = this.interviewService.getQuestions(
      InterviewNameData,
      InterviewSelfIntroData,
      InterviewStrengthWeaknessData
    );

    if (!question) return;

    this.interviewQuestions.set(question);
    this.interviewStarted.set(true);

    this.questionIdx.update((v) => v + 1);
  }

  public nextQuestion(): void {
    this.questionIdx.update((v) => v + 1);
  }

  public finishInterview(): void {
    this.interviewStarted.set(false);
    this.interviewQuestions.set(undefined);

    this.questionIdx.set(0);
  }
}
