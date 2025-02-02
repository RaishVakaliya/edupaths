async function userLogout(req, res) {
  try {
    res.clearCookie("token");
    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: false,
      success: true,
    });
  }
}

module.exports = userLogout;
