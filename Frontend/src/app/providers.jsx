"use client";
import QueryProvider from "./query-provider";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "@/components/theme-provider";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className={"font-dosisRegular"}
        />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
