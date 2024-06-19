import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chat";
import MainLayout from "./pages/main.layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
