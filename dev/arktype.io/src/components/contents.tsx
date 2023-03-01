import { useColorMode } from "@docusaurus/theme-common"
import { Stack, Typography } from "@mui/material"
import React from "react"
import { Features } from "../components/features.tsx"
import { HomeDemo } from "./homeDemo.tsx"
import {
    FloatingInstallationBlock,
    MobileInstallationBlock
} from "./installationBlock.tsx"
import { useInstallationBlockShouldFloat } from "./useWindowSize.ts"

export const Contents = () => {
    const { colorMode } = useColorMode()
    return (
        <main style={{ display: "flex", justifyContent: "center" }}>
            <Stack
                justifyContent="center"
                alignItems="center"
                padding="1rem 0rem 1rem"
                spacing={1}
                width="100%"
                maxWidth="60rem"
            >
                <HomeDemo />
                {useInstallationBlockShouldFloat() ? (
                    <FloatingInstallationBlock />
                ) : (
                    <MobileInstallationBlock />
                )}
                <Typography
                    color={
                        colorMode === "dark" ? "primary.light" : "primary.dark"
                    }
                    style={{ marginTop: "1rem" }}
                    fontSize="1.3rem"
                >
                    {/* @blockFrom:README.md:intro */}
                    ArkType is a library for defining runtime types using
                    TypeScript syntax that can be inferred 1:1.
                    <br />
                    <br />
                    Each character you type is instantly validated both
                    syntactically and semantically using TypeScript's own type
                    system, so you know exactly what to expect from editor to
                    runtime ⛵
                    {/* @blockEnd (these extra spaces are here so it stays on its own line) */}
                </Typography>
                <Features />
            </Stack>
        </main>
    )
}