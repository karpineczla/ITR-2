import Footer from "../components/Footer";
import Header from "../components/Header";
import RecentFindingsCards from "../components/RecentFindingsCards";
import TitleAndText from "../components/TitleAndText";
import '../styles/RecentFindings.css'

export default function RecentFindings() {
    return (
        <main className="recent-findings-page">
            <Header />
            <TitleAndText title="Recent Findings"></TitleAndText>
            <RecentFindingsCards />
            <Footer />
        </main>
    )
}