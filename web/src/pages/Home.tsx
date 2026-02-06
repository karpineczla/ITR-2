import Hero from '../components/Hero'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeGrid from '../components/HomeGrid'
//import HomeButtonCards from '../components/homeButtonCards'

export default function Home() {
    return (
        <main className="home">
            <Header />
            <Hero />
            {/* <HomeButtonCards /> */}
            <Footer />
        </main>
    );
}