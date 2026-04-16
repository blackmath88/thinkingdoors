import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thinking Doors',
  description:
    'Escape the Corridor of Efficiency. Digress into weird thinking spaces.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-corridor-bg overflow-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
