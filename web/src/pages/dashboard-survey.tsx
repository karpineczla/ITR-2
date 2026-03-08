import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import TitleAndText from "../components/general/TitleAndText";
import BackButton from "../components/general/BackButton";

export default function DashboardSurveyPage() {
    return (
        <main className="dashboard-survey-page">
            <Header />
            <BackButton to="/interactive-data" />
            <TitleAndText sectionKey="dashboard-survey-part-one" />
            <TitleAndText sectionKey="dashboard-survey-part-two" />
            <TitleAndText sectionKey="dashboard-survey-part-three" />
            <Footer />
        </main>
    )
}