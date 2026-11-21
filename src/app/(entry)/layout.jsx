import "../globals.css"

import {
  poppins,
  montserrat,
  urbanist,
} from "../../lib/fonts"

export default function EntryLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} ${urbanist.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}