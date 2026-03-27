import BackButton from "../components/general/BackButton";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TextWithImage from "../components/general/TextWithImage";
import TitleAndText from "../components/general/TitleAndText";

export default function ContinuingTheConversation() {
    return (
        <main className="continuing-the-conversation-page">
            <Header />
            <BackButton to="/education-and-workshops" />
            <TitleAndText sectionKey="webinar" />
            <TextWithImage sectionKey="webinar-intro" />
            <TitleAndText sectionKey="webinar-intro-text" />
            <Footer />
        </main>
    )
}