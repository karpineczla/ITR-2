import CenteredTitleAndText from "../components/general/CenteredTitleAndText";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import LearnMoreButton from "../components/general/LearnMoreButton";
import TitleAndText from "../components/general/TitleAndText";
import ResourceCard from "../components/resourcesPage/ResourceCard";

export default function Resources() {
    return (
        <main className="resources-page">
            <Header />
            <TitleAndText title="Montana and Outdoor Recreation"/>
            <ResourceCard />
            <TitleAndText title="Outdoor Recreation in the United States"/>
            <ResourceCard />
            <CenteredTitleAndText />
            <LearnMoreButton buttonKey="test" />
            <Footer />
        </main>
    )
}