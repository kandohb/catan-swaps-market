import './globals.css'
import { Ysabeau } from 'next/font/google'

const ysabeau = Ysabeau({ subsets: ['latin'] })

export const metadata = {
  title: 'Catan Futures Exchange',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head className={ysabeau.className}>
        <title>{metadata.title}</title>
      </head>
      <body className={ysabeau.className}>
        {children}
      </body>
    </html>
  )
}
