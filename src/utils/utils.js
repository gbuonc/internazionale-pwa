import request from 'superagent';
import config from '../config';

const getItems = (path, callback, handleErrors, timeout=15000) =>{
   request.get(config.APIendpoint+path)
   .set("Accept", "application/json")
   .timeout(timeout)
   .end(function(err, res){
      try{
         if(res.status != 200 || err){
            // catch network errors (es. timeout, 4xx or 5xx)
            let errorMessage;
            if(err.timeout){
               console.log('TIMEOUT ERROR', path);
               errorMessage = 'Il server ha impiegato troppo tempo a rispondere.';
            }else{
               console.log('GENERIC ERROR', path);
               errorMessage = `${err} (${res.status})`;
            }
            handleErrors(errorMessage);
         }
         else{
            const items = JSON.parse(res.text);
            callback(items);
         }
      }
      catch(e){
         // catch other errors
         handleErrors('Impossibile raggiungere l\'API');
         console.log('CATCH ERROR', e);
      }
   })
}

export {getItems};
/*const callRemoteAPI = (method, url, data, callback, handleErrors, tmout=15000) =>{
   const req = request(method, url)
   .withCredentials()
   .set('Content-Type', 'application/x-www-form-urlencoded')
   .timeout(tmout)
   .send(data)
   .end(function(err, res){
      try{
         if(res){
            console.log(res);
            // catch API error
            if(res.body.errors && res.body.errors.length>0){
               console.log('API ERROR', url);
               handleErrors(res.body.errors[0]);
            }else{
               // everything seems alright
               if(res.body){
                  console.log('OK', url);
                  callback(res);
               }
            }
         }else{
            // catch network errors (es. timeout, 4xx or 5xx)
            let errorMessage;
            if(err.timeout){
               console.log('TIMEOUT ERROR', url);
               errorMessage = 'Il server ha impiegato troppo tempo a rispondere.';
            }else{
               console.log('GENERIC ERROR', url);
               errorMessage = err.response.body;
            }
            handleErrors(errorMessage);
         }
      }
      catch(e){
         // catch other errors
         console.log('CATCH ERROR', url);
         console.log(e);
         // let errorMessage = `Si è verificato un errore (${e}).`;
         // handleErrors(errorMessage);
      }
   });
}

// ------------------------------------------------
const setStateFromLocalStorage = (component)=>{
   // first check if localstorage is present and parse it
   const localData = getLocalStorage(storageKey);
   const now = getTimestamp();
   // if we have localStorage, it has a user_id and local timestamp has not expired use localdata
   if(localData && localData.user_id && localData.timeStamp && now-localData.timeStamp < component.props.localStorageExpire){  
      console.log('UPDATING STATE FROM LOCALSTORAGE');
      component.setState({
         user_id : localData.user_id,
         avatar : localData.avatar,
         avatar_type : localData.avatar_type,
         hasFBConnect : localData.hasFBConnect,
         followed : localData.followed, 
         blocked_commenters : localData.blocked_commenters
      });
   }else{
      // otherwise get info from API
      callRemoteAPI('get', remoteAPI, null, (resp)=>{
         if(!resp.body.data.user_id) return; // don't get user state if user is not defined
         console.log('UPDATING STATE FROM REMOTE API');
         const updatedState ={
            user_id : resp.body.data.user_id,
            avatar : resp.body.data.user_avatar,
            avatar_type : resp.body.data.user_avatar_type,
            hasFBConnect : resp.body.data.facebook_connect,
            followed : resp.body.data.followed, 
            blocked_commenters : resp.body.data.blocked_commenters
         }
         component.setState(updatedState, function(){
            updateLocalStorage(updatedState);
         });
      });
   }
}
// ------------------------------------------------
function updateLocalStorage(data){
   // merge a new object with object in localstorage
   let tmpStorage = getLocalStorage(storageKey);
   tmpStorage.timeStamp = getTimestamp();
   const updatedStorage = Object.assign(tmpStorage, data);
   console.log('updating localstorage :::::::::::::::');
   localStorage.setItem(storageKey, JSON.stringify(updatedStorage));
}
// ------------------------------------------------
function getLocalStorage(){
   const ret = JSON.parse(localStorage.getItem(storageKey)) || {};
   return ret;
}

// ------------------------------------------------
function getTimestamp(){
   return Math.floor(Date.now()/1000); //set date in seconds to have the same php time unit
}
// ------------------------------------------------
export {callRemoteAPI, setStateFromLocalStorage, updateLocalStorage, getLocalStorage, getTimestamp};*/