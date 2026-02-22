import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import BackButton from "../components/general/BackButton";
import '../styles/Publications.css'

export default function Publications() {
    return (
        <main className="publications-page">
            <Header />
            <BackButton to="/publications-and-reports" />
            <TitleAndText title="Publications" />
            <Footer />
        </main>
    )
}