"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const TeamModel_1 = require("./TeamModel");
class Match extends sequelize_1.Model {
}
Match.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    homeTeamId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        field: 'home_team_id',
    },
    homeTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
    },
    awayTeamId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        field: 'away_team_id',
    },
    awayTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
    },
    inProgress: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
    },
}, {
    sequelize: index_1.default,
    modelName: 'matches',
    timestamps: false,
});
Match.belongsTo(TeamModel_1.default, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(TeamModel_1.default, { foreignKey: 'awayTeamId', as: 'awayTeam' });
TeamModel_1.default.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeMatch' });
TeamModel_1.default.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayMatch' });
exports.default = Match;
//# sourceMappingURL=MatchModel.js.map