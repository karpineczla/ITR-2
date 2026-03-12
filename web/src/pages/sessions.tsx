import BackButton from "../components/general/BackButton";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import Carousel from "../components/interactiveDataPage/Carousel";

export default function Sessions() {
    return (
        <main className="sessions-page">
            <Header />
            <BackButton to="/events" />
            <TitleAndText title="Listening Sessions"/>
            <TitleAndText title="Research Roundup" />
            <Carousel sectionKey="sessions-upcoming" />
            <Carousel sectionKey="sessions-previous" />
            <Footer />
        </main>
    )
}