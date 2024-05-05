// import "primeflex/primeflex.css";
import "./assets/scss/main.scss";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// CONFIG
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Icon from "@/components/global/Icon.vue";
import Link from "@/components/global/navigation/Link.vue";
import Logo from "@/components/global/Logo.vue";

import { createToast } from "@/utils/createToast";

const app = createApp(App);

app.use(createPinia());
app.use(router);

/* GLOBAL COMPONENT */
app.component("Icon", Icon);
app.component("Link", Link);
app.component("Logo", Logo);

/* GLOBAL METHOD */
app.config.globalProperties.$createToast = createToast;

app.mount("#app");
