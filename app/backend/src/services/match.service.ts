import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/match.interface';
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
    const createdMatch = await Match.create(match);

    if (match.homeTeam === match.awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }

    return createdMatch;
  },

  async updateStatus(id: number) {
    const updatedMatch = await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch;
  },
};

export default MatchService;
