import newrelic from 'newrelic';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MPRNewsDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    newrelic.setTransactionName(ctx.pathname); // e.g. /story/[...slug]
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MPRNewsDocument;
