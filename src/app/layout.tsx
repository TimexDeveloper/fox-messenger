import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fox Messenger - Modern Chat Application',
  description: 'A modern, stylish messenger app built with Next.js and WebRTC for instant messaging and video calls.',
  icons: {
    icon: '🦊',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
