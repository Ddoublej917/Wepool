import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.css']
})
//Individual questions loaded into component and stores current input
export class QuestionComponent implements OnInit {

  @Input() question : string;
  @Input() type : string;
  @Output() input : string;
  @ViewChild('inputText') inputText: HTMLInputElement;
  @Output() newItemEvent = new EventEmitter<string>();

  companys = [
    {value: 'UF'},
    {value: 'UFPD'},
    {value: 'McDonalds'},
  ];
  value;
  @ViewChild('search' , {static: false}) search;

  constructor() { 
  }

  //Initiates value according to type
  ngOnInit(): void {
    if (this.type=="checkbox") {
      this.updateItem(false);
    } else if (this.type=="slider") {
      this.updateItem("1");
    } else if (this.type=="textbox") {
      this.updateItem("");
    } else if (this.type=="address") {
      this.updateItem("");
    } else if (this.type=="company") {
      this.updateItem("");
    } else {
      this.updateItem("Empty");
    }
  }

  //Updates value in parent component
  updateItem(value: any) {
    this.newItemEvent.emit(value);
  }
  
  //Following update the input value in this class whenever a change is made on the page
  updateElement(event) {
    this.input = event.value;
    this.updateItem(this.input);
  }

  updateCheckbox(event) {
    this.input = event.checked;
    this.updateItem(this.input);
  }

  updateInput() {
    this.input = this.inputText.toString();
    this.updateItem(this.input);
  }

  updateCompany(event) {
    this.input = event.value;
    this.updateItem(this.input);
  }

  updateAddress(event) {
    this.updateItem(event.name);
  }


}
