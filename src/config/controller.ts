interface IControllerTemplate{
    apiName:String,
    prop:Object
}
const controllerTemplate = ({ apiName, prop }:IControllerTemplate):string => {
  return`
     const express = require('express')
     const router = express.Router();
     const ${apiName}Modal = require("../models/${apiName}");

     // api name ${apiName}

     router.get("/", async(req, res) => {

      res.send(await  ${apiName}Modal.find())
});
router.get("/props", async(req, res) => {
   const data = [${prop.map((item) => JSON.stringify(item))}]
  await res.send(data)
});

router.post("/", async (req, res) => {
    const {${prop.map((item) => item)}} = req.body
      const post1 = new ${apiName}Modal({${prop.map((item) => item)}});
   await   post1.save((err,data)=>{
          if(err){
              res.send(err)
          }else{
              res.send(data)
          }
      })
});

router.get("/:id",async(req,res)=>{
     res.send(await ${apiName}Modal.findById(req.params.id))
})
router.put("/:id",async (req,res)=>{
     res.send(await  ${apiName}Modal.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, useFindAndModify: false }
    ))
  })

  router.delete("/:id",async(req,res)=>{
     res.send(await ${apiName}Modal.findByIdAndDelete({ _id: req.params.id }))
})


     module.exports = router
     `;
};

export default controllerTemplate;
