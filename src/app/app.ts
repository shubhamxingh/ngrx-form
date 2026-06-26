import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormState } from './form/form.reducer';
import { Store } from '@ngrx/store';
import { formFeature } from './form/form.feature';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { resetForm, updateFormField } from './form/form.actions';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  form$: Observable<FormState>;

  form: FormGroup

  constructor(private formStore: Store,
              private fb: FormBuilder
  ) {
    this.form$ = formStore.select(formFeature.selectFormState);
    
    this.form = fb.group({
      name: ['', Validators.minLength(3)],
      email: ['', Validators.email],
    });
  }

  ngOnInit() {}

  updateFormField( field: 'name' | 'email', value: string ){
    this.formStore.dispatch(updateFormField({ field, value }));
  }

  resetForm(){
    this.formStore.dispatch(resetForm())
  }
}
