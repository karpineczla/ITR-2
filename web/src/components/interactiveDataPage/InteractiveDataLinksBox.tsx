import { useEffect, useState } from "react";
import { client } from "../../sanityClient";

interface InteractiveLink {
    _key: string;
    label: string;
    href: string;
}

export default function InteractiveDataLinksBox() {
    const [links, setLinks] = useState<InteractiveLink[]>([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const query = `*[_type == "interactiveData"][0]{
                  links[]{
                    _key,
                    label,
                    href
                  }
                }`;

                const result = await client.fetch(query);
                const fetchedLinks = (result?.links || []).filter((link: InteractiveLink) => link?.label && link?.href);
                setLinks(fetchedLinks);
            } catch (error) {
                setLinks([]);
            }
        };

        fetchLinks();
    }, []);

    if (links.length === 0) {
        return null;
    }

    return (
        <div className="links-box" role="navigation" aria-label="Interactive data links">
            {links.map((link) => (
                <a key={link._key} href={link.href} className="links-box__link">
                    {link.label}
                </a>
            ))}
        </div>
    );
}