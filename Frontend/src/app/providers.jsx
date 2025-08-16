"use client";
import QueryProvider from "./query-provider";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }) {
  return (
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
        theme="light"
        className={"font-dosisRegular"}
      />
      {children}
    </QueryProvider>
  );
}
