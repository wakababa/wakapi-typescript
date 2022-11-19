interface IRouteTemplate{
    apiName:String
}
const routeTemplate = ({ apiName }):object => {
  const pathurl = `/${apiName}s`;
  const pathid = `/${apiName}s/:id`;
  const data = {
    routes: [
      {
        method: "GET",
        path: pathurl.toString(),
        description:`If you want show all data in your database send get request to url ${pathurl}`
      }
      ,
      {
        method: "POST",
        path: pathurl.toString(),
        description:`If you want post data in your database send post request to url ${pathurl}`
      }
      ,
      {
        method: "PUT",
        path: pathid.toString(),
        description:`If you want update data in your database send put request to url ${pathid}`
      }
      ,
      {
        method: "DELETE",
        path: pathid.toString(),
        description:`If you want delete data in your database send delete request to url ${pathid}`
      }
    ],
  };

  return data;
};


export default routeTemplate
