export interface IMatchGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface IMatch extends IMatchGoals {
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
}
