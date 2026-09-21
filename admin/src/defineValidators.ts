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

defineRule("required", (value: string) => {
  if (!value || !value.length) {
    return "validation.required";
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
