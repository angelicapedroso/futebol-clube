import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/match.interface';

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
};

export default MatchService;
