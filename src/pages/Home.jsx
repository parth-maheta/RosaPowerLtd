import React from "react";
import MainContent from "../components/MainContent";
import StatsCards from "../components/StatsCards";

export default function Home() {
  return <MainContent />;
}

// Named export for StatsCards only
export function StatsCardsOnly() {
  return <StatsCards />;
}
