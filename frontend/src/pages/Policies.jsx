import React from "react";
import DownloadPage from "../components/DownloadPage";

export default function Policies() {
  return (
    <main
      className="
        w-full
        min-h-[calc(100vh-60px)]  /* full height minus header/footer */
        bg-white
        p-4                     /* padding on mobile */
        sm:p-6                  /* more padding on larger screens */
        m-0
        overflow-y-auto
        flex
        flex-col
      "
    >
      <DownloadPage category="policies" />
    </main>
  );
}
