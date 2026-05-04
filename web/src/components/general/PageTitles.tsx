import { useEffect, useState } from 'react';
//import { useLocation } from 'react-router';
// Not in use
const PageTitle = () =>{
  const [data, setData] = useState<any>(null);

  const PROJECT_ID = "a9qy1267"; 
  const DATASET = "production";
  //const location = useLocation();
  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "header"][0]{
      "logoUrl": logo.asset->url,
      announcements[]{ text, link },
      navLinks
    }`);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.result));
  }, []);

  const links = data?.navLinks || [];
  const title =links.name;
  return(
    <title>{title}</title>
  );
};

export default PageTitle;