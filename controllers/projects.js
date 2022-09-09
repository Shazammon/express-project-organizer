let express = require('express')
let db = require('../models')
const project = require('../models/project')
let router = express.Router()

// POST /projects - create a new project
router.post('/', async (req, res) => {
  try {

  
  const[project, projectCreated] = await db.project.findOrCreate({
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    }
  })
  const [category, categoryCreated] = await db.category.findOrCreate({
    where: {
      name: req.body.category
    }
  }) 
  
  await project.addCategory(category)

  
   await res.redirect('/')
  
} catch {
  res.status(400).render('main/404')

}
})

// how we did it in cldass
// router.post('/', async (req, res) => {
//   try {
//     const project = await db.project.create({
//       name: req.body.name,
//       githubLink: req.body.githubLink,
//       deployLink: req.body.deployedLink,
//       description: req.body.description
//     })
//     //find or create a category
//     const [category, created] = await db.category.findOrCreate({
//       where: {
//         name: req.body.category
//       },
//       // no defaults needed
//     })
//     await category.addProject(project)
//     // could also be await project.addCategory(category)
//     res.redirect('/')

//   } catch(err) {
//     console.log(err)
//     res.status(400).render('main/404')
//   }
// })

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new

module.exports = router
