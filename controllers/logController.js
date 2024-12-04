const Log = require('../models/Log');

const getLogs = async (req, res) => {
  const userId = req.user.id;
  try {
    const logs = await Log.find({ user_id: userId });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "获取日志失败。" });
  }
};

module.exports = { getLogs };
