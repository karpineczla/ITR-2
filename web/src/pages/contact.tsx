import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import ContactList from "../components/contactPage/ContactList";
import '../styles/ContactPage.css';

export default function Contact() {
    return (
        <main className="contact-page">
            <Header />
            <ContactList />
            <Footer />
        </main>
    );
}