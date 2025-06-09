import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Head from "next/head";
import theme from "@/styles/theme";
import Layout from "@/componentsv2/layout/Layout";
import "@/styles/globals.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { SnackbarProvider } from "notistack";
import { SessionProvider } from "next-auth/react";

dayjs.locale("es");

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{"Información presupuestaria"}</title>
        <meta name="description" content={"Información presupuestaria"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <Layout>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </Layout>
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
