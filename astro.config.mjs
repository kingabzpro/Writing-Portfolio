import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://abid.work",
  output: "static",
  trailingSlash: "always",
  integrations: [icon()]
});
