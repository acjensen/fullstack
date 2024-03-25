import "./styles/global.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { simpleLayout } from "../cdk/common";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col">
          {simpleLayout ? (
            <div className="flex m-6">{children}</div>
          ) : (
            <div>
              <Navbar></Navbar>
              <div className="flex m-6">{children}</div>
              <Footer></Footer>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
