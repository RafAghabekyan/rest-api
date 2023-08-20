import Joi from "joi";

const validateSignupData = (req, res, next) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const validationSchema = Joi.object({
      password: Joi.string().min(4).alphanum().required(),
      email: Joi.string().email().optional(),
      phoneNumber: Joi.string()
        .pattern(/^\+[1-9]\d{1,14}$/)
        .optional(),
    }).or("email", "phoneNumber");
    const { error } = validationSchema.validate({
      email,
      phoneNumber,
      password,
    });
    if (error) {
      console.log(error);
      throw new Error(`Invalid format of credentials`, error);
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const validateNewToken = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const validationSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });
    const { error } = validationSchema.validate({ refreshToken });
    if (error) {
      console.log(error);
      throw new Error(`Invalid format of credentials`, error);
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { validateSignupData, validateNewToken };
