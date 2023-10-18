"use client";

// html
import type { Metadata } from "next";

// react components

// css
import "../styles/globals.css";

// components
import SideBar from "../components/global/sideBar/SideBar";
import Providers from "./providers";
import { AuthContextProvider } from "./context/AuthContext";
import useSidebarStore from "../components/global/sideBar/sideBarStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useSidebarStore();
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative w-screen h-auto flex items-center">
            <AuthContextProvider>
              <SideBar />
              <div
                className={`relative h-screen ${
                  isSidebarOpen
                    ? "w-[100rem] -right-80 transition-width duration-700"
                    : "w-[115rem] -right-20 transition-width duration-700"
                }`}
              >
                {children}
              </div>
            </AuthContextProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
