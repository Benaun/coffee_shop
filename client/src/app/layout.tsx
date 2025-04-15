import { Poppins } from "next/font/google"

import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"

import "./globals.css"

const main = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
})

export const metadata = {
  tittle: {
    default: "Benaun's Coffee",
    template: `%s | Benaun's Coffee`
  },
  description: "Experience the perfect blend of artisanal coffee and cozy ambiance at Brew Haven."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${main.className} md:hidden`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
