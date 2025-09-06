import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Base site URL
const siteUrl = "https://semaphore2k25.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Semaphore 2K25 | National Level MCA Tech Fest - NMAMIT Nitte",
    template: "%s | Semaphore 2K25"
  },
  description:
    "Semaphore 2K25 is the National Level MCA Tech & Innovation Fest of NMAM Institute of Technology (NMAMIT), Nitte. Showcasing coding challenges, design sprints, cyber security contests, gaming arenas, startup incubation, tech talks, robotics, dance, creativity and innovation for students across India. Join us for Cryptix, Design Riot, Cyberscope, Hyper Launch, Rampage Horizon, Techno Hive and more signature events.",
  keywords: [
    "semaphore2k25",
    "semaphore 2k25",
    "semaphore",
    "semaphore fest",
    "mca fest",
    "mca fest india",
    "national level mca fest",
    "tech fest",
    "nitte fest",
    "nmamit fest",
    "nmamit mca",
    "nmamit nitte",
    "nitte mca department",
    "mca department nitte",
    "nitte tech fest",
    "karnataka tech fest",
    "student tech events india",
    "coding competition",
    "hackathon",
    "cyber security event",
    "esports tournament",
    "gaming competition",
    "startup launch event",
    "design sprint",
    "ui ux challenge",
    "robotics showcase",
    "innovation challenge",
    "cryptix",
    "design riot",
    "cyberscope",
    "hyper launch",
    "rampage horizon",
    "techno hive",
    "spectra flux",
    "neon nexus",
    "dance event",
    "college fest 2025"
  ],
  authors: [{ name: "Department of MCA, NMAMIT" }],
  creator: "Department of MCA, NMAMIT Nitte",
  publisher: "Department of MCA, NMAMIT Nitte",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Semaphore 2K25 | National Level MCA Tech Fest - NMAMIT Nitte",
    description:
      "Semaphore 2K25 • National Level MCA Tech & Innovation Fest • NMAM Institute of Technology, Nitte. Coding, Cyber Security, Design, Innovation, Gaming, Startups & more.",
    url: siteUrl,
    siteName: "Semaphore 2K25",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/semaphore_logo.png",
        width: 800,
        height: 800,
        alt: "Semaphore 2K25 Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Semaphore 2K25 | National Level MCA Tech Fest - NMAMIT Nitte",
    description:
      "National Level MCA Tech & Innovation Fest • NMAMIT Nitte • Coding | Cyber Security | Design | Gaming | Startups | Innovation.",
    images: ["/images/semaphore_logo.png"],
    creator: "@semaphore2k25"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  category: "technology",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags (fallback for non Next.js aware crawlers) */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="author" content="Department of MCA, NMAMIT Nitte" />
        <link rel="canonical" href={metadata.alternates.canonical} />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Semaphore 2K25",
                  url: siteUrl,
                  logo: `${siteUrl}/images/semaphore_logo.png`,
                  sameAs: []
                },
                {
                  "@type": "WebSite",
                  name: "Semaphore 2K25",
                  url: siteUrl,
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Event",
                  "name": "Semaphore 2K25 - National Level MCA Tech Fest",
                  "startDate": "2025-10-09T09:00:00+05:30",
                  "endDate": "2025-10-10T16:00:00+05:30",
                  "eventStatus": "https://schema.org/EventScheduled",
                  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                  "organizer": {
                    "@type": "Organization",
                    "name": "Department of MCA, NMAMIT",
                    "url": "https://semaphore2k25.in"
                  },
                  "location": {
                    "@type": "Place",
                    "name": "NMAM Institute of Technology (NMAMIT), Nitte",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Nitte",
                      "addressRegion": "Karnataka",
                      "addressCountry": "IN"
                    }
                  },
                  "description": "Semaphore 2K25 is the National Level MCA Tech & Innovation Fest of NMAMIT, Nitte. Showcasing coding challenges, design sprints, cyber security contests, gaming arenas, startup incubation, tech talks, robotics, dance, creativity and innovation for students across India.",
                  "image": ["https://semaphore2k25.in/images/semaphore_logo.png"],
                  "performer": {
                    "@type": "Organization",
                    "name": "Department of MCA, NMAMIT"
                  },
                  "offers": {
                    "@type": "Offer",
                    "url": "https://semaphore2k25.in/register",
                    "price": "2025",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "validFrom": "2025-09-01T09:00:00+05:30",
                    "description": "College fest ticket for Semaphore 2K25"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
