import Header from '../components/general/Header'
import Footer from '../components/general/Footer'
import ButtonCards from '../components/general/ButtonCards';
import TitleAndText from '../components/general/TitleAndText';


export default function GetInvolved() {
    return (
        <main className="home">
            <Header />
            <TitleAndText sectionKey="get-involved-intro" />
            <ButtonCards sectionKey="get-involved" />
            <Footer />
        </main>
    );
}