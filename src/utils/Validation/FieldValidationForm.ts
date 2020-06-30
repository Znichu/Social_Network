export type FieldValidatorForm = (value: string) => string | undefined
export const maxLength = (max: number): FieldValidatorForm =>
    (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const required: FieldValidatorForm = (value) => value ? undefined : 'Required';

