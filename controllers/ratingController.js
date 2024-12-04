const Rating = require('../models/Rating');

// 获取当前用户对其他用户的所有评分
const getUserRatings = async (req, res) => {
  const userId = req.user.id;

  try {
    const ratings = await Rating.find({ user_id: userId })
      .populate('rated_user_id', 'username')  // 关联被评分的用户
      .exec();
    
    if (ratings.length === 0) {
      return res.status(404).json({ message: "没有找到评分记录。" });
    }
    
    res.status(200).json(ratings);
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ message: "获取评分失败。" });
  }
};

// 给某个用户打分
const rateUser = async (req, res) => {
  const { ratedUserId, rate } = req.body;
  const userId = req.user.id;

  if (!ratedUserId || !rate) {
    return res.status(400).json({ message: "被评分用户ID和评分内容不能为空。" });
  }

  try {
    // 创建评分记录
    const newRating = new Rating({
      user_id: userId,
      rated_user_id: ratedUserId,
      rate,
    });

    await newRating.save();

    res.status(201).json({ message: "评分成功！" });
  } catch (err) {
    console.error('Error saving rating:', err);
    res.status(500).json({ message: "评分失败。" });
  }
};

module.exports = { getUserRatings, rateUser };
