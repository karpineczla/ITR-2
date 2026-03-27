import BackButton from "../components/general/BackButton";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import LearnMoreButton from "../components/general/LearnMoreButton";
import TitleAndText from "../components/general/TitleAndText";
import ResourceCard from "../components/resourcesPage/ResourceCard";

export default function Resources() {
    return (
        <main className="resources-page">
            <Header />
            <BackButton to='/get-involved-and-resources' />
            <TitleAndText title="Montana and Outdoor Recreation"/>
            <ResourceCard />
            <TitleAndText title="Outdoor Recreation in the United States"/>
            <ResourceCard />
            <TitleAndText title="Community Resources" />
            <LearnMoreButton buttonKey="pilot-community" />
            <Footer />
        </main>
    )
}