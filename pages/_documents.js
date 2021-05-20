import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { GoogleFonts } from "next-google-fonts";


export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
