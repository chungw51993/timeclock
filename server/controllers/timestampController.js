import Timestamp from './../models/Timestamp';
import User from './../models/User';

const timestampController = {};

timestampController.clockIn = (req, res) => {
  const { userId } = req.body;
  const d = new Date();
  const hour = `${d.getHours()}:${d.getMinutes()}`;

  Timestamp.create({
    in: hour,
    userId,
  }).then(() => {
    User.update({
      userId,
    }, {
      $set: {
        clockedIn: true,
      }
    }).then(() => {
      return res.status(200).json({
        success: true,
      });
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      err,
    });
  });
};

timestampController.clockOut = (req, res) => {
  const { userId } = req.body;
  const d = new Date();
  const hour = `${d.getHours()}:${d.getMinutes()}`;
  d.setHours(d.getHours() - 24);

  Timestamp.findOne({
    userId,
    date: {
      $gt: d,
    },
  }).then((timestamp) => {
    if (timestamp) {
      timestamp.out = hour;
      timestamp.save((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            err,
          });
        }
        User.update({
          userId,
        }, {
          $set: {
            clockedIn: false,
          }
        }).then(() => {
          return res.status(200).json({
            success: true,
          });
        });
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'User hasn\'t clocked in yet',
      });
    }
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      success: false,
      err,
    });
  });
};

export default timestampController;
