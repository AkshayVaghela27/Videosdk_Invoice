const checkAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.json({ msg: "Access denied" });
    }
    next();
  };
  
  module.exports = checkAdmin;
  