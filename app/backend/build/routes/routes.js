"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const TeamModel_1 = require("../database/models/TeamModel");
const MatchModel_1 = require("../database/models/MatchModel");
const router = (0, express_1.Router)();
const getMatchesInProgress = async () => {
    const matches = await MatchModel_1.default.findAll({
        where: { inProgress: true },
        include: [{
                model: TeamModel_1.default,
                as: 'homeTeam',
                attributes: { exclude: ['id'] },
            },
            {
                model: TeamModel_1.default,
                as: 'awayTeam',
                attributes: { exclude: ['id'] },
            },
        ]
    });
    return matches;
};
const getMatchesNotInProgress = async () => {
    const matches = await MatchModel_1.default.findAll({
        where: { inProgress: false },
        include: [{
                model: TeamModel_1.default,
                as: 'homeTeam',
                attributes: { exclude: ['id'] },
            },
            {
                model: TeamModel_1.default,
                as: 'awayTeam',
                attributes: { exclude: ['id'] },
            },
        ]
    });
    return matches;
};
const getAllMatches = async () => {
    const matches = await MatchModel_1.default.findAll({
        include: [{
                model: TeamModel_1.default,
                as: 'homeTeam',
                attributes: { exclude: ['id'] },
            },
            {
                model: TeamModel_1.default,
                as: 'awayTeam',
                attributes: { exclude: ['id'] },
            },
        ]
    });
    return matches;
};
router.get('/teams', async (req, res) => {
    const teams = await TeamModel_1.default.findAll();
    res.status(200);
    res.json(teams);
});
router.get('/teams/:id', async (req, res) => {
    const { id } = req.params;
    const team = await TeamModel_1.default.findOne({ where: { id } });
    res.status(200);
    res.json(team);
});
router.get('/matches', async (req, res) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
        res.status(200);
        res.json(await getMatchesInProgress());
    }
    if (inProgress === 'false') {
        res.status(200);
        res.json(await getMatchesNotInProgress());
    }
    if (inProgress === undefined) {
        res.status(200);
        res.json(await getAllMatches());
    }
});
const validateTeams = async (homeTeamId, awayTeamId) => {
    const team1 = await TeamModel_1.default.findOne({ where: { id: homeTeamId } });
    const team2 = await TeamModel_1.default.findOne({ where: { id: awayTeamId } });
    if (!team1 || !team2) {
        return false;
    }
    return true;
};
router.post('/matches', async (req, res) => {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const token = req.headers.authorization;
    try {
        jwt.verify(token, 'jwt_secret');
    }
    catch (err) {
        return res.status(401).json({ message: 'Token must be a valid token' });
    }
    if (homeTeamId === awayTeamId) {
        return res.status(422)
            .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const flag = await validateTeams(homeTeamId, awayTeamId);
    if (!flag) {
        return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const match = await MatchModel_1.default.create({
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress: true
    });
    return res.status(201).json(match);
});
router.patch('/matches/:id/finish', async (req, res) => {
    const { id } = req.params;
    const match = await MatchModel_1.default.findOne({ where: { id } });
    if (match) {
        match.inProgress = false;
        await match.save();
    }
    res.status(200);
    res.json({ message: 'Finished' });
});
router.patch('/matches/:id', async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await MatchModel_1.default.findOne({ where: { id } });
    if (match) {
        match.homeTeamGoals = homeTeamGoals;
        match.awayTeamGoals = awayTeamGoals;
        await match.save();
    }
    return res.status(200).json({ message: 'Match updated' });
});
exports.default = router;
//# sourceMappingURL=routes.js.map