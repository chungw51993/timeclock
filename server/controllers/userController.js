import User from './../models/User';

const userController = {};

userController.findUser = (req, res) => {
  const { userId } = req.params;

  User.find({ userId })
    .then((user) => {
      return res.status(200).json({
        success: true,
        user,
      });
    }).catch((err) => {
      return res.status(500).json({
        success: false,
        err,
      });
    });
};

userController.createUser = (req, res) => {
  const { userId, firstName, lastName } = req.body;
  const admin = req.body.admin === 'true' ? true : false;

  User.create({
    userId,
    firstName,
    lastName,
    admin,
  }).then((user) => {
    return res.status(200).json({
      success: true,
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
    });
  });
};

export default userController;
