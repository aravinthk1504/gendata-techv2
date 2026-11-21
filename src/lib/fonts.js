import {
  Poppins,
  Montserrat,
  Urbanist,
} from "next/font/google"

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})
export const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-urbanist" })
