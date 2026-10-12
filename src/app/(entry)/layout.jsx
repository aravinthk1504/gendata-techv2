import "../globals.css"

import {
  poppins,
  montserrat,
} from "../../lib/fonts"

export default function EntryLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}