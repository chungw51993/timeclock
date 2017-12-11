import Timestamp from './../models/Timestamp';
import User from './../models/User';

const timestampController = {};

timestampController.clockIn = (req, res) => {
  const { userId } = req.body;

  Timestamp.create({
    in: Date.now(),
    userId,
  }).then(() => {
    return User.update({
      userId
    }, {
      $set: {
        clockedIn: true
      }
    });
  }).then(() => {
    return res.status(200).json({
      success: true,
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
    });
  });
};

timestampController.clockOut = (req, res) => {
  const { userId } = req.body;

}

export default timestampController;
