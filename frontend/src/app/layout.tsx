import "./globals.css";
import AuthProvider from "@/shared/components/layout/AuthProvider";

export const metadata = {
  title: "Frontend",
  description: "LLM Chat UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}