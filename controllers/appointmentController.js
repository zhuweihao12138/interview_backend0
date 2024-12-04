const Appointment = require('../models/Appointment');
const Log = require('../models/Log');
const { createAgoraMeeting } = require('../utils/agoraAPI');

const getAppointments = async (req, res) => {
    const userId = req.user.id;
    try {
      const appointments = await Appointment.find({ $or: [{ user_id: userId }, { assigned_user: req.user.username }] });
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ message: "获取预约失败。" });
    }
  };

  const createAppointment = async (req, res) => {
    const { title, date, assignedUser } = req.body;
    const userId = req.user.id;
  
    if (!title || !date) {
      return res.status(400).json({ message: "标题和日期不能为空。" });
    }
  
    try {
      const { app_id, channel_number, token } = await createAgoraMeeting();
  
      const appointment = new Appointment({
        user_id: userId,
        title,
        date,
        assigned_user: assignedUser,
        app_id,
        channel_number,
        token,
      });
  
      await appointment.save();
  
      const log = new Log({
        user_id: userId,
        message: `添加预约: ${title}, 指定用户: ${assignedUser || "无"}`,
        timestamp: Date.now(),
      });
      await log.save();
  
      res.status(201).json({ message: "预约成功！", appointment });
    } catch (err) {
      console.error('Failed to create appointment:', err);
      res.status(500).json({ message: "添加预约失败。" });
    }
  };

const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const userId = req.user.id;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "预约不存在。" });
    if (appointment.user_id.toString() !== userId.toString()) return res.status(403).json({ message: "无权删除此预约。" });

    await appointment.remove();

    const log = new Log({
      user_id: userId,
      message: `删除预约 ID: ${appointmentId}, 指定用户: ${appointment.assigned_user || "无"}`,
      timestamp: Date.now()
    });
    await log.save();

    res.status(200).json({ message: "预约已删除。" });
  } catch (err) {
    res.status(500).json({ message: "删除预约失败。" });
  }
};

module.exports = { getAppointments, createAppointment, deleteAppointment };
