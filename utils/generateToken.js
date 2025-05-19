import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === 'production';
  
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // Required for SameSite=None
      sameSite: isProduction ? 'none' : 'lax', // Dynamic based on environment
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      domain: isProduction ? '.vercel.app' : undefined // For cross-subdomain in production
    })
    .json({
      success: true,
      message,
      user
    });
};
