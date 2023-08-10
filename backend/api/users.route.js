import express from "express";
//           /api/v1/users

const users = [
  {
    username: "name1",
    pass: "pass1",
  },
  {
    username: "name2",
    pass: "pass2",
  },
];

const usersRouter = express.Router();

usersRouter.route("/").get((req, res) => {
  res.json(users);
});

usersRouter.route("/login").post((req, res) => {
  const userName = req.body.name;
  const pass = req.body.id;
  const userExitstance = checkUserVerfication(userName, pass);
  if (userExitstance) {
    res.json(userExitstance);
  } else {
    res.json(null);
  }
});

const checkUserVerfication = (userName, pass) => {
  let myUser;
  for (const theUser of users) {
    if (theUser.username == userName && theUser.pass == pass) {
      myUser = theUser;
    }
  }
  return myUser;
};

usersRouter.route("/signup").post((req, res) => {
  const userName = req.body.name;
  const pass = req.body.id;
  if(checkUserExist(userName)){
    res.json('user already exists')
  }else{
    users.push({
        username: userName,
        pass: pass
    })
    console.log(users);
    res.json('new user is created')
  }
});

const checkUserExist = (username) => {
    let boolieen = false
    for (const theUser of users) {
        if (theUser.username == username ) {
          boolieen = true
        }
    }
    return boolieen
}

export default usersRouter;
