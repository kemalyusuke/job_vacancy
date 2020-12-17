const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.getHomeHandler)

router.get('/register', Controller.getRegisterHandler)
router.post('/register', Controller.postRegisterHandler)

router.get('/logout', Controller.getLogoutHandler)

router.get('/login', Controller.getLoginHandler)
router.post('/login', Controller.postLoginHandler)

const checkCompany = (req, res, next) => {
  if(req.session.role === 'company') next()
  else res.redirect('/jobs?error=Not Company')
}
const checklogin = (req, res, next) => {
  if(req.session.UserId) next()
  else res.redirect('/login?error=Login First')
}
const checkApplicant = (req, res, next) => {
  if(req.session.role === 'applicant') next()
  else res.redirect('/jobs?error=Not Applicant')
}

router.get('/jobs/add' ,checklogin, checkCompany, Controller.getAddJobHandler)
router.post('/jobs/add' ,checklogin, checkCompany, Controller.postAddJobHandler)

router.get('/jobs/update/:JobId' ,checklogin, checkCompany, Controller.getUpdateJobHandler)
router.post('/jobs/update/:JobId' ,checklogin, checkCompany, Controller.postUpdateJobHandler)

router.get('/jobs/delete/:JobId' ,checklogin, checkCompany, Controller.getDeleteJobHandler)
router.get('/jobs/drop/:JobId' ,checklogin, checkCompany, Controller.getDropJobHandler)
router.get('/jobs/up/:JobId' ,checklogin, checkCompany, Controller.getUpJobHandler)

router.get('/apply/:JobId', checklogin, checkApplicant, Controller.getApplyJobHandler)


router.get('/jobs', Controller.getJobHandler)

module.exports = router