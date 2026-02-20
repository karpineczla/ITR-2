import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import BackButton from "../components/general/BackButton";

export default function PilotCommunity() {
    return (
        <main className="news-page">
            <Header />
            <BackButton to="/resources" />
            <TitleAndText title="The Pilot Community Tourism Grant Program (Office of Tourism - Montana Department of Commerce)" />
            <TitleAndText subtitle="How ITRR is Supporting Communities" />
            <Footer />
        </main>
    )
}