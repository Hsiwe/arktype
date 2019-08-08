import React from "react"
import { Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { component } from "blocks"
import { AddButton, ScheduleButton, AccountButton, HelpButton } from "custom"
import { Row, Menu, Button } from "redo-components"
import { SearchInput } from "./SearchInput"
import { Page } from "renderer/state"

const stylize = makeStyles((theme: Theme) => ({
    homeActionsRow: {
        height: theme.spacing(10)
    },
    searchInput: {
        width: theme.spacing(40)
    }
}))

export const HomeActionsRow = component({
    name: "HomeActionsRow",
    store: true
})(({ store }) => {
    const { homeActionsRow, searchInput } = stylize()
    return (
        <>
            <Row justify="center" className={homeActionsRow}>
                <Button
                    kind="secondary"
                    onClick={() => store.mutate({ page: Page.TestView })}
                >
                    See all tests
                </Button>
                <Button
                    kind="secondary"
                    onClick={() => store.mutate({ page: Page.TagView })}
                >
                    See all tags
                </Button>
                <AddButton
                    onClick={() =>
                        store.mutate({
                            learner: { active: true }
                        })
                    }
                />
                <ScheduleButton />
                <SearchInput
                    className={searchInput}
                    placeholder="Search your tests"
                />
                <HelpButton />
                <Menu

                >
                    {
                        { toggle: <AccountButton />, options: { Logout: () => store.mutate({ token: "" }) } }
                    }
                </Menu>
            </Row>
        </>
    )
})