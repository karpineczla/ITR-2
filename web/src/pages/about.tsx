import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import VideoSection from "../components/general/VideoSection";
import TitleAndText from "../components/general/TitleAndText";

import '../styles/aboutPage.css';
import BackButton from "../components/general/BackButton";
import ContactList from "../components/contactPage/ContactList";


export default function About() {
    return (
        <main className="about-page">
            <Header />
            <BackButton to="/" />
            {/* we need this wrapper because the css breaks without it and looks like trash */}
            <div className="history-wrap-container">
            <VideoSection />
            <TitleAndText sectionKey="history-part" />
            {/*<TextWithImage sectionKey="about-history-row" />*/}
            </div>
            <TitleAndText sectionKey="history-part-2" />
            <TitleAndText sectionKey="about-mission" />
            <ContactList />
            <Footer />
        </main>
    );
}