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


## Individual Work Process ##
1. create a new branch off of develop
2. pull from develop just to make sure everything up updated
3. work on your part
4. stage, comment, and commit any changes
5. pull from develop
6. publish branch
7. create a pull request from your branch to develop
8. resolve any merge conflcits and merge to develop
9. delete your branch to avoid confusion
