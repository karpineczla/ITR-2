import Footer from "../components/Footer";
import Header from "../components/Header";
import ReportsCard from "../components/ReportsCard";
import '../styles/Spending.css'

export default function Spending() {
    return (
        <main className="spending-page">
            <Header />
            <h1>Spending Page</h1>
            <ReportsCard />
            <Footer />
        </main>
    )
}