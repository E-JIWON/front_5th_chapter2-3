import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import TanstackQueryProvider from "./app/provider/TanstackQueryProvider.tsx"

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <TanstackQueryProvider>
    <App />
  </TanstackQueryProvider>,
  // </StrictMode>,
)
