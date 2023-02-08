import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

export default function App({ Component, pageProps }: AppProps) {
  return (<div className='p-0 m-0 min-h-screen h-full w-full text-textlight bg-darkbg scrollbar-hide'><Provider store={store}> <Component {...pageProps} /> </Provider></div>)
}