import type { Metadata } from 'next';
import { Advent_Pro } from 'next/font/google';
import './globals.css';


// Subsets are really important. CHECK BELOW FOR MORE INFO
const adventPro = Advent_Pro({ 
  subsets: ['latin'],
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'UMBRELLA MENU',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={adventPro.className}>
        {children}
      </body>
    </html>
  )
}
