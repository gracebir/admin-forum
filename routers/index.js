const express = require('express');
const router = express.Router()
const mongodb = require('mongodb');
const posts = require('../models/Post');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


const binary = mongodb.Binary;


router.get('/',(req,res)=>{
    res.render('index')
});


router.get('/post',(req,res)=>{
    res.render('post')
});

router.get('/users',(req,res)=>{
    res.render('user')
});


router.get('/forum',(req,res)=>{
    res.render('forum')
});


router.get('/addpost',(req,res)=>{
    res.render('addPost')
});

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-'+ Date.now())
    }
});

const upload = multer({storage: storage});


router.post('/addpost',(req,res)=>{
    upload.single('filename')(req, res,(err)=>{
        if(err){
            console.log(`upload.single error: ${error}`)
            return res.sendStatus(500);
        }
        const body = {
            title: req.body.title,
            file: {
                data: fs.readFileSync(path.join(__dirname + '../upload/' + req.file.filename)),
                contentType: 'filename/pdf'
            }
            
        }
        // posts.create(body, (err, item)=>{
        //     if(err){
        //         console.log(err);
        //     } else {
        //         res.redirect('/post');
        //     }
        // });
    
        const post = new posts(body);
        post.save()
        .then(item => res.redirect('/post'))
        .catch(err => console.log(err));
    })
    
});





module.exports = router;