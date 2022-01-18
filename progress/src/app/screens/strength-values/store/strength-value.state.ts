import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { StrengthValueService } from "../services/strength-value.service";
import { StrengthValue } from "../strength-value.models";
import { GetAllStrengthValues, UpdateStrengthValues } from "./strength-value.actions";

export class StrengthValueStateModel {
    strengthValues: StrengthValue[];
}

@State<StrengthValueStateModel>({
    name: 'strengthvalue',
    defaults: new StrengthValueStateModel()
})
@Injectable()
export class StrengthValueState implements NgxsOnInit {
    
    constructor(private strengthValueService: StrengthValueService) { }
    
    ngxsOnInit(ctx?: StateContext<StrengthValueStateModel>) { }

    @Selector()
    static strengthValues(state: StrengthValueStateModel) {
        return state.strengthValues;
    }
    
    @Action(GetAllStrengthValues)
    getAllStrengthValues({ patchState }: StateContext<StrengthValueStateModel>) {
        return this.strengthValueService.getAll().pipe(
            tap(strengthValues => patchState({
                strengthValues: strengthValues
            }))
        )
    }

    @Action(UpdateStrengthValues)
    updateStrengthValues({patchState}: StateContext<StrengthValueStateModel>, {strengthValues}: UpdateStrengthValues) {
        return this.strengthValueService.update(strengthValues).pipe(
            tap(result => patchState({
                strengthValues: result
            }))
        )
    }
}