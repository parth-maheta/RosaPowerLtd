import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Policies from "./pages/Policies";
import Newsroom from "./pages/Newsroom";
import TelephoneDirectory from "./pages/TelephoneDirectory";
import DownloadPageWrapper from "./components/DownloadPageWrapper";
import DepartmentalDocs from "./components/DepartmentalDocs";
import GalleryPage from "./components/GalleryPage";
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/download" element={<DownloadPageWrapper />} />
        <Route
          path="/telephone-directory/:dept?"
          element={<TelephoneDirectory />}
        />
        <Route path="/departmental-docs" element={<DepartmentalDocs />} />

        <Route path="/gallery/:eventName" element={<GalleryPage />} />
      </Routes>
    </Layout>
  );
}
