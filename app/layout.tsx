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
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "devlog",
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
        className={`pb-5 antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <div className="flex p-1">
          <FontAwesomeIcon icon={faBookmark} className="pt-1 pl-1" />
          <a className="news" href="https://tailwindcss.com/docs/customizing-colors">Color Pallet | TailwindCSS</a>
        </div>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto px-4">
            <header className="flex justify-center pb-2 xl:pb-3">
              <div className="flex items-center justify-between">
                <nav className="flex items-center justify-between w-full text-sm font-medium">
                  <div className="gap-2" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/" className="nav-link">
                      <FontAwesomeIcon icon={faHouse} title="home" style={{ width: '25px' }} />
                    </Link>
                    <Link href="/portfolio" className="nav-link">Portfolio</Link>
                    <a href="https://github.com/ka2yuki/ka2yuki.github.io" className="nav-link">
                      <FontAwesomeIcon icon={faGithub} size="xl" />
                    </a>s
                  </div>
                </nav>
                <ModeToggle />
              </div>
            </header>
            {/* 注意： children要素なので　更にコンポーネント側でラップしてしまう。flexの際はコンポーネント側、センタリングはmargin: 0 auto;で。 */}
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6623379183106626"
          crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}
