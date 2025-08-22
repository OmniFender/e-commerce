import "./globals.css";
import { roboto } from "@/utils/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        {children}
        <div id="modal" />
      </body>
    </html>
  );
}
