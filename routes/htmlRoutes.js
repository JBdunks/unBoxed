const express = require("express");
const router = express.Router();
const db = require("../models")
// html route file for page queries
// const User = require('../models/userModel.js');
// const Games = require('../models/gameModel.js');

// Create all our routes and set up logic within those routes where required.
module.exports = function(router){
router.get("/", (req,res) => {
  db.Game.findAll({limit : 10}).then(data => {
    
    let allGamesObject = {
      games: data
  
    };
    res.render("index", allGamesObject);

  });
});

router.get("/popular", (req, res) => {
  db.Game.findAll({order: {
    rank: 'ASC'
  }}).then(data => {
    let rankedGames = {
      games: data
      //limit?
    }
    res.render("index", rankedGames)
  });

});

router.get("/search/:search", (req, res) => {
  db.Game.findAll({where: {
    names: req.params.search,
  }}).then(data => {
    console.log("--------------", data)
    res.render("game", data);
  });
});



// router.get("/search"), (req, res) =>

router.get("/games/:id", (req, res) => {
  console.log(req.params.id)
  db.Game.findOne({where: {
    id: req.params.id
  }}).then( data => {
    console.log("!!!!!!!!!!!!!!!!!", data);
    res.render("game", data)
  })
})

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req,res) => {
  res.render("signUp");
})

router.get("/user/:id",  (req,res) => {
  db.User.findOne({where: {id: req.params.id}, Include: [db.Game] }).then(thisUser => {
    // console.log(thisUser)
    res.render("user", thisUser);
    // res.json(thisUser);
  });

});


router.get("/authfailed", (req, res) => {
  res.render("pleaseLogin")
})

router.get("/addGames", (req, res) => {
  router.get("/", (req,res) => {
    db.Game.findAll({limit : 10}).then(data => {
      
      let allGamesObject = {
        games: data
    
      };
      //userAddGames?
  res.render("userAddGames", allGamesObject)
})
  })

})
}


