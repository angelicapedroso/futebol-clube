import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ILeaderboard from '../interfaces/leaderboard.interface';
import IMatch from '../interfaces/match.interface';
import ITeam from '../interfaces/team.interface';

const initialValues: ILeaderboard = {
  totalVictories: 0,
  totalPoints: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  totalGames: 0,
  goalsBalance: 0,
};

const LeaderboardService = {
  getHome(id: number, match: IMatch) {
    const result = { ...initialValues };
    result.totalGames += 1;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      result.totalVictories += 1;
      result.totalPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      result.totalPoints += 1;
      result.totalDraws += 1;
    } else {
      result.totalLosses += 1;
    }
    result.goalsFavor += match.homeTeamGoals;
    result.goalsOwn += match.awayTeamGoals;
    return result;
  },

  getAway(id: number, match: IMatch) {
    const result = { ...initialValues };
    result.totalGames += 1;
    if (match.awayTeamGoals > match.homeTeamGoals) {
      result.totalVictories += 1;
      result.totalPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      result.totalDraws += 1;
      result.totalPoints += 1;
    } else {
      result.totalLosses += 1;
    }
    result.goalsFavor += match.awayTeamGoals;
    result.goalsOwn += match.homeTeamGoals;

    return result;
  },

  getScore(results: any) {
    const result = results.reduce((acc: ILeaderboard, curr: ILeaderboard) => ({
      totalPoints: acc.totalPoints + curr.totalPoints,
      totalGames: acc.totalGames + curr.totalGames,
      totalVictories: acc.totalVictories + curr.totalVictories,
      totalDraws: acc.totalDraws + curr.totalDraws,
      totalLosses: acc.totalLosses + curr.totalLosses,
      goalsFavor: acc.goalsFavor + curr.goalsFavor,
      goalsOwn: acc.goalsOwn + curr.goalsOwn,
    }), initialValues);
    return result;
  },

  getCalculateLeaderboard(teams: ITeam[], matches: IMatch[], type: 'home' | 'away' | 'all') {
    const result = teams.map((team: ITeam) => {
      const filtered = matches.filter((match: IMatch) => !match.inProgress).map((match: IMatch) => {
        if ((type === 'home' || type === 'all') && team.id === match.homeTeam) {
          return this.getHome(team.id, match);
        } if ((type === 'away' || type === 'all') && team.id === match.awayTeam) {
          return this.getAway(team.id, match);
        } return initialValues;
      });
      const score = this.getScore(filtered);
      return {
        name: team.teamName,
        ...score,
        goalsBalance: score.goalsFavor - score.goalsOwn,
        efficiency: ((score.totalPoints / (score.totalGames * 3)) * 100).toFixed(2),
      };
    });
    return result;
  },

  getSortLeaderboard(leaderboard: ILeaderboard[]) {
    const sorted = leaderboard.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (b.totalPoints === a.totalPoints && b.goalsBalance === a.goalsBalance) {
        return b.goalsFavor - a.goalsFavor;
      } if (b.totalPoints === a.totalPoints) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalPoints - a.totalPoints;
    });
    return sorted;
  },

  async getLeaderBoardByType(type: 'home' | 'away' | 'all') {
    const teams = await Team.findAll();
    const matches = await Match.findAll();
    const leaderboard = this.getCalculateLeaderboard(teams, matches, type);
    const sortedLeaderboard = this.getSortLeaderboard(leaderboard);
    return sortedLeaderboard;
  },
};

export default LeaderboardService;
