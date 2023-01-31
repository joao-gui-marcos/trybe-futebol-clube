"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../database/models");
const TeamModel_1 = require("../database/models/TeamModel");
const router = (0, express_1.Router)();
const getTotalGames = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT count(*) FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId} 
    and in_progress = 0;`);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamName = async (teamId) => {
    const team = await TeamModel_1.default.findOne({ where: { id: teamId }, attributes: { exclude: ['id'] } });
    return team === null || team === void 0 ? void 0 : team.teamName;
};
const getTeamVictories = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId} 
    and in_progress = 0 and home_team_goals > away_team_goals;`);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamDraws = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId} 
    and in_progress = 0 and home_team_goals = away_team_goals;`);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamLosses = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId} 
    and in_progress = 0 and home_team_goals < away_team_goals;`);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamGoalsFavor = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT sum(home_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId}
     and in_progress = 0;`);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamGoalsOwn = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT sum(away_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId}
     and in_progress = 0;`);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamGoalsBalance = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT sum(home_team_goals) - sum(away_team_goals) 
    FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId}
     and in_progress = 0;`);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamPoints = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT
    count(IF(home_team_goals > away_team_goals,1,null))*3 + 
    count(IF(home_team_goals = away_team_goals,1,null))*1
    FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId} and in_progress = 0 `);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const getTeamEfficiency = async (teamId) => {
    const [[result]] = await models_1.default.query(`SELECT
    round((count(IF(home_team_goals > away_team_goals,1,null))*3 + 
    count(IF(home_team_goals = away_team_goals,1,null))*1)/
    (count(*)*3)*100,2)
    FROM TRYBE_FUTEBOL_CLUBE.matches where home_team_id = ${teamId} and in_progress = 0 
    `);
    const totalGames = Object.values(result);
    return totalGames[0];
};
const setObject = async (teamId) => {
    // santos = 14, palmeiras = 12, corinthians = 4
    const obj = {
        name: await getTeamName(teamId),
        totalPoints: await getTeamPoints(teamId),
        totalGames: await getTotalGames(teamId),
        totalVictories: await getTeamVictories(teamId),
        totalDraws: await getTeamDraws(teamId),
        totalLosses: await getTeamLosses(teamId),
        goalsFavor: await getTeamGoalsFavor(teamId),
        goalsOwn: await getTeamGoalsOwn(teamId),
        goalsBalance: await getTeamGoalsBalance(teamId),
        efficiency: await getTeamEfficiency(teamId),
    };
    return obj;
};
const getLeaderboard = async () => {
    const [result] = await models_1.default.query(`SELECT a.team_name as name, 
  count(IF(home_team_goals > away_team_goals,1,null))*3 + 
  count(IF(home_team_goals = away_team_goals,1,null))*1 as totalPoints,
  count(*) as totalGames,
  count(IF(home_team_goals > away_team_goals,1,null)) as totalVictories,
  count(IF(home_team_goals = away_team_goals,1,null)) as totalDraws,
  count(IF(home_team_goals < away_team_goals,1,null)) as totalLosses,
  sum(home_team_goals) as goalsFavor, sum(away_team_goals) as goalsOwn, 
  sum(home_team_goals) - sum(away_team_goals) as goalsBalance,
  round((count(IF(home_team_goals > away_team_goals,1,null))*3 + 
  count(IF(home_team_goals = away_team_goals,1,null))*1)/(count(*)*3)*100,2) as efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams a inner join 
  TRYBE_FUTEBOL_CLUBE.matches b on a.id = b.home_team_id 
  where in_progress = 0 group by a.team_name
  order by totalPoints desc, totalVictories desc, 
  goalsBalance desc, goalsFavor desc, goalsOwn asc;`);
    return result;
};
router.get('/leaderboard/home', async (req, res) => {
    console.log(await setObject(14));
    const leaderboard = await getLeaderboard();
    return res.status(200).json(leaderboard);
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map