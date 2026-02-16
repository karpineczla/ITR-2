import Footer from "../components/Footer";
import Header from "../components/Header";
import ReportsCard from "../components/ReportsCard";
import TitleAndText from "../components/TitleAndText";
import BackButton from "../components/BackButton";
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