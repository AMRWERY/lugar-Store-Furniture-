import { ar, en } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import {
  createAutoAnimatePlugin,
  createAutoHeightTextareaPlugin,
  createFloatingLabelsPlugin,
  createMultiStepPlugin,
  createLocalStoragePlugin,
} from "@formkit/addons";
import { barcode } from "@formkit/barcode";
import "@formkit/themes/genesis";
import "@formkit/barcode/genesis";
import "@formkit/addons/css/floatingLabels";
import "@formkit/addons/css/multistep";

export default defineFormKitConfig(() => {
  return {
    locales: { ar, en },
    locale: "ar",
    theme: "genesis",
    plugins: [
      createAutoAnimatePlugin(),
      createAutoHeightTextareaPlugin(),
      createFloatingLabelsPlugin({
        useAsDefault: true,
      }),
      createMultiStepPlugin(),
      createLocalStoragePlugin({
        prefix: "formkit",
        key: undefined,
        control: undefined,
        maxAge: 3600000,
        debounce: 200,
        beforeSave: undefined,
        beforeLoad: undefined,
      }),
    ],
    inputs: {
      barcode,
    },
  };
});
