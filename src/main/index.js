import { app } from "electron";
import setAppMenu from "./setAppMenu";
import createWindow from "./createWindow";

app.on("ready", () => {
  setAppMenu();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});
