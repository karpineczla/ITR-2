import Footer from "../components/Footer";
import Header from "../components/Header";
import TitleAndText from "../components/TitleAndText";
import '../styles/Publications.css'

export default function Publications() {
    return (
        <main className="publications-page">
            <Header />
            <TitleAndText title="Publications" />
            <Footer />
        </main>
    )
}