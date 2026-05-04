import Header from '../components/general/Header';
import TitleAndText from "../components/general/TitleAndText";
import LearnMoreButton from '../components/general/LearnMoreButton';
import Footer from '../components/general/Footer';
import '../styles/Help.css';

export default function Help() {

  return (
    <main className="help-page">
      <title>ITRR | Need Help?</title>
      <Header />
      <section className="help-intro">
        <TitleAndText sectionKey="need-help" />
      </section>

      <section className="help-content">
        <div className="help-cta-wrap">
          <LearnMoreButton buttonKey="data-request" fallbackDestination="/contact" />
        </div>

        <article className="help-contact-card">
          <div className="help-contact-left">
            <TitleAndText sectionKey="help-contact" />
          </div>
          <div className="help-contact-right">
            <TitleAndText sectionKey="help-info" />
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
