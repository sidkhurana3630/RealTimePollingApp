const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const vote = require('../models/Vote');

const Pusher = require('pusher');

const keys = require('../config/keys'); 

// var pusher = new Pusher({
//   appId: keys.pusherAppId,
//   key: keys.pusherKey,
//   secret: keys.pusherSecret,
//   cluster: keys.pusherCluster,
//   encrypted: keys.pusherEncrypted
// });

var pusher = new Pusher({
    appId: '1066949',
    key: 'dbd01c16358e62701833',
    secret: '453aa40a9ea86bdd8bc5',
    cluster: 'ap2',
    encrypted: true
  });

router.get('/', (req,res) => {
    res.send('poll');
});

// router.post('/', (req,res) => {
//     pusher.trigger('os-poll', 'os-vote', {
//         points:1,
//         os: req.body.os
//       });
//       return res.json({success:true,message: 'Thank You for Voting'});
// });
router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({ success: true, vote: votes }));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };
console.log(newVote)
    new vote(newVote).save().then(vote => {
    console.log('1')
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });
    // console.log('dfg')
    return res.json({ success: true, message: 'Thank you for voting' });
  });
});

module.exports = router;