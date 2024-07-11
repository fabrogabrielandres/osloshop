import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface SidebarUiActions {
    closeSideMenu: () => void,
    openSideMenu: () => void,
}

export interface SidebarUiState {
    isSideMenuOpen: boolean
}


export const sidebarUi: StateCreator<(SidebarUiActions & SidebarUiState), [["zustand/devtools", never]]> = ((set, get) => ({
    isSideMenuOpen: false,
    openSideMenu: () => {
        set((state) => {
            return { isSideMenuOpen: true }
        })
    },
    closeSideMenu: () => {
        set((state) => {
            return { isSideMenuOpen: false }
        })
    }
}))


export const useSidebarUi = create<SidebarUiActions & SidebarUiState>()(
    devtools(
        sidebarUi,
    )
);