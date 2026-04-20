// RootLayout is required in Next.js App Router.
// It wraps ALL pages in the app.
//
// `children` represents the content of each page (like page.js).
// Every page will be rendered inside this layout.
export default function RootLayout({ children }) {
  return (
    // <html> is the root HTML element for the entire app
    <html lang="en">
      {/* <body> contains everything visible on the page */}
      <body>
        {/* Render the current page here */}
        {children}
      </body>
    </html>
  );
}