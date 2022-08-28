import Team from '../database/models/Team';

const TeamService = {
  async getAll(): Promise<object> {
    const teams = await Team.findAll();
    return teams;
  },
};

export default TeamService;
