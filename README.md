## 2026 Capstone - ITRR 

**Summary**

This is our senior year capstone project. It is a year long project with the first semester focused on planning and gathering feedback, and the second semester dedicated to implementing and finalizing the project. We are working with ITRR (Institute for Tourism and Recreational Research) at the University of Montana. We are taking their current site, redesigning it, moving it to another hosting platform, building out their databases, and delivering a polished website that reflects their needs and branding. 

Wireframe: https://www.figma.com/design/QUX5gP9tTtS7K3z67uBpfk/ITRR-high-fidelity-prototype?node-id=0-1&m=dev&t=BPjxce6Avwg8QvnJ-1

**Tech Stack**
- React and Vite
- Firebase Hosting
- Sanity Studio (headless cms)
- TypeScript

**Challenges**
- add these after

**Accomplishments**
- add these after too

## Installing and Setup

1. create a new folder (I used ITRR) and cd into it
2. clone the repo to your machine
   https://github.com/karpineczla/ITR-2
3. you should now have a folder called ITRR-new-site
4. install the sanity client globally
   npm install -g @sanity/cli
5. cd into the studio folder
6. install dependencies for sanity
   npm install
7. cd into the web folder and install dependencies
   npm install
8. install CORS for sanity, cd into the studio folder and run
   sanity cors add http://localhost:5173 (need to add whatever the url is for your local host)

**To Run the React App**
1. cd into the web folder
2. run "npm run dev"
3. follow the URL

**To Run Sanity Studio**
1. cd into the studio folder
2. run "npm run dev" or "sanity dev"
3. follow the URL

-------- To Add Firebase ---------
1. install firebase globally with "npm install -g firebase-tools" if its not installed already 
2. in the main project directory run firebase login
3. enter credentials 

-------- To Deploy Changes ----------
1. run "firebase serve" to host locally 
or
2. cd into web and run "npm run build" to get latest build
3. run cd .. to get into project root
4. run "firebase deploy --only hosting" to deploy changes to the web
