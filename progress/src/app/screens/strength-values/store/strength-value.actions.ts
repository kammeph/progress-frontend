import { StrengthValue } from '../strength-value.models';

export class GetAllStrengthValues {
  static readonly type = '[Strength Value] Get All';
}

export class UpdateStrengthValues {
  static readonly type = '[Strength Value] Update';
  constructor(public strengthValues: StrengthValue[]) {}
}
