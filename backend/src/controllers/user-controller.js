const User = require("../model/user");

async function formData(req, res) {
  console.log(req.body);
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.create(req.body);

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getFormData(req, res) {
  try {
    const user = await User.find({}).sort({ createdAt: "desc" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  formData,
  getFormData,
};
