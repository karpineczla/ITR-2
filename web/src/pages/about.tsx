import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import VideoWithTextRow from "../components/general/VideoWithTextRow";
import TitleAndText from "../components/general/TitleAndText";
import TextWithImage from "../components/general/TextWithImage";
import ContactList from "../components/contactPage/ContactList";
//import PageTitle from "../components/general/PageTitles";



export default function About() {
    const videoSide: 'left' | 'right' = 'left'

    return (
        <main className="about-page">
            <title>ITRR | About</title>
            <Header />
            <VideoWithTextRow side={videoSide} sectionKey="about-mission" />
            <TextWithImage sectionKey="about-history-row" />
            <TitleAndText sectionKey="history-part-2" />
            <ContactList />
            <Footer />
        </main>
    );
}