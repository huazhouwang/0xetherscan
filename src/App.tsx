import MessageBar from "./features/message-bar";
import MainPage from "./pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserView } from "react-device-detect";
import MobileNotSupported from "./components/mobile-not-supported";

const App = () => {
  return (
    <>
      <BrowserView>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<MainPage />} />
            <Route path={"/address/:address"} element={<MainPage />} />
            <Route path={"/token/:address"} element={<MainPage />} />
          </Routes>
        </BrowserRouter>
        <MessageBar />
      </BrowserView>
      <MobileNotSupported />
    </>
  );
};

export default App;
