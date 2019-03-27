import { Component, OnInit } from '@angular/core';
import {
  DataService,
  DataBox
} from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
checkboxes: DataBox[] = [];
  checkedBoxs: string[] = [];
  checkForm: FormGroup;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.checkboxes = this.data.fnGetData();
    this.checkForm = new FormGroup({
      'cbox': new FormControl(null)
    })
  }
  fnOnGetChecked() {
    this.checkedBoxs = this.checkboxes
      .filter(
        i => i.checked == true
      )
      .map(
        i => i.name
      )
  }
}