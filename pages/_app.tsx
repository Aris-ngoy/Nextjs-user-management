import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/navbar/NavBar'
import TopBar from '../components/navbar/TopBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='w-screen h-screen flex flex-row'>
      <NavBar />
      <div className='flex flex-col w-full h-[100%]'>
        <TopBar />
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
