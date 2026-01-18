"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = exports.checkAdminPage = void 0;
// Check to see if the user is admin
const checkAdminPage = (req, res, next) => {
    if (!req.session || !req.session.user || !req.session.isLoggedIn) {
        res.status(401).json({
            message: "You are not allowed to access this!",
        });
        return;
    }
    if (req.session.user.role !== "admin") {
        res.status(401).json({
            message: "Admin only can access",
        });
        return;
    }
    next();
};
exports.checkAdminPage = checkAdminPage;
// Check Login
const checkLogin = (req, res, next) => {
    if (!req.session || !req.session.user || !req.session.isLoggedIn) {
        res.status(401).json({
            message: "You are not allowed to access this!",
        });
        return;
    }
    next();
};
exports.checkLogin = checkLogin;
