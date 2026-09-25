import type { MessageSchema } from "./types";

export default {
  common: {
    cancel: "Скасувати",
    ok: "ok",
    register: "Реєстрація",
    save: "Зберігти",
  },
  footer: {
    allRights: "Всі права захищено, розроблено ",
  },
  login: {
    login: "Вхід",
    sent: "Увійти",
    forgotPassword: "Забули пароль",
    logout: "Вийти",
    notRegistered: "Ще немає акаунту",
    register: "Зареєструватися",
    confirmPassword: "Повторіть пароль",
  },
  user: {
    profile: "Особисті дані",
    order: "Замовлення",
    wishList: "Обране",
    email: "Пошта",
    name: "Ім'я",
    surname: "Прізвище",
    phone: "Телефон",
    password: "Пароль",
    city: "Місто",
  },
  products: {
    menu: "Каталог",
  },
  validation: {
    validEmail: "Невірна електронна адреса",
    phoneInvalid: "Невірний номер телефону",
    fieldRequired: "Це поле є обов'язковим",
    min: "Це поле має містити щонайменше {limit} символів",
  },
  delivery: {
    header: "Оплата і доставка",
    payment: "Payment",
    delivery: "Delivery",
  },
  contacts: {
    header: "Контакти",
  },
  reviews: {
    header: "Відгуки",
  },
} as MessageSchema;
