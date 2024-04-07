import Modal from "@/components/modals/Modal";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
// import ClientOnly from "@/components/ClientOnly";
import { Toaster } from "react-hot-toast";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
        <Toaster />
        <RegisterModal />
        <Navbar />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  );
}
{
  /* <Modal isOpen={true} actionLabel="Submit" /> */
}
