import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import { useState } from "react";
import '../styles/employmentOpportunities.css'

type JobTab = 'Student - NPS' | 'Student' | 'Public' | 'Public - NPS';

interface JobDetails {
  title: string;
  description: string;
}

export default function EmploymentOpportunities() {
/**/ 
  const [activeTab, setActiveTab] = useState<JobTab>('Student - NPS');

  const jobs: Record<JobTab, JobDetails> = {
    'Student - NPS': {
      title: 'Student Opportunities - National Park Service Surveying, Temporary Work',
      description: 'ITRR and its research partners (RRC Associates and OTAK) have a contract with the National Park Service to study visitor use and social issues to help improve park planning and management. This job would involve work for ITRR and/or one of our partners and traveling to National Parks and surveying visitors. Travel, lodging, and per diem meals are included. Pay is up to $20/hour. Work is typically a 7-12 day time commitment per park, including travel. Multiple parks may be available. Contact us for more information about dates!'
    },
    'Student': {
      title: 'General Student Research Assistant',
      description: 'Assist with data entry, literature reviews, and basic analysis for ongoing tourism studies in Montana.'
    },
    'Public': {
      title: 'Field Researcher',
      description: 'Conducting in-person surveys at various Montana recreation sites and events.'
    },
    'Public - NPS': {
      title: 'NPS Professional Consultant',
      description: 'Expert-level analysis for National Park Service infrastructure and social impact projects.'
    }
  };

  return (
    <main className="employment-opportunities-page">
      <Header />
      <div className="employmentContainer">
        <h1 className="hiringHeader">WE ARE HIRING</h1>
        <p className="instructionText">Click through the tabs to see more</p>

        <div className="tabsContainer">
          <div className="tabHeader">
            {(Object.keys(jobs) as JobTab[]).map((tabName) => (
              <button
                key={tabName}
                className={`tabButton ${activeTab === tabName ? 'active' : ''}`}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </button>
            ))}
          </div>

          <div className="tabContent">
            <div className="contentTop">
              <h2 className="jobTitle">{jobs[activeTab].title}</h2>
              <button className="learnMoreBtn">Learn More</button>
            </div>
            <p className="jobDescription">{jobs[activeTab].description}</p>
          </div>
        </div>

        <div className="footerText">
          <p>
            The Institute for Tourism and Recreation Research is hiring for several different positions! 
            We conduct travel and recreation research in Montana and beyond and have a few different available positions.
          </p>
          <p>
            To apply, please send a letter of interest, resume, and 3 professional references to the contact listed 
            for the job opportunity you are interested in.
          </p>
          <p>View the opportunities listed below for more information!</p>
        </div>
      </div>
      <Footer />
    </main>
  );
} 