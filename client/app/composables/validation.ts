export const useValidation = () => {
  const { t } = useI18n();

  const mail = (value: string) => {
    if (!value || !value.length) {
      return true;
    }
    // Check if email
    if (!/\S+@\S+\.\S+/.test(value)) {
      return t("validation.validEmail");
    }
    return true;
  };

  const phone = (value: string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }
    // Check if phone number
    // if (!/[+][(][0-9]{1,4}[)][0-9]{8,13}$/g.test(value)) {
    if (!/[380][0-9]{9}$/g.test(value)) {
      return t("validation.phoneInvalid");
    }
    return true;
  };

  const required = (value: string) => {
    if (!value || !value.length) {
      return t("validation.fieldRequired");
    }
    return true;
  };

  const min = (value: string, [limit]: any) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return t("validation.min", limit);
    }
    return true;
  };

  return {
    mail,
    phone,
    min,
    required,
  };
};
