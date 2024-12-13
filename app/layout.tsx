import Link from "next/link"
import Head from "next"
import "./globals.css"
import { Inter } from "next/font/google"

// components
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"

// fortawesome: https://docs.fontawesome.com/web/use-with/react/use-with
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Script from "next/script"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "devlog2",
  description: "開発メモ。個人的に検索頻度が多い内容など。できるだけ公式URLも合わせてメモしていきます。",
  other: {
    "google-adsense-account": "ca-pub-6623379183106626"
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2KJKZP3KDW"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2KJKZP3KDW', {
              page_path: window.location.pathname,
            });
          `}
      </Script>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="w-10/12 mx-auto py-7 px-4">
            <header className="flex justify-center pb-2">
              <div className="flex items-center justify-between">
                <nav className="flex items-center justify-between w-full text-sm font-medium">
                  <Link href="/" className="p-3 rounded hover:bg-sky-300 hover:text-white hover:opacity-70"
                    style={{ fontSize: '10px' }}>
                    {/* <FontAwesomeIcon icon={faHouse} title="home" style={{ width: '25px' }} /> */}
                  </Link>
                  <div className="gap-2" style={{ display: 'flex', alignItems: 'center' }}>
                    <a href="https://chatgpt.com">
                      <Image src="/openai-logomark.svg" alt="chatgptlogo" width={20} height={20}/>
                    </a>
                    <Link href="/about" className="p-3 rounded hover:bg-sky-300 hover:text-black hover:opacity-70">About</Link>
                    <Link href="/portfolio" className="p-3 rounded hover:bg-sky-300 hover:text-black hover:opacity-70">Portfolio</Link>
                    <a href="https://github.com/ka2yuki">
                      <FontAwesomeIcon icon={faGithub} size="xl" /></a>
                  </div>
                </nav>
                <ModeToggle />
              </div>
            </header>
            <main className="flex justify-center">{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6623379183106626"
          crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}
