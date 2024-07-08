import Navbar from '@/components/Navbar'

import './globals.css'
import { Outfit } from 'next/font/google'
import 'material-icons/iconfont/material-icons.css';

const outfit = Outfit({ subsets: ['latin']})

export const metadata = {
  title: 'Cinemovia',
  description: 'A Movie review app ',
  icons: {
    icon: "./favicon.ico",
    apple: ["./apple-touch-icon.png"],
  },
  manifest: './manifest.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className='flex flex-row w-full min-h-[100vh] bg-slate-900'>
          <div className='sm:h-[100vh] sm:w-auto w-full fixed sm:left-0 bottom-0 z-50'>
            <Navbar />
          </div>
          <div className='w-full sm:mb-0 mb-8 text-white'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
