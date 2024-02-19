import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Update available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
