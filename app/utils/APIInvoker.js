var configuration = require('../../config')
const debug = configuration.debugMode

class APIInvoker {
  getAPIHeader(){
    return {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem("token"),
    }
  }
  invokeGET(url, okCallback, failCallback){
    let params = {
      method: 'get',
      headers: this.getAPIHeader()
    }
    this.invoke(url, okCallback, failCallback,params);
  }
  invokePUT(url, body, okCallback, failCallback){
    let params = {
      method: 'put',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback,params);
  }
  invokePOST(url, body, okCallback, failCallback){
    let params = {
      method: 'post',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };
    this.invoke(url, okCallback, failCallback,params);
  }
  invoke(url, okCallback, failCallback,params){
    if(debug){
      console.log("Invoke => " + params.method + ":" + url );
      console.log(params.body);
    }
    console.log('Aqui estamos'+`${url}`);
    fetch(`${configuration.server.host}:${configuration.server.port}${url}`, params)
    .then((response) => {
      if(debug){
        console.log("Invoke Response => " );
        console.log(response);
      }
      return response.json()
    })
    .then((responseData) => {
        if(responseData.ok){
          okCallback(responseData)
        }else{
          failCallback(responseData)
        }
    })
  }
}
export default new APIInvoker();