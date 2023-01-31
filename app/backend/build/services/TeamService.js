"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeamModel_1 = require("../database/models/TeamModel");
async function findAll() {
    const data = await TeamModel_1.default.findAll();
    return { status: 200, data };
}
exports.default = findAll;
//# sourceMappingURL=TeamService.js.map