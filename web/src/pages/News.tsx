import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
//import NewsCards from "../components/newsPage/NewsCards";
import BackButton from "../components/general/BackButton";

export default function News() {
    return (
        <main className="news-page">
            <title>ITRR | News</title>
            <Header />
            <BackButton to="/publications-and-reports" />
            <TitleAndText title="In the News" />
            {/* <NewsCards /> */}
            <Footer />
        </main>
    )
}