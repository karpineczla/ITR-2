import Footer from "../components/Footer";
import Header from "../components/Header";
import ReportsCard from "../components/ReportsCard";
import TitleAndText from "../components/TitleAndText";
import '../styles/Spending.css'

export default function Spending() {
    return (
        <main className="spending-page">
            <Header />
            <TitleAndText title="Spending and Economics" />
            <ReportsCard />
            <Footer />
        </main>
    )
}