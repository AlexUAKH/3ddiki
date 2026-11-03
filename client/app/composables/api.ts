export const useAsyncApi = createUseFetch(() => {
  const config = useRuntimeConfig();

  return {
    baseURL: config.public.apiBase,
  };
});

// Чтобы фронтенд, работающий на куках, мог успешно авторизоваться на бэкенде, вам нужно явно передавать параметр credentials: 'include'.
// Чтобы не прописывать это в каждом запросе, лучше всего создать кастомный плагин или composable, который автоматически настроит $fetch для всего приложения.

// 🛠 Как настроить $fetch и useFetch в Nuxt 3

// Создайте файл composables/useApi.ts (или обновите существующий API-клиент):
// typescript
// export const useApiFetch: typeof useFetch = (url, options = {}) => {
//   const config = useRuntimeConfig()

//   return useFetch(url, {
//     // Базовый URL бэкенда (лучше брать из runtimeConfig)
//     baseURL: config.public.apiBase || 'http://localhost:8001',

//     // 👇 Самый важный параметр для поддоменов и кук!
//     credentials: 'include',

//     ...options,
//   })
// }

// export const $apiFetch = $fetch.create({
//   baseURL: 'http://localhost:8001',

//   // 👇 Включаем отправку кук для обычных вызовов $fetch
//   credentials: 'include',
// })
// Используйте код с осторожностью.

// 📝 Как это использовать в компонентах:

// Вариант 1: С реактивным получением данных (useFetch)
// vue
// <script setup>
// // Используем наш кастомный composable вместо стандартного useFetch
// const { data: products, error } = await useApiFetch('/api/products')
// </script>
// Используйте код с осторожностью.
// Вариант 2: Для отправки форм или действий по клику ($fetch)
// vue
// <script setup>
// const createProduct = async () => {
//   try {
//     await $apiFetch('/api/products', {
//       method: 'POST',
//       body: { name: 'New Product', price: 100 }
//     })
//   } catch (err) {
//     console.error(err)
//   }
// }
// </script>
// Используйте код с осторожностью.

// 🔥 Подводный камень с SSR (Server-Side Rendering) в Nuxt

// Когда Nuxt делает запрос useFetch на этапе серверного рендеринга (SSR), он выполняет его с сервера Nuxt на сервер NestJS. В этот момент браузерных кук еще нет в объекте запроса.
// Если ваш бэкенд должен отдавать приватные данные уже на этапе SSR, вам нужно перехватить куки от клиента и вручную пробросить их на бэкенд. В Nuxt 3 это делается прямо в настройках useFetch:
// typescript
// // Внутри вашего composables/useApi.ts добавьте onRequest:
// export const useApiFetch: typeof useFetch = (url, options = {}) => {
//   const config = useRuntimeConfig()
//   const headers = useRequestHeaders(['cookie']) // Захватываем куки клиента при SSR

//   return useFetch(url, {
//     baseURL: config.public.apiBase || 'http://localhost:8001',
//     credentials: 'include',
//     headers: {
//       ...headers, // Пробрасываем куки на бэкенд во время серверного рендеринга
//       ...options.headers,
//     },
//     ...options,
//   })
// }
// Используйте код с осторожностью.
// теперь ваша связка Nuxt ($fetch) + NestJS (enableCors) полностью защищена от CORS-ошибок и готова к работе как на localhost, так и на разных поддоменах продакшена!
// Если вы хотите убедиться, что всё настроено без ошибок, вы можете запустить оба проекта и проверить, пропала ли ошибка CORS при первом запросе. Нужна ли помощь с правильной настройкой кук (cookie options) на стороне NestJS, чтобы они не терялись между поддоменами?
