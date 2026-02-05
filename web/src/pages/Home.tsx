
import Hero from '../components/Hero'
import Header from '../components/Header'

import HomeButtonCards from '../components/homeButtonCards'

export default function Home() {
    return (
        <main className="home">
            <Header />
            <Hero />
            <HomeButtonCards />
        </main>
    );
}