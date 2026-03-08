import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import TitleAndText from "../components/general/TitleAndText";

export default function DashboardSurveyPage() {
    return (
        <main className="dashboard-survey-page">
            <Header />
            <TitleAndText sectionKey="dashboard-survey-part-one" />
            <TitleAndText sectionKey="dashboard-survey-part-two" />
            <TitleAndText sectionKey="dashboard-survey-part-three" />

            <Footer />
        </main>
    )
}