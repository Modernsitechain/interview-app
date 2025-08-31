import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public form = input<FormGroup>();
  public formSubmit = output();

  public onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.form()?.markAllAsTouched();
    this.formSubmit.emit();
  }
}
