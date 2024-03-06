import { type AppType } from "next/app";
import { type Session } from "next-auth";
import Head from 'next/head'
import { SessionProvider } from "next-auth/react";
import { Notifications } from '@mantine/notifications';
import NextNProgress from 'nextjs-progressbar'
import { api } from "@/utils/api";
import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress
        height={2}
        stopDelayMs={200}
        options={{ showSpinner: false }}
      />
      
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Notifications position="top-right" />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
