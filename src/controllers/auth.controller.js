import { authService } from "../services/index.js";

const signup = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    const identifier = { email, phoneNumber };
    const { bearerToken, refreshToken } = await authService.signup(
      identifier,
      password
    );
    res.json({ bearerToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to sign up: " + error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    const tokens = await authService.signin(email, phoneNumber, password);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: "Failed to sign in: " + error.message });
  }
};

const refreshBearerToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { bearerToken } = await authService.refreshBearerToken(refreshToken);
    res.json({ bearerToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to refresh bearer token: " + error.message });
  }
};

export default {
  signup,
  signin,
  refreshBearerToken,
};
