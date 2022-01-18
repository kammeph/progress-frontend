import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'progress-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() labelText: string;
  @Input() errorText: string;
  @Input() unit: string;
  @Input() type = 'text';

  constructor() { }

  ngOnInit(): void {
  }

}
