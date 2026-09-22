import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arteli — Briefing de Projeto Web & SaaS",
  description: "Diga-nos o que você deseja para o seu site e nós criaremos a estrutura, identidade visual e cópia ideais.",
  icons: {
    icon: "https://arteli.net.br/assets/isotipo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;600;700&family=Syne:wght@400;600;700&family=Outfit:opsz,wght@6..12,300;6..12,400;6..12,600;6..12,700&family=Cinzel:wght@400;600;700&family=Unbounded:wght@300;400;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600&family=Roboto:wght@300;400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,500;1,400&family=Merriweather:wght@300;400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <div id="grain" />
        {children}
      </body>
    </html>
  );
}
