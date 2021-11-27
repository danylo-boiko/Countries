import { AbstractControl, FormGroup } from "@angular/forms";

export function isFormFieldValid(form: FormGroup, componentName?: string, ruleName?: string): boolean {
    if (!componentName) {
        return form.valid;
    }

    const component: AbstractControl = form.get(componentName)!;

    if (!ruleName) {
        return component.valid || component.untouched;
    }

    return !component.hasError(ruleName) || component.untouched;
}
