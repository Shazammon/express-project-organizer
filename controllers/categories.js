const express = require('express')
const db = require('../models')
const router = express.Router()

// GET /categories -- show all categories (along with associated projects)
router.get('/', async (req, res) => {
    try {
        const categories = await db.category.findAll({
            include: [db.project]
        })
        res.render('categories/index.ejs', { categories })
    } catch(err) {
        console.log(err)
        res.send('err')
    }
})

module.exports = router