import {defineStore} from "pinia";
import defaultSettings from "../../config/defaultSettings.ts";

interface Settings {
  title: string
  logo: string
}

export const useSettingsStore = defineStore({
  id: "settings",
  state: (): Settings => ({
    ...defaultSettings
  })
})
