-------- Installing and Setup -------- 

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
   sanity cors add http://localhost:5173

-------- To Run the React App --------
1. cd into the web folder
2. run "npm run dev"
3. follow the URL

-------- To Run Sanity Studio --------
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
