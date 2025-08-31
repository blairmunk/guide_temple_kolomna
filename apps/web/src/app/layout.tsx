import type { Metadata } from 'next';
import { Inter, PT_Serif } from 'next/font/google';
import './global.css'; // Убираем 's' - файл называется global.css, не globals.css

const inter = Inter({ subsets: ['latin', 'cyrillic'] });
const ptSerif = PT_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'Гид по Троицкому храму г. Коломны',
  description: 'Интерактивный путеводитель по приходу Троицкого храма в Коломне (Щурово)',
  manifest: '/manifest.json',
  themeColor: '#1E3A5F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} ${ptSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
