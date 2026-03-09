import Hero from '../components/homePage/Hero'
import Header from '../components/general/Header'
import Footer from '../components/general/Footer'
import HomeGrid from '../components/homePage/HomeGrid'
import HomeButtonCards from '../components/homePage/HomeButtonCards'
import '../styles/Home.css'

export default function Home() {
    return (
        <main className="home">
            <Header />
            <Hero />
            <HomeButtonCards />
            <HomeGrid />
            <Footer />
        </main>
    );
}