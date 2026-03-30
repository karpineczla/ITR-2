import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import { Link } from "react-router";

interface InteractiveCard {
    _key: string;
    title: string;
    link?: string;
    imageUrl?: string;
    imageAlt?: string;
}

interface InteractiveDataDoc {
    sectionKey: string;
    cards?: InteractiveCard[];
}

export default function InteractiveDataLinksBox() {
    const [nonresidentCards, setNonresidentCards] = useState<InteractiveCard[]>([]);
    const [residentCards, setResidentCards] = useState<InteractiveCard[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                                const query = `*[_type == "interactiveData"]{
                  sectionKey,
                  cards[]{
                    _key,
                    title,
                    link,
                    "imageUrl": image.asset->url,
                    "imageAlt": image.alt
                  }
                }`;

                const docs: InteractiveDataDoc[] = await client.fetch(query);
                const nonresidentDocs = docs.filter(
                    (doc) => (doc.sectionKey || '').trim().toLowerCase() === 'nonresident'
                );
                const residentDocs = docs.filter(
                    (doc) => (doc.sectionKey || '').trim().toLowerCase() === 'resident'
                );

                const fetchedNonresident = nonresidentDocs.flatMap((doc) => doc.cards || []).filter(
                    (card: InteractiveCard) => !!card?.title
                );
                const fetchedResident = residentDocs.flatMap((doc) => doc.cards || []).filter(
                    (card: InteractiveCard) => !!card?.title
                );

                setNonresidentCards(fetchedNonresident);
                setResidentCards(fetchedResident);
            } catch (error) {
                setNonresidentCards([]);
                setResidentCards([]);
            }
        };

        fetchCards();
    }, []);

    const nonresidentToRender = nonresidentCards;
    const residentToRender = residentCards;

    return (
        <section className="interactive-links" aria-label="Interactive data links">
            <div className="interactive-links__section">
                <h2>Nonresident</h2>
                <div className="interactive-links__list" role="navigation" aria-label="Nonresident interactive data">
                    {nonresidentToRender.map((card) => (
                        <Link
                            key={card._key}
                            to={`/interactive-dashboard?title=${encodeURIComponent(card.title)}&src=${encodeURIComponent(card.link || '')}&fullscreen=1`}
                            className="interactive-links__card"
                        >
                            {card.imageUrl && (
                                <img
                                    src={card.imageUrl}
                                    alt={card.imageAlt || card.title}
                                    className="interactive-links__image"
                                />
                            )}
                            <span className="interactive-links__label">{card.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="interactive-links__section">
                <h2>Resident</h2>
                <div className="interactive-links__list" role="navigation" aria-label="Resident interactive data">
                    {residentToRender.map((card) => (
                        <Link
                            key={card._key}
                            to={`/interactive-dashboard?title=${encodeURIComponent(card.title)}&src=${encodeURIComponent(card.link || '')}&fullscreen=1`}
                            className="interactive-links__card"
                        >
                            {card.imageUrl && (
                                <img
                                    src={card.imageUrl}
                                    alt={card.imageAlt || card.title}
                                    className="interactive-links__image"
                                />
                            )}
                            <span className="interactive-links__label">{card.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}