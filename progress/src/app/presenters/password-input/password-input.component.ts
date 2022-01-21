import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'progress-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() labelText: string;
  @Input() errorText: string;
  hide = true;

  constructor() {}

  ngOnInit(): void {}
}
