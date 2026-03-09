import EventRow from "../components/eventsPage/EventRow";
import BackButton from "../components/general/BackButton";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";

export default function EducationAndWorkshops() {
    return (
        <main className="education-and-workshops-page">
            <Header />
            <BackButton to="/events" />
            <TitleAndText title="Education and Workshops"/>
            <EventRow rowKey="tourism-fundamentals"/>
            <EventRow rowKey="genai-montana-tourism" />
            <Footer />
        </main>
    )
}