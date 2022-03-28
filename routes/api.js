const express = require("express");
const router = express.Router();
const app = express();
const posts = require("../posts");
const { v4: uuidv4 } = require("uuid");
const { query } = require("express");

router.use(express.json());

router.get("/", (request, response) => {
  return response.json(posts);
});

router.post("/posts", (request, response) => {
  const { title } = request.body;
  const { desc } = request.body;

  posts.push({
    id: uuidv4(),
    title,
    desc,
    done: false,
  });

  return response.status(200).send(posts);
});

router.delete("/delete/posts/:id", (request, response) => {
  const { id } = request.params;
  const validateID = posts.findIndex((post) => post.id === id);

  if (validateID >= 0) {
    posts.splice(validateID, 1);
    return response.status(201).json(posts);
  }
  return response.json({ error: "erro" });
});

router.patch("/update/posts/:id/done", (request, response) => {
  const { id } = request.params;
  const  done = request.body.done;

  const validateID = posts.findIndex((post) => post.id === id);

  if (validateID >= 0) {
    const doneId = posts.find((post) => post.id === id);
    doneId.done = done;

    return response.status(201).json({ ok: "modificado" });
  }
});
// router.put('/update/posts/:id',(request, response)=>{
//     const id = request.params.id
//     const validateID = posts.findIndex( post => post.id === id )

//     if(validateID){
//     posts.filter(post => {
//         if( post.id === id ){

//             post.title = request.body.title
//             post.desc = request.body.description
//         }
//     })
//         return response.status(201).json({ok: 'modificado'})
//     }else{
//         return response.status(401).json('post not found')
//     }
// })

module.exports = router;
