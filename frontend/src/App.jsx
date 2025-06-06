import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Policies from "./pages/Policies";
import Newsroom from "./pages/Newsroom";
import TelephoneDirectory from "./pages/TelephoneDirectory";
import DownloadPageWrapper from "./components/DownloadPageWrapper";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policies" element={<Policies />} />
        {/* Add :dept param, making it optional with ? */}
        <Route
          path="/telephone-directory/:dept?"
          element={<TelephoneDirectory />}
        />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/download" element={<DownloadPageWrapper />} />
        {/* other routes */}
      </Routes>
    </Layout>
  );
}
