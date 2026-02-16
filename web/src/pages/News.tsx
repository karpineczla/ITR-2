import Footer from "../components/Footer";
import Header from "../components/Header";
import TitleAndText from "../components/TitleAndText";
import NewsCards from "../components/NewsCards";
import BackButton from "../components/BackButton";

export default function News() {
    return (
        <main className="news-page">
            <Header />
            <BackButton to="/publications-and-reports" />
            <TitleAndText title="In the News" />
            <NewsCards />
            <Footer />
        </main>
    )
}