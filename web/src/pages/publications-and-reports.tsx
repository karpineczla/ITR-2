import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import ButtonCards from "../components/general/ButtonCards";
import TitleAndText from "../components/general/TitleAndText";

export default function PublicationsAndReports() {
    return (
        <main className="publications-and-reports-page">
            <Header />
            <TitleAndText title="Publications and Reports" />
            <ButtonCards sectionKey="publications-and-reports" />
            <Footer />
        </main>
    );
}