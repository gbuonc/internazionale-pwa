import Home from "./components/sections/cards/Home";
import Now from "./components/sections/cards/Now";
import Opinions from "./components/sections/cards/Opinions";
import Reportage from "./components/sections/cards/Reportage";
import Stories from "./components/sections/cards/Stories";
import Portfolio from "./components/sections/cards/Portfolio";
import Videos from "./components/sections/cards/Videos";
import Science from "./components/sections/cards/Science";
import Countries from "./components/sections/cards/Countries";
import Rules from "./components/sections/cards/Rules";

const config = {
   APIendpoint :'https://scraper-gbuonc.rhcloud.com/internazionale/stream_data/',
   storageKey: 'ipwa',
   sections:[
      {
         label:'Home',
         component:Home,
         url:'items/home/0/0/'
      } ,
      // {
      //    label:'Il Mondo adesso',
      //    component:Now,
      //    url:'items/home/0/0/'
      // },
      {
         label:'Opinioni',
         component:Opinions,
         url:'items/opinioni/0/0/'
      },
      {
         label:'Reportage',
         component:Reportage,
         url:'items/reportage/0/0/'
      },
      {
         label:'Portfolio',
         component:Portfolio,
         url:'items/portfolio/0/0/'
      },
      // {
      //    label:'Video',
      //    component:Videos,
      //    url:'items/video/0/0/'
      // },
      // {
      //    label:'Scienza',
      //    component:Science,
      //    url:'items/scienza/0/0/'
      // },
      // {
      //    label:'Paesi',
      //    component:Countries,
      //    url:'items/paesi/0/0/'
      // },
      {
         label:'Le Regole',
         component:Rules,
         url:'items/regole/0/0/'
      }
   ]
}
export default config;