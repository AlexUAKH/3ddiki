import { defineRule } from "vee-validate";

defineRule("confirmed", (value: string, [target]: any) => {
  if (value === target) {
    return true;
  }
  return "validation.passwordMatch";
});

defineRule("require_if_not", (value: string, [target]: any) => {
  if (Boolean(target || value))
    if (value === target) {
      return true;
    }
  return "validation.passwordMatch";
});

defineRule("min", (value: string, [limit]: any) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return "validation.mustBeMinimum";
  }
  return true;
});

defineRule("max", (value: string, [limit]: any) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length > limit) {
    return "validation.mustBeMaximum";
  }
  return true;
});

defineRule("required", (value: string) => {
  if (!value || !value.toString().length) {
    return "validation.required";
  }
  return true;
});

defineRule("one", (value: string[]) => {
  if (!value || !value.length) {
    return "validation.required";
  }
  if (!value.some((v) => !!v)) {
    return "validation.requiredOne";
  }
  return true;
});

defineRule("email", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }
  // Check if email
  if (!/\S+@\S+\.\S+/.test(value)) {
    return "validation.email";
  }
  return true;
});

defineRule("phone", (value: string) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }
  // Check if phone number
  if (!/[+][(][0-9]{1,4}[)][0-9]{8,13}$/g.test(value)) {
    return "validation.phone";
  }
  return true;
});

defineRule("number", (value: string | number) => {
  // Field is 0, should pass
  // if (!value || value === 0 || !value.toString().length) {
  if (value == 0) {
    return true;
  }
  if (!value || !value.toString().length) {
    return "validation.required555";
  }
  // Check if is number
  if (!/^\d+$/g.test(value.toString())) {
    return "validation.number";
  }
  return true;
});
defineRule("float", (value: string | number) => {
  // Field is 0, should pass
  if (value == 0) {
    return true;
  }
  if (!value || !value.toString().length) {
    return "validation.required";
  }
  // Check if is number
  if (!/[+-]?([0-9]*[.])?[0-9]+/g.test(value.toString())) {
    return "validation.float";
  }
  return true;
});
defineRule("not_zero", (value: number) => {
  // Field is empty, should pass
  if (!value && value != 0) {
    return true;
  }
  // Check if is 0
  if (value == 0) {
    return "validation.notZero";
  }
  return true;
});
