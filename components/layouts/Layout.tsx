import Head from "next/head"
import { FC, ReactElement } from "react"
import { Navbar } from '../ui';

interface LayoutProps {
    children?: ReactElement[] | ReactElement;
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout = ({children, title}:LayoutProps) => {
  return (
    <>
        <Head>
            <title>{title || "Pokemon App"}</title>
            <meta name="author" content="Nahuel Montes de Oca"/>
            <meta name="description" content={`"Informacion sobre el pokemon ${title}"`}/>
            <meta name="keywords" content={`"${title}, pokemon, pokedex"`}/>
            
            <meta property="og:title" content={`Informacion sobre ${title}`} />
            <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>  

        <Navbar />
        <main style={{
            padding: '0px 20px'
        }}>
            {children}
        </main>

    </>
  )
}
