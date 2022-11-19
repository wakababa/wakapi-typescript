const controllerTemplate = ({ apiname, prop }) => {
  return`
     const express = require('express')
     const router = express.Router();
     const ${apiname}Modal = require("../models/${apiname}");

     // api name ${apiname} 

     router.get("/", async(req, res) => {

      res.send(await  ${apiname}Modal.find())
});
router.get("/props", async(req, res) => {
   const data = [${prop.map((item) => JSON.stringify(item))}]
  await res.send(data)
});

router.post("/", async (req, res) => {
    const {${prop.map((item) => item)}} = req.body
      const post1 = new ${apiname}Modal({${prop.map((item) => item)}});
   await   post1.save((err,data)=>{
          if(err){
              res.send(err)
          }else{
              res.send(data)
          }
      })
});

router.get("/:id",async(req,res)=>{
     res.send(await ${apiname}Modal.findById(req.params.id))
})
router.put("/:id",async (req,res)=>{
     res.send(await  ${apiname}Modal.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, useFindAndModify: false }
    ))
  })

  router.delete("/:id",async(req,res)=>{
     res.send(await ${apiname}Modal.findByIdAndDelete({ _id: req.params.id }))
})


     module.exports = router
     `;
};

export default controllerTemplate;
