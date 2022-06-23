import { PiniaSharedState } from "pinia-shared-state";

export default function ({ $pinia }) {
    if (process.client) {
        $pinia.use(
            PiniaSharedState({
            // Enables the plugin for all stores. Defaults to true.
            enable: true,
            // If set to true this tab tries to immediately recover the shared state from another tab. Defaults to true.
            initialize: false,
            // Enforce a type. One of native, idb, localstorage or node. Defaults to native.
            type: 'localstorage',
            }),
        );
    };  
}
