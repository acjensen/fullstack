import './styles/global.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { simpleLayout } from '../cdk/common';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col">
          {simpleLayout
            ? (
              <div className="m-6 flex">{children}</div>
            )
            : (
              <div>
                <Navbar />
                <div className="m-6 flex">{children}</div>
                <Footer />
              </div>
            )}
        </div>
      </body>
    </html>
  );
}
