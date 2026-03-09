import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import ReportsCard from "../components/spendingPage/ReportsCard";
import TitleAndText from "../components/general/TitleAndText";
import BackButton from "../components/general/BackButton";
import '../styles/Spending.css'

export default function Spending() {
    return (
        <main className="spending-page">
            <Header />
            <BackButton to="/publications-and-reports" />
            <TitleAndText title="Spending and Economics" />
            <ReportsCard />
            <Footer />
        </main>
    )
}