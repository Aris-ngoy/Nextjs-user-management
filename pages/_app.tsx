import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/navbar/NavBar'
import TopBar from '../components/navbar/TopBar'
import { RecoilRoot } from 'recoil'
import RoutComponent from '../components/route/RoutComponent'

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <RecoilRoot>
      <div className='w-screen h-screen flex flex-row'>
        <NavBar />
        <RoutComponent>
          <div className='flex flex-col w-full h-[100%]'>
            <TopBar />
            <Component {...pageProps} />
          </div>
        </RoutComponent>
      </div>
    </RecoilRoot>
  )
}

export default MyApp
