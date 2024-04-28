import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm{
    static validateAllFormFields(formGroup: FormGroup){
        debugger;
        Object.keys(formGroup.controls).forEach(field=>{
          debugger;
          const control = formGroup.get(field);
          
          if(control instanceof FormControl){
            control.markAsDirty({onlySelf: true});
          }else if(control instanceof FormGroup){
            this.validateAllFormFields(control);
          }
        })
      }
}