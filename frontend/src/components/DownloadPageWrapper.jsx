import React from "react";
import { useLocation } from "react-router-dom";
import DownloadPage from "./DownloadPage";

export default function DownloadPageWrapper() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category") || null;
  const department = queryParams.get("department") || null;

  return <DownloadPage category={category} department={department} />;
}
