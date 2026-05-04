import '../../styles/Footer.css';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [data, setData] = useState<any>(null);
  const PROJECT_ID = "a9qy1267"; 
  const DATASET = "production";
  function footerBreak(text:string){
    // To see is a row needs to be given more space
    if (text==" "||text=="" || text=="   "){
      return true
    }
    return false
  };

  //Query to get data from sanity studio
  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "footer"][0]{
      leftFooter[]{ row, link },
      middleLinks,
      socialMedia
    }`);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.result));
    }, []);
  const middle = data?.middleLinks ||[];
  const socialMedia =data?.socialMedia||[];
  
  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <div className="topSection">
          <div className="addressSection">
            {data?.leftFooter?.map((rows: any, i: number) => (
              <p className={footerBreak(rows.row)?"addressBreak":""} key={i}>
                {rows.link ? (
                  <a href={rows.link}>
                    {rows.row}
                  </a>
                ) : (
                  rows.row
                )}
              </p>
            ))}
          </div>

          <div className="linksSection">
            <a href={middle.link1} className="footerLink">{middle.text1}</a>
            <div className="divider"></div>
            <a href={middle.link2} className="footerLink">{middle.text2}</a>
            <div className="divider"></div>
            <a href={middle.link3} className='footerLink'>{middle.text3}</a>
          </div>
        </div>

        <div className="socialSection" >
          <div className='FollowUs'>
             <p>Check us out on Social Media</p>
          </div>
         
         <div className='socialIcons'>
          <a href={socialMedia.youtube} aria-label="YouTube">
            <svg className="socialIcon" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 2 1 9.3 1 9.3 1s7.3 0 9.3-1c1.1-.3 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
          </a>
          <a href={socialMedia.instagram} aria-label="Instagram">
            <svg className="socialIcon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href={socialMedia.linkedin} aria-label="LinkedIn">
            <svg className="socialIcon" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href={socialMedia.facebook} aria-label="Facebook">
            <svg className="socialIcon" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
          </a>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer