import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Router from 'next/router';
import NProgress from 'nprogress';
NProgress.configure( { showSpinner: false } );
Router.events.on( 'routeChangeStart', () => NProgress.start() );
Router.events.on( 'routeChangeComplete', () => NProgress.done() );
Router.events.on( 'routeChangeError', () => NProgress.done() );
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<div className='p-0 m-0 min-h-screen h-full w-full text-textlight bg-darkbg scrollbar-hide'>
    <SessionProvider session={session}>
    <Provider store={store}>
       <Component {...pageProps} /> 
       </Provider>
    </SessionProvider>
       </div>)
}