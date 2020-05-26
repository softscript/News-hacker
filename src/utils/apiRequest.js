import axios from 'axios';
import appBaseUrl from './../api-config/appBaseUrl';
const apiRequest = function (options) {
  const onSuccess = (response) => {
    // log each request response
    console.log(response);
    return response;
  };
  const onError = function (error) {
    if (error.response)
      // some error happened with the server side
       console.log(error.response);
    else 
      // some error happened while processing the request
      console.error('Error Message:', error.message);
      return Promise.reject(error.response || error.message);
    
  };

  // accessing the access token from the auth reducer
  return axios({
    baseURL: appBaseUrl.serverURL,
    ...options,
    headers: {
      // Authorization: accessToken,
      ...options.headers
    }
  }).then(onSuccess).catch(onError);

};
export default apiRequest;