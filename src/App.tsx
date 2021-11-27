import MessageBar from "./features/message-bar";
import MainPage from "./pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  console.log(window.location.href);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/address/:address"} element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      <MessageBar />
    </>
  );
};

export default App;
