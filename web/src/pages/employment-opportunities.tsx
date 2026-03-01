import { useState, useEffect } from "react";
import { client } from '../sanityClient';
import { PortableText } from '@portabletext/react'; // Install this: npm install @portabletext/react
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
  footerText: any;
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

  if (loading) return <div className="loading">Loading Opportunities...</div>;
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
          <PortableText value={data.footerText} />
        </div>
      </div>
      <Footer />
    </main>
  );
}