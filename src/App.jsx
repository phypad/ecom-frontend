import Header from "./component/Header";
import Featured from "./component/Featured";
import TopSelling from "./component/TopSelling";
import Footer from "./component/Footer";
import Products from "./component/Pages/Products";
import Detail from "./component/Pages/Detail";
import Alert from "./component/Alert";
import Cart from "./component/Pages/Cart";
import Checkout from "./component/Pages/Checkout";
import Register from "./component/Pages/Register";
import Login from "./component/Pages/Login";
import ThankYou from "./component/Pages/ThankYou";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EcomProvider } from "./context/EcomContext";
import { AuthProvider } from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem();
  let authInitialState = { accessToken: token ?? null };

  return (
    <AuthProvider defaultState={authInitialState}>
      <EcomProvider>
        <Router>
          <Header />
          <Alert />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Featured />
                  <TopSelling />
                </>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/detail/:_id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
          <Footer />
        </Router>
      </EcomProvider>
    </AuthProvider>
  );
}

export default App;
