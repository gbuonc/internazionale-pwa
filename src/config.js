import Home from "./components/sections/Home";
import Now from "./components/sections/Now";
import Opinions from "./components/sections/Opinions";
import Reportage from "./components/sections/Reportage";
import Stories from "./components/sections/Stories";
import Portfolio from "./components/sections/Portfolio";
import Videos from "./components/sections/Videos";
import Science from "./components/sections/Science";
import Countries from "./components/sections/Countries";
import Rules from "./components/sections/Rules";

const config = {
   APIendpoint :'https://scraper-gbuonc.rhcloud.com/internazionale/stream_data/',
   storageKey: 'ipwa',
   sections:[
      {
         label:'Home',
         component:Home
      } ,
      {
         label:'Il Mondo adesso',
         component:Now
      },
      {
         label:'Opinioni',
         component:Opinions
      },
      {
         label:'Reportage',
         component:Reportage
      },
      {
         label:'Storie',
         component:Stories
      },
      {
         label:'Portfolio',
         component:Portfolio
      },
      {
         label:'Video',
         component:Videos
      },
      {
         label:'Scienza',
         component:Science
      },
      {
         label:'Paesi',
         component:Countries
      },
      {
         label:'Le Regole',
         component:Rules
      }
   ]
}
export default config;