import { useState, useEffect } from "react";
import { client } from '../sanityClient';
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import '../styles/employmentOpportunities.css';

interface Job {
  tabName: string;
  jobTitle: string;
  description: string;
  externalLink?: string;
}

interface EmploymentData {
  pageHeader: string;
  instructionText: string;
  jobs: Job[];
  footerText: unknown;
}

type PortableTextMarkDef = {
  _key: string;
  _type?: string;
  href?: string;
};

type PortableTextChild = {
  _type?: string;
  text?: string;
  marks?: string[];
};

type PortableTextBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  children?: PortableTextChild[];
  markDefs?: PortableTextMarkDef[];
};

function renderPortableText(value: unknown) {
  if (!Array.isArray(value)) {
    return <p>{String(value ?? '')}</p>;
  }

  return (value as PortableTextBlock[]).map((block, blockIndex) => {
    const key = block._key ?? `block-${blockIndex}`;
    const markDefs = block.markDefs ?? [];
    const textChildren = (block.children ?? []).map((child, childIndex) => {
      const text = child.text ?? '';
      const marks = child.marks ?? [];
      const linkMark = marks.find((mark) => markDefs.some((def) => def._key === mark && def.href));
      const linkDef = markDefs.find((def) => def._key === linkMark);

      if (linkDef?.href) {
        return (
          <a key={`${key}-${childIndex}`} href={linkDef.href}>
            {text}
          </a>
        );
      }

      return <span key={`${key}-${childIndex}`}>{text}</span>;
    });

    switch (block.style) {
      case 'h2':
        return <h2 key={key}>{textChildren}</h2>;
      case 'h3':
        return <h3 key={key}>{textChildren}</h3>;
      default:
        return <p key={key}>{textChildren}</p>;
    }
  });
}

export default function EmploymentOpportunities() {
  const [data, setData] = useState<EmploymentData | null>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const query = `*[_type == "employmentOpportunities"][0]{
          pageHeader,
          instructionText,
          jobs,
          footerText
        }`;
        const result = await client.fetch(query);
        if (result) setData(result);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return null;
  if (!data || !data.jobs.length) return <div>No positions currently available.</div>;

  const activeJob = data.jobs[activeTabIndex];

  return (
    <main className="employment-opportunities-page">
      <Header />
      <div className="employmentContainer">
        <h1 className="hiringHeader">{data.pageHeader}</h1>
        <p className="instructionText">{data.instructionText}</p>

        <div className="tabsContainer">
          {/* Tab Navigation */}
          <div className="tabHeader">
            {data.jobs.map((job, index) => (
              <button
                key={index}
                className={`tabButton ${activeTabIndex === index ? 'active' : ''}`}
                onClick={() => setActiveTabIndex(index)}
              >
                {job.tabName}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tabContent">
            <div className="contentTop">
              <h2 className="jobTitle">{activeJob.jobTitle}</h2>
              {activeJob.externalLink && (
                <a 
                  href={activeJob.externalLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="learnMoreBtn"
                >
                  Learn More
                </a>
              )}
            </div>
            <p className="jobDescription">{activeJob.description}</p>
          </div>
        </div>

        <div className="footerText">
          {renderPortableText(data.footerText)}
        </div>
      </div>
      <Footer />
    </main>
  );
}