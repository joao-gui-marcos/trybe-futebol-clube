"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Team extends sequelize_1.Model {
}
Team.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    teamName: {
        type: (0, sequelize_1.STRING)(30),
        allowNull: false,
        field: 'team_name',
    },
}, {
    sequelize: index_1.default,
    modelName: 'teams',
    timestamps: false,
});
exports.default = Team;
//# sourceMappingURL=TeamModel.js.map