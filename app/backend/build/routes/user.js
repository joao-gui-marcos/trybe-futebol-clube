"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel_1 = require("../database/models/UserModel");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields must be filled' });
    }
    const { email, password } = req.body;
    const user = await UserModel_1.default.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const flag = await bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.dataValues.password);
    if (flag) {
        const token = jwt.sign(user === null || user === void 0 ? void 0 : user.dataValues, 'jwt_secret', { algorithm: 'HS256' });
        res.status(200);
        res.json({ token });
    }
    if (!flag) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }
});
router.get('/login/validate', async (req, res) => {
    const token = req.headers.authorization;
    const flag = await jwt.verify(token, 'jwt_secret');
    req.body.user = flag;
    return res.status(200).json({ role: req.body.user.role });
});
exports.default = router;
//# sourceMappingURL=user.js.map