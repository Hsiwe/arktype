import merge from "webpack-merge"
import { resolve } from "path"
import { IgnorePlugin } from "webpack"
import {
    commonConfig,
    rendererConfig as baseRendererConfig,
    injectedWebConfig
} from "redo-bundle/webpack.base"

export const mainConfig = merge.smart(commonConfig, {
    target: "electron-main",
    entry: [resolve(__dirname, "src", "main", "index.ts")],
    output: {
        filename: "main.js"
    }
})

export const browserConfig = merge.smart(injectedWebConfig, {
    entry: [resolve(__dirname, "src", "browser", "index.ts")],
    output: {
        filename: "browser.js"
    },
    plugins: [new IgnorePlugin(/fs/)]
})

export const rendererConfig = merge.smart(baseRendererConfig, {
    entry: [resolve(__dirname, "src", "renderer", "index.tsx")],
    output: {
        filename: "renderer.js"
    }
})