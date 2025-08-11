import localFont from "next/font/local";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import QueryProvider from "./query-provider";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Semaphore 2K24",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">\
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
        <QueryProvider>

          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
