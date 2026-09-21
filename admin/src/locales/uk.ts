import type { MessageSchema } from ".";

export default {
  common: {
    nameObj: "Назва",
    name: "Ім'я",
    create: "Створення",
    edit: "Редагування",
    delete: "Видалити",
    action: "Дія | Дії",
    noData: "Немає даних",
  },
  sideBar: {
    dashboard: "Статистіка",
    customers: "Клієнти",
    filaments: "Філаменти",
    products: "Продукти",
    settings: "Налаштування",
    productCategories: "Категорії продуктів",
    filamentTypes: "Типи філаментів",
    filamentBrands: "Бренди філаментів",
    filamentColors: "Кольори філаментів",
  },
  header: {
    userProfile: "Профіль користувача",
    logout: "Вийти",
  },
  userProfile: {
    header: "Профіль користувача",
  },
  dashboard: {
    header: "Статистіка",
  },
  customers: {
    header: "Клієнти",
  },
  filaments: {
    header: "Філаменти",
  },
  products: {
    header: "Продукти",
  },
  filamentTypes: {
    header: "Типи філаментів",
    typeWasUpdatedSuccessfully: "Type was updated successfully",
    newTypeCreated: `New type created`,
    filamentType: "тип нитки | типу нитки",
  },
  filamentBrands: {
    header: "Бренди філаментів",
  },
  filamentColors: { header: "Кольори філаментів" },
  productCategories: { header: "Категорії продуктів" },
  404: {
    goToHomePage: "Перейти на головну сторінку",
    pageNotFound: "Сторінку не знайдено",
  },
  validation: {
    mustBeMinimum: "Це поле має містити щонайменше {limit} символів",
    required: "Це поле є обов'язковим",
    email: "Невірна електронною адреса",
    phone: "Невірний номер телефону ",
    passwordMatch: "Паролі мають збігатися",
  },
} as MessageSchema;
