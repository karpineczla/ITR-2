import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import "../../styles/Carousel.css";

interface Report {
    _key: string;
    title: string;
    description: string;
    href: string;
    buttonText?: string;
    datetime?: string;
}

interface CarouselData {
    title?: string;
    cards?: Report[];
}

interface CarouselProps {
    sectionKey?: string;
}

export default function Carousel({ sectionKey }: CarouselProps) {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [sectionTitle, setSectionTitle] = useState("Visitor Trends");

    useEffect(() => {
        const fetchCarouselReports = async () => {
            try {
                const query = `*[_type == "carousel" && (!defined($sectionKey) || sectionKey == $sectionKey)] | order(_updatedAt desc)[0]{
                  title,
                  cards[]{
                    _key,
                    title,
                    description,
                                        "href": link,
                                        buttonText,
                                        datetime
                  }
                }`;

                const params = sectionKey ? { sectionKey } : { sectionKey: null };
                const result: CarouselData | null = await client.fetch(query, params);
                const cards = (result?.cards || []).filter((card: Report) => card?.title && card?.description && card?.href);
                if (result?.title) {
                    setSectionTitle(result.title);
                }
                setReports(cards);
            } catch (error) {
                setReports([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCarouselReports();
    }, [sectionKey]);

    useEffect(() => {
        if (activeIndex > reports.length - 1) {
            setActiveIndex(0);
        }
    }, [reports, activeIndex]);

    if (loading) {
        return (
            <section className="visitor-trends" aria-label="Visitor Trends reports carousel">
                <h2 className="visitor-trends__title">{sectionTitle}</h2>
                <div className="visitor-trends__card">Loading...</div>
            </section>
        );
    }

    if (reports.length === 0) {
        return null;
    }

    const activeReport = reports[activeIndex];

    const goPrev = () => {
        setActiveIndex((current) => (current === 0 ? reports.length - 1 : current - 1));
    };

    const goNext = () => {
        setActiveIndex((current) => (current === reports.length - 1 ? 0 : current + 1));
    };

    return (
        <section className="visitor-trends" aria-label="Visitor Trends reports carousel">
            <h2 className="visitor-trends__title">{sectionTitle}</h2>

            <div className="visitor-trends__carousel" role="group" aria-live="polite" aria-label={`Slide ${activeIndex + 1} of ${reports.length}`}>
                <button type="button" className="visitor-trends__arrow" onClick={goPrev} aria-label="Previous report">
                    &#8249;
                </button>

                <div className="visitor-trends__card">
                    <h3 className="visitor-trends__card-title">{activeReport.title}</h3>
                    <p className="visitor-trends__card-text">{activeReport.description}</p>
                    {activeReport.datetime && (
                        <p className="visitor-trends__card-bold">{activeReport.datetime}</p>
                    )}
                    <a className="visitor-trends__link" href={activeReport.href}>
                        {activeReport.buttonText || "View report"}
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