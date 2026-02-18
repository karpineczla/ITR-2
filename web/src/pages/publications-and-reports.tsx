import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import PublicationsButtonCards from "../components/publicationsAndReportsPage/PublicationsButtonCards";
import TitleAndText from "../components/general/TitleAndText";

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