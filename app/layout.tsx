import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ============================================================
   SEO METADATA — Optimized for recruiter searches
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL("https://elmostafa.dev"),
  title: {
    default: "Elmostafa Mohamed Abdelaal — Cybersecurity & Full-Stack Developer",
    template: "%s | Elmostafa Mohamed",
  },
  description:
    "Computer Engineering student at King Salman International University. Expert in cybersecurity (Red Team, Pentesting, OWASP), full-stack .NET development, and cloud architecture. Based in Egypt.",
  keywords: [
    "Elmostafa Mohamed",
    "Cybersecurity Engineer",
    "Penetration Testing",
    "Red Team Operator",
    "Full Stack Developer",
    "Computer Engineering",
    "Egypt Developer",
    "Burp Suite",
    "OWASP",
    "AWS Cloud",
    ".NET Developer",
    "DEPI",
    "NTI Intern",
  ],
  authors: [{ name: "Elmostafa Mohamed Abdelaal", url: "https://elmostafa.dev" }],
  creator: "Elmostafa Mohamed Abdelaal",
  publisher: "Elmostafa Mohamed Abdelaal",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elmostafa.dev",
    siteName: "Elmostafa Mohamed — Portfolio",
    title: "Elmostafa Mohamed Abdelaal — Cybersecurity & Full-Stack Developer",
    description:
      "Computer Engineering student specializing in cybersecurity research, red team operations, and full-stack .NET development.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elmostafa Mohamed Abdelaal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elmostafa Mohamed Abdelaal — Cybersecurity & Dev",
    description:
      "Computer Engineering student | Cybersecurity Researcher | Red Team | Full-Stack Developer",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020510" },
    { media: "(prefers-color-scheme: light)", color: "#020510" },
  ],
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis lenis-smooth">
      <head>
        {/* Preconnect to Google Fonts for speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Font loads */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Elmostafa Mohamed Abdelaal",
              jobTitle: "Computer Engineering Student & Cybersecurity Researcher",
              email: "elmostafaabdelaal@gmail.com",
              url: "https://elmostafa.dev",
              sameAs: [
                "https://linkedin.com/in/elmustafamohamad",
                "https://github.com/e1mostafa",
              ],
              knowsAbout: [
                "Cybersecurity",
                "Penetration Testing",
                "Red Team Operations",
                "Full Stack Development",
                "AWS Cloud",
                "Machine Learning",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "King Salman International University",
                address: { "@type": "PostalAddress", addressCountry: "EG" },
              },
            }),
          }}
        />
      </head>
      <body className="bg-void text-gray-200 font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
