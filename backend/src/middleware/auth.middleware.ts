import { Request, Response, NextFunction } from "express";

// Check to see if the user is admin
export const checkAdminPage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

// Check Login
export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.user || !req.session.isLoggedIn) {
    res.status(401).json({
      message: "You are not allowed to access this!",
    });
    return;
  }
  next();
};
