import { createApp } from "vue";

import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import "./defineValidators";

import "unfonts.css";
import "./styles/main.scss";
import "./styles/tailwind.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
