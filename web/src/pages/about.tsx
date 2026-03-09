import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import BackButton from "../components/general/BackButton";

import '../styles/aboutPage.css';
import TitleAndText from "../components/general/TitleAndText";

export default function About() {
    return (
        <main className="about-page">
            <Header />
            <div className="aboutContainer">
                <BackButton to="/" />
                
                <TitleAndText title="Our Mission" />
            </div>
            <Footer />
        </main>
    );
}