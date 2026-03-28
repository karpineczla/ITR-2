import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import ContactList from "../components/contactPage/ContactList";
import BackButton from "../components/general/BackButton";
import '../styles/ContactCards.css';

export default function Contact() {
    return (
        <main className="contact-page">
            <Header />
            <BackButton to="/" />
            <ContactList />
            <Footer />
        </main>
    );
}