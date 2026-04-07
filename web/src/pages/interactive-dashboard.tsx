import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { client } from '../sanityClient';
import '../styles/InteractiveDashboard.css';

interface QuarterlySurveyItem {
  _key: string;
  year: number;
  quarter: string;
  label?: string;
  dashboardUrl: string;
}

export default function InteractiveDashboard() {
  const [searchParams] = useSearchParams();
  const [yearSearch, setYearSearch] = useState('');
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [selectedSurveyKey, setSelectedSurveyKey] = useState<string | null>(null);
  const [quarterlySurveys, setQuarterlySurveys] = useState<QuarterlySurveyItem[]>([]);

  const pageTitle = searchParams.get('title') || 'Interactive Dashboard';
  const embedSrc = searchParams.get('src') || '';
  const selectedYear = searchParams.get('year') || '';
  const isResidentSurveys = pageTitle.trim().toLowerCase() === 'resident surveys';
  const isFullscreen = searchParams.get('fullscreen') === '1';

  const fullscreenHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set('fullscreen', '1');
    const query = params.toString();
    return query ? `/interactive-dashboard?${query}` : '/interactive-dashboard';
  }, [searchParams]);

  const exitFullscreenHref = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('fullscreen');
    const query = params.toString();
    return query ? `/interactive-dashboard?${query}` : '/interactive-dashboard';
  }, [searchParams]);

  useEffect(() => {
    if (!isResidentSurveys) {
      return;
    }

    const fetchQuarterlySurveys = async () => {
      try {
        const query = `*[_type == "quarterlySurveys" && sectionKey in ["quartley-surveys", "quarterly-surveys"]][0]{
          surveys[]{
            _key,
            year,
            quarter,
            label,
            dashboardUrl
          }
        }`;

        const result = await client.fetch(query);
        const surveys: QuarterlySurveyItem[] = (result?.surveys || []).filter(
          (survey: QuarterlySurveyItem) =>
            Number.isFinite(survey?.year) &&
            typeof survey?.quarter === 'string' &&
            typeof survey?.dashboardUrl === 'string' &&
            survey.dashboardUrl.length > 0
        );

        surveys.sort((a, b) => {
          if (a.year !== b.year) {
            return b.year - a.year;
          }

          const order = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 } as Record<string, number>;
          return (order[b.quarter] || 0) - (order[a.quarter] || 0);
        });

        setQuarterlySurveys(surveys);
      } catch {
        setQuarterlySurveys([]);
      }
    };

    fetchQuarterlySurveys();
  }, [isResidentSurveys]);

  const yearOptions = useMemo(() => {
    if (quarterlySurveys.length > 0) {
      const years = quarterlySurveys.map((survey) => String(survey.year));
      return [...new Set(years)].sort((a, b) => Number(b) - Number(a));
    }

    // Placeholder years until this is fed from CMS.
    return ['2024', '2023', '2022'];
  }, [quarterlySurveys]);

  const surveysByYear = useMemo(() => {
    const map = new Map<string, QuarterlySurveyItem[]>();
    quarterlySurveys.forEach((survey) => {
      const key = String(survey.year);
      const existing = map.get(key) || [];
      existing.push(survey);
      map.set(key, existing);
    });
    return map;
  }, [quarterlySurveys]);

  const filteredYears = useMemo(() => {
    const q = yearSearch.trim();
    if (!q) {
      return yearOptions;
    }
    return yearOptions.filter((year) => year.includes(q));
  }, [yearOptions, yearSearch]);

  const resolvedEmbedSrc = useMemo(() => {
    if (isResidentSurveys && selectedSurveyKey) {
      const selectedSurvey = quarterlySurveys.find((survey) => survey._key === selectedSurveyKey);
      if (selectedSurvey?.dashboardUrl) {
        return selectedSurvey.dashboardUrl;
      }
    }

    if (!embedSrc) {
      return '';
    }

    const year = selectedYear || expandedYear || '';
    if (year && embedSrc.includes('{year}')) {
      return embedSrc.replaceAll('{year}', year);
    }

    return embedSrc;
  }, [embedSrc, selectedYear, expandedYear, isResidentSurveys, quarterlySurveys, selectedSurveyKey]);

  const safeEmbedSrc = useMemo(() => {
    if (!resolvedEmbedSrc) {
      return '';
    }

    try {
      const parsed = new URL(resolvedEmbedSrc);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.toString();
      }
      return '';
    } catch {
      return '';
    }
  }, [resolvedEmbedSrc]);

  return (
    <main className={`interactive-dashboard-page ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {!isFullscreen && <Header />}

      <section className="interactive-dashboard-content">
        {!isFullscreen && <h1>{pageTitle}</h1>}

        {!isFullscreen && isResidentSurveys && (
          <section className="interactive-dashboard-years" aria-label="Resident survey years">
            <label htmlFor="year-search" className="interactive-dashboard-years-label">
              Search year
            </label>
            <input
              id="year-search"
              type="text"
              inputMode="numeric"
              placeholder="Type a year"
              value={yearSearch}
              onChange={(event) => setYearSearch(event.target.value)}
              className="interactive-dashboard-years-input"
            />

            <div className="interactive-dashboard-years-list">
              {filteredYears.map((year) => {
                const isOpen = expandedYear === year;
                const yearSurveys = surveysByYear.get(year) || [];
                return (
                  <article key={year} className="interactive-dashboard-year-item">
                    <button
                      type="button"
                      className="interactive-dashboard-year-toggle"
                      aria-expanded={isOpen}
                      onClick={() => setExpandedYear(isOpen ? null : year)}
                    >
                      {year}
                    </button>
                    {isOpen && (
                      <div className="interactive-dashboard-year-panel">
                        {yearSurveys.length > 0 ? (
                          <ul className="interactive-dashboard-year-links">
                            {yearSurveys.map((survey) => {
                              const isActive = selectedSurveyKey === survey._key;
                              const text = survey.label || `${survey.quarter} ${survey.year}`;
                              return (
                                <li key={survey._key}>
                                  <button
                                    type="button"
                                    className={`interactive-dashboard-year-link ${isActive ? 'is-active' : ''}`}
                                    onClick={() => setSelectedSurveyKey(survey._key)}
                                  >
                                    {text}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p>{`No surveys configured for ${year}`}</p>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <div className={`interactive-dashboard-toolbar ${isFullscreen ? 'interactive-dashboard-toolbar--overlay' : ''}`}>
          {isFullscreen ? (
            <Link to={exitFullscreenHref} className="interactive-dashboard-fullscreen-btn">
              Exit Fullscreen
            </Link>
          ) : (
            <Link to={fullscreenHref} className="interactive-dashboard-fullscreen-btn">
              Open Fullscreen
            </Link>
          )}
        </div>

        <div className="interactive-dashboard-frame-wrap">
          {safeEmbedSrc ? (
            <iframe
              src={safeEmbedSrc}
              title={pageTitle}
              className="interactive-dashboard-frame"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="interactive-dashboard-placeholder">Embedded dashboard</div>
          )}
        </div>
      </section>

      {!isFullscreen && <Footer />}
    </main>
  );
}
