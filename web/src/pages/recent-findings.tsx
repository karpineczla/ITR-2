import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import RecentFindingsCards from "../components/recentFindingsPage/RecentFindingsCards";
import TitleAndText from "../components/general/TitleAndText";
import BackButton from "../components/general/BackButton";
import '../styles/RecentFindings.css'

export default function RecentFindings() {
    return (
        <main className="recent-findings-page">
            <Header />
            <BackButton to="/publications-and-reports" />
            <TitleAndText title="Recent Findings"></TitleAndText>
            <RecentFindingsCards />
            <Footer />
        </main>
    )
}