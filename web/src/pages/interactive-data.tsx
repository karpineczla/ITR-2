import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import { useState } from "react";
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

function VisitorTrendsCarousel() {
    const reports = [
        {
            title: "Spring Visitor Trend Snapshot",
            description: "Highlights of visitor volume, origin markets, and behavior patterns for spring season.",
            href: "/interactive-data/reports/spring-visitor-trends",
        },
        {
            title: "Summer Visitation Performance",
            description: "Seasonal comparison of total visitation, average stay, and trip purpose across key regions.",
            href: "/interactive-data/reports/summer-visitation-performance",
        },
        {
            title: "Fall Travel Behavior Insights",
            description: "Trends in overnight stays, travel spend, and destination preferences during fall months.",
            href: "/interactive-data/reports/fall-travel-behavior",
        },
        {
            title: "Winter Demand & Forecast Report",
            description: "Current winter demand indicators with a short-term outlook and regional opportunities.",
            href: "/interactive-data/reports/winter-demand-forecast",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const activeReport = reports[activeIndex];

    const goPrev = () => {
        setActiveIndex((current) => (current === 0 ? reports.length - 1 : current - 1));
    };

    const goNext = () => {
        setActiveIndex((current) => (current === reports.length - 1 ? 0 : current + 1));
    };

    return (
        <section className="visitor-trends" aria-label="Visitor Trends reports carousel">
            <h2 className="visitor-trends__title">Visitor Trends</h2>

            <div className="visitor-trends__carousel" role="group" aria-live="polite" aria-label={`Slide ${activeIndex + 1} of ${reports.length}`}>
                <button type="button" className="visitor-trends__arrow" onClick={goPrev} aria-label="Previous report">
                    &#8249;
                </button>

                <div className="visitor-trends__card">
                    <h3 className="visitor-trends__card-title">{activeReport.title}</h3>
                    <p className="visitor-trends__card-text">{activeReport.description}</p>
                    <a className="visitor-trends__link" href={activeReport.href}>
                        View report
                    </a>
                </div>

                <button type="button" className="visitor-trends__arrow" onClick={goNext} aria-label="Next report">
                    &#8250;
                </button>
            </div>

            <div className="visitor-trends__dots" aria-hidden="true">
                {reports.map((report, index) => (
                    <button
                        key={report.href}
                        type="button"
                        className={`visitor-trends__dot ${index === activeIndex ? "is-active" : ""}`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to ${report.title}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default function InteractiveData() {
    return (
        <main className="interactive-data-page">
            <Header />
            <TitleAndText title="Interactive Data" />

            <div className="links-box" role="navigation" aria-label="Interactive data links">
                <a href="https://tableau.mus.edu/t/missoula/views/ResidentAttitudes/DashboardLine?%3Aembed=y&%3Aiid=1&%3AisGuestRedirectFromVizportal=y" className="links-box__link">
                    Residend Survey - Resident Attitude Trends
                </a>
                <a href="/interactive-data/map" className="links-box__link">
                    Resident Survey - Travel Behavior Q2 2024
                </a>
                <a href="/interactive-data/time-series" className="links-box__link">
                    Nonresident Travel Survey and Visitation Data
                </a>
                <a href="/interactive-data/downloads" className="links-box__link">
                    Nonresident Travel Expenditures
                </a>
            </div>

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

            <VisitorTrendsCarousel />

            <Footer />
        </main>
    );
}