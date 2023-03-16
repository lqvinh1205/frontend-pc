import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { AppRoutes } from "./routers";
import { store } from "./stores";
import "./config/i18n";
// import { Notifications } from "components_common/Elements/Notifications";

function App() {
  return (
    <ReduxProvider store={store}>
      {/* <Notifications /> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
