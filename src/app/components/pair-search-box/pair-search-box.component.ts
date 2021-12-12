import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { distinctUntilChanged } from "rxjs";
import { ApiService } from "@shared/services";

const validation = (): ValidatorFn  =>
  (control: AbstractControl): ValidationErrors | null => /\//.test(control?.value) ? null:{ wrongPairInput: true };

@Component({
  selector: 'app-pair-search-box',
  templateUrl: './pair-search-box.component.html',
  styleUrls: ['pair-search-box.component.css']

})
export class PairSearchBoxComponent {
  public errorsOutput = {
    wrongPairInput: 'Enter pair type with "/"',
    required: 'You need to enter pair, to get new request'
  };

  public searchForm = new FormGroup({
    search: new FormControl('', [validation()]),
  });

  constructor(private apiService: ApiService) {
    this.searchForm.get('search')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: string) =>
      this.searchForm.get('search')?.patchValue(value?.toUpperCase())
    );
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    if (this.searchForm.valid) {
      const searchControl = this.searchForm.get('search');
      this.apiService.searchPairData(searchControl?.value);
      searchControl?.setValue(null);
      searchControl?.setErrors(null)
      this.searchForm.markAsUntouched();
    }
  }
}
