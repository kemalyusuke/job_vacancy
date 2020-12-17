const { User, Job, Apply } = require('../models')
const { validatePassword } = require('../helpers/bcrypt');
class Controller {
  static getHomeHandler(req, res) {
    let isLogin = false
    if(req.session.UserId) isLogin = true
    res.render('home', {isLogin, isJob: false, pageName : 'Home'})
  }
  static getRegisterHandler(req, res) {
    res.render('register', {isLogin: false, isJob: false, pageName : 'Register'})
  }
  static postRegisterHandler(req, res) {
    let param = {
      username:req.body.username ,
      password:req.body.password ,
      email:req.body.email ,
      first_name:req.body.first_name ,
      last_name:req.body.last_name ,
      role:req.body.role 
    }
    User.create(param)
    .then(data => {
      res.redirect('/login')
    })
    .catch(err =>{
      res.send(err)
    })
  }
  static getLogoutHandler(req, res) {
    req.session.destroy();
    res.redirect('/')
  }
  static getLoginHandler(req, res) {
    let errMessage
    if(req.query.error) errMessage = req.query.error

    res.render('login', {isLogin: false, isJob: false, errMessage ,pageName : 'Login'})
  }
  static postLoginHandler(req, res) {
    User.findOne({
      where: {
        username:req.body.username
      }
    })
    .then(data => {
      if(data) {
        const isValidPassword = validatePassword(req.body.password, data.password)
        if(isValidPassword) {
          req.session.UserId = data.id
          req.session.role = data.role
          res.redirect('/')
        } else {
          res.redirect('/login?error=Please Check your Username and Password!')
        }
      } else {
        res.redirect('/login?error=Username Not Found!')
      }
    })
    .catch(err =>{
      res.send(err)
    })
  }
  static getAddJobHandler(req, res) {
    Job.findAll({
      include: User
    })
    .then(data => {
      res.render('addJob', {data, isLogin: true, isCompany: true, isJob: true, pageName : 'Create Job'})
    })
  }
  static postAddJobHandler(req, res) {
    let param = {
      name: req.body.name,
      skill: req.body.skill,
      salary: req.body.salary,
      status: 'up',
      UserId: req.session.UserId
    }
    Job.create(param)
    .then(data => {
      res.redirect('/jobs/add')
    }).catch(err => {
      res.send(err)
    })

  }
  static getJobHandler(req, res) {
    let errMessage
    if(req.query.error) errMessage = req.query.error
    let isCompany = false
    if(req.session.role === 'company') isCompany = true
    let isLogin = false
    if(req.session.UserId) isLogin = true

    Job.findAll({
      where: {
        status: 'up'
      },
      include: User
    })
    .then(data => {
      res.render('jobs', {data, isLogin, isCompany, isJob: true, errMessage, pageName : 'Job List'})
    })
  }
  static getDropJobHandler(req, res) {
    Job.update({status: 'down'},{
      where: {
        id:req.params.JobId
      }
    })
    .then((data) =>{
      res.redirect('/jobs/add')
    })
    .catch(err => res.send(err.message))
  }
  static getUpJobHandler(req, res) {
    Job.update({status: 'up'},{
      where: {
        id:req.params.JobId
      }
    })
    .then((data) =>{
      res.redirect('/jobs/add')
    })
    .catch(err => res.send(err.message))
  }
  static getDeleteJobHandler(req, res) {
    Job.destroy({
      where: {
        id:req.params.JobId
      }
    })
    .then((data) =>{
      res.redirect('/jobs/add')
    })
    .catch(err => res.send(err.message))
  }

}
module.exports = Controller