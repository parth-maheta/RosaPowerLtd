import React from "react";
import MainContent from "../components/MainContent";
import StatsCards from "../components/StatsCards";

export default function Home() {
  return <MainContent />;
}

export function StatsCardsOnly() {
  return <StatsCards />;
}
