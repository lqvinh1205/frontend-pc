import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { AppRoutes } from "./routers";
import { store } from "./stores";
import "./config/i18n";

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
