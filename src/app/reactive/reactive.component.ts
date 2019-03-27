import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { DataBox, DataService } from '../data.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  reactForm: FormGroup;
  checkboxes: DataBox[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.checkboxes = this.dataService.fnGetData();
    const controls = this.checkboxes
      .map(c => new FormControl(false));
    controls[0].setValue(true);
    this.reactForm = new FormGroup({
      'skills': new FormArray(controls, this.fnMinimumSelected(1))
    })
  }

  fnOnSubmit() { 
    console.log(this.reactForm);
    const selectedBox = this.reactForm.value.skills
      .map((v, i) => v ? this.checkboxes[i].name : null)
      .filter(v => v !== null)
    console.log(selectedBox);
  }
  get controlls() {
   return (<FormArray>this.reactForm.get('skills')).controls;
  }  
  
  fnMinimumSelected(min: number = 1) {
    const validator: ValidatorFn = ( formArray: FormArray ) => {  
      //or
      // const totalSelected = formArray.controls 
      const totalSelected = formArray.value
      .map(control => {
        console.log("Inside map", control);
        return control;
      })
      // .reduce((prev, next) => next ? prev + next : prev,0)
      .reduce((prev, next) => {
        console.log("Inside reduce",next,prev);
        return next ? prev + next : prev;
      },0)
      console.log("Total = ", totalSelected)
      return totalSelected >= min ? null :  {required : true} ;
    }
    return validator;
  }

}