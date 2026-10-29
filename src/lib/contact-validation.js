
import { z } from "zod";

export const offeringOptions = {
  Services: [
    "AI / ML Development",
    "KI- und ML-Entwicklung",
    "Full Stack Development",
    "Full-Stack-Entwicklung",
    "Web Development",
    "Webentwicklung",
    "Software Development",
    "Softwareentwicklung",
    "App Development",
    "App-Entwicklung",
    "IoT Solutions",
    "IoT-Lösungen",
  ],

  Products: [
    "GenData LMS",
    "GenData CRM",
    "GenData ERP",
    "GenData Billing",
  ],

  Training: [
    "AI & Machine Learning",
    "KI und maschinelles Lernen",
    "Data Science",
    "Data Analytics",
    "Datenanalyse",
    "IoT Development",
    "IoT-Entwicklung",
    "MERN Stack",
    "DevOps",
    "Python",
    "Mobile App Development",
    "Mobile-App-Entwicklung",
  ],

  "Other Enquiry": [
    "General Enquiry",
    "Allgemeine Anfrage",
    "Partnership",
    "Partnerschaft",
    "Business Enquiry",
    "Geschäftsanfrage",
    "Other",
    "Sonstiges",
  ],
};

export const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.email().max(254),
    phone: z.string().trim().min(7).max(25).regex(/^[+\d\s().-]+$/, "Invalid phone number").refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Phone number must contain 7 to 15 digits"),
    category: z.enum([
      "Services",
      "Products",
      "Training",
      "Other Enquiry",
    ]),
    offering: z.string().trim().min(2).max(150),
    message: z.string().trim().min(10).max(5000),
    language: z.enum(["en", "de"]).default("en"),

    // Hidden field: must remain empty.
    website: z.string().max(200).default(""),
  })
  .strict()
  .refine(
    (data) =>
      offeringOptions[data.category].includes(data.offering),
    {
      path: ["offering"],
      message: "Invalid offering for selected category",
    }
  );
