import Footer from "../components/Footer";
import Header from "../components/Header";
import TitleAndText from "../components/TitleAndText";
import NewsCards from "../components/NewsCards";

export default function News() {
    return (
        <main className="news-page">
            <Header />
            <TitleAndText title="In the News" />
            <NewsCards />
            <Footer />
        </main>
    )
}