import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import { useState } from "react";
import Carousel from "../components/interactiveDataPage/Carousel";
import InteractiveDataLinksBox from "../components/interactiveDataPage/InteractiveDataLinksBox";
import "../styles/interactiveData.css";

const QuarterlyTabs: React.FC = () => {
    const [active, setActive] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q1");

    const data: Record<string, { title: string; items: { label: string; href: string }[] }> = {
        Q1: {
            title: "Q1 — Jan–Mar",
            items: [
                { label: "Q1 Overview", href: "/interactive-data/q1/overview" },
                { label: "Q1 Map", href: "/interactive-data/q1/map" },
            ],
        },
        Q2: {
            title: "Q2 — Apr–Jun",
            items: [
                { label: "Q2 Overview", href: "/interactive-data/q2/overview" },
                { label: "Q2 Reports", href: "/interactive-data/q2/reports" },
            ],
        },
        Q3: {
            title: "Q3 — Jul–Sep",
            items: [
                { label: "Q3 Dashboard", href: "/interactive-data/q3/dashboard" },
                { label: "Q3 Downloads", href: "/interactive-data/q3/downloads" },
            ],
        },
        Q4: {
            title: "Q4 — Oct–Dec",
            items: [
                { label: "Q4 Summary", href: "/interactive-data/q4/summary" },
                { label: "Q4 Sources", href: "/interactive-data/q4/sources" },
            ],
        },
    };

    return (
        <div className="quarter-tabs" aria-live="polite">
            <div className="quarter-tabs__list" role="tablist" aria-label="Quarter tabs">
                {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                    <button
                        key={q}
                        type="button"
                        id={`tab-${q}`}
                        role="tab"
                        aria-selected={active === q}
                        aria-controls={`panel-${q}`}
                        className={`quarter-tabs__tab ${active === q ? "is-active" : ""}`}
                        onClick={() => setActive(q)}
                    >
                        {q}
                    </button>
                ))}
            </div>

            {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                <section
                    key={q}
                    id={`panel-${q}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${q}`}
                    hidden={active !== q}
                    className="quarter-tabs__panel"
                >
                    <h3 className="quarter-tabs__panel-title">{data[q].title}</h3>
                    <ul className="quarter-tabs__links">
                        {data[q].items.map((it) => (
                            <li key={it.href}>
                                <a href={it.href}>{it.label}</a>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
};

export default function InteractiveData() {
    return (
        <main className="interactive-data-page">
            <Header />
            <TitleAndText title="Interactive Data" />

            <InteractiveDataLinksBox />

            <QuarterlyTabs />

            <div className="report-box" role="region" aria-label="Search and request reports">
                <div className="report-box__content">
                    <p className="report-box__text">
                        ITRR&apos;s Interactive Data puts recent and relevant Montana travel data at your fingertips, giving you the
                        power to choose the data that best suits your needs and satisfies your curiosity.
                        <br />
                        <br />
                        Nonresident travel data, as well as travel-related trend data, are available for your use.
                    </p>
                </div>

                <div className="report-box__actions">
                    <a href="/interactive-data/search" className="btn btn--red" aria-label="Search reports">
                        Search
                    </a>
                    <a href="/interactive-data/request-report" className="btn btn--red" aria-label="Request a report">
                        Request
                    </a>
                </div>
            </div>

            <Carousel />

            <Footer />
        </main>
    );
}