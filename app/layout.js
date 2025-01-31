// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Check-In Demo',
  description: 'Demo for Variation 1 and Variation 2 check-in flows',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
