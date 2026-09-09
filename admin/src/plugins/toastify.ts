import Vue3Toasity, { toast, type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const options = {
  autoClose: 3000,
  theme: toast.THEME.COLORED,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
} as ToastContainerOptions;

export { options, Vue3Toasity };
