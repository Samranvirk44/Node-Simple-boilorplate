
module.exports = (app, libs) => {
    const router = app.Router();
    router.post('/register/user', async (req, res) => {
        const result = await libs.Auth.registerUser(req);
        return res.status(result.code).json(result);
    });

    router.post('/otp', async (req, res) => {
        const result = await libs.Auth.otp(req);
        return res.status(result.code).json(result);
    });
    router.post('/login/user', async (req, res) => {
        const result = await libs.Auth.loginUser(req);
        return res.status(result.code).json(result);
    });
    router.post('/insertToUser', async (req, res) => {
        const result = "ddd"//await libs.Auth.loginUser(req);
        return res.status(result.code).json(result);
    });
    return router;
};
