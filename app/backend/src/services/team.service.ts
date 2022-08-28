import Team from '../database/models/Team';
import ITeam from '../interfaces/team.interface';

const TeamService = {
  async getAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  },

  async getById(id: number): Promise<ITeam | null> {
    const team = await Team.findOne({ where: { id } });
    return team;
  },
};

export default TeamService;
