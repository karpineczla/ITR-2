
import Hero from '../components/Hero'
import HomeButtonCards from '../components/HomeButtonCards'
import HomeGrid from '../components/HomeGrid'

export default function Home() {
    return (
        <main className="home">
            <Hero />
            <HomeButtonCards />
            <HomeGrid />
        </main>
    );
}