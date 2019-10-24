// const express = require('express');
// const models = require('../models');
// const router = express.Router();
//
// /* GET users list. */
// router.get('/', async function(req, res, next) {
//   const users = await models.Users.findAll();
//   if (users) {
//     res.json({
//       "status": true,
//       "users": users.map((user) => {
//         return {
//           "username": user.username,
//           "phone_num": user.phone_num,
//           "address": user.address,
//           "location": user.location
//         }
//       })
//     })
//   } else {
//     res.json({
//       "status": false,
//       "message": "유저가 존재하지 않습니다."
//     })
//   }
// });
//
// router.get('/:username', async function(req, res, next) {
//   const username = req.params.username;
//   const user = await models.Users.findOne({
//     where: {username: username}
//   });
//   if (user) {
//     res.json({
//       "status": true,
//       "username": user.username,
//       "phone_num": user.phone_num,
//       "address": user.address,
//       "location": user.location
//     })
//   } else {
//     res.json({
//       "status": false,
//       "message": "일치하는 유저가 없습니다."
//     })
//   }
// });
//
// module.exports = router;
