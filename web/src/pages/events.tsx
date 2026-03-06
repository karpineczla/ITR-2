import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import EventRow from "../components/eventsPage/EventRow";

export default function Events() {
    return (
        <main className="events-page">
            <Header />
            <TitleAndText title="Events" />
            <EventRow rowKey="education" />
            <EventRow rowKey="sessions" />
            <Footer />
        </main>
    )
}