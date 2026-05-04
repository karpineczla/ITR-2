import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import EventRow from "../components/eventsPage/EventRow";
import BackButton from "../components/general/BackButton";

export default function Events() {
    return (
        <main className="events-page">
            <title>ITRR | Events</title>
            <Header />
            <BackButton to='/get-involved-and-resources' />
            <TitleAndText title="Events" />
            <EventRow rowKey="education" />
            <EventRow rowKey="sessions" />
            <Footer />
        </main>
    )
}