import Footer from "../components/Footer";
import Header from "../components/Header";
import PublicationsButtonCards from "../components/PublicationsButtonCards";
import TitleAndText from "../components/TitleAndText";

export default function PublicationsAndReports() {
    return (
        <main className="publications-and-reports-page">
            <Header />
            <TitleAndText title="Publications and Reports" />
            <PublicationsButtonCards />
            <Footer />
        </main>
    );
}