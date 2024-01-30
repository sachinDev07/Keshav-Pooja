const express = require("express");
const { formData, getFormData } = require("../controllers/user-controller");

const router = express.Router();

router.get("/getData", getFormData);
router.post("/", formData);

module.exports = router;
