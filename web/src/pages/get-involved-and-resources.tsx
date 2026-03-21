import Header from '../components/general/Header'
import Footer from '../components/general/Footer'
import ButtonCards from '../components/general/ButtonCards';


export default function GetInvolved() {
    return (
        <main className="home">
            <Header />
            <ButtonCards sectionKey="get-involved" />
            <Footer />
        </main>
    );
}