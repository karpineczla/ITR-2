import BackButton from "../components/general/BackButton";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";

export default function Sessions() {
    return (
        <main className="sessions-page">
            <Header />
            <BackButton to="/events" />
            <TitleAndText title="Listening Sessions"/>
            <TitleAndText title="Research Roundup" />
            <Footer />
        </main>
    )
}