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
