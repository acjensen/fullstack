import "./styles/global.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        <div className="flex m-6">{children}</div>
        <Footer></Footer>
      </body>
    </html>
  );
}
