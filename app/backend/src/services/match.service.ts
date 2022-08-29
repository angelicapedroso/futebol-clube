import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch, { IMatchGoals } from '../interfaces/match.interface';
import HttpException from '../share/http.exception';

const MatchService = {
  async getAll(): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  },

  async create(match: IMatch): Promise<IMatch> {
    if (match.homeTeam === match.awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await Team.findByPk(match.homeTeam);
    const awayTeam = await Team.findByPk(match.awayTeam);

    if (!homeTeam || !awayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    const createdMatch = await Match.create(match);

    return createdMatch;
  },

  async updateStatus(id: number): Promise<[number, IMatch[]]> {
    const updatedMatch = await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch;
  },

  async updateGoals(id: number, goals: IMatchGoals): Promise<[number, IMatchGoals[]]> {
    const updatedGoals = await Match.update(goals, { where: { id } });
    return updatedGoals;
  },
};

export default MatchService;
