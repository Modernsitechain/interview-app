import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import {
  Interview,
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
  public interviewQuestions = signal<Interview[] | undefined>(undefined);

  public questionIdx = signal<number>(0);

  public lastQuestion = computed<boolean>(() => {
    if (!this.interviewQuestions()) return false;
    if (this.questionIdx() >= this.interviewQuestions()!.length) return true;

    return false;
  });

  public currentAudio = computed<string | null>(() => {
    if (!this.interviewQuestions()) return null;
    else return this.interviewQuestions()![this.questionIdx() - 1].filePath;
  });

  constructor() {
    effect(() => {
      const path = this.currentAudio();
      if (path) {
        this.stopAudio();
        this.playAudio(path);
      } else {
        this.stopAudio();
      }
    });
  }

  public getQuestion() {
    const question = this.interviewService.getRandomQuestion();

    if (!question) return;
    this.stopAudio();
    this.playAudio(question.filePath);
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

  private playAudio(path: string): void {
    this.audio.src = path;
    this.audio.load();
    this.audio.play().catch((err) => console.error('Audio play failed', err));
  }

  private stopAudio(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
