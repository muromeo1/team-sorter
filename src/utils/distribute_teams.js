export const distributeTeams = ({ selectedPlayers, limit }) => {
  if (selectedPlayers.length !== limit) return;

  const TOTAL_TEAMS = 2;

  const goalkeepers = selectedPlayers
    .filter((player) => player.goalkeeper)
    .sort((a, b) => b.skill - a.skill);

  const fieldPlayers = selectedPlayers
    .filter((player) => !player.goalkeeper)
    .sort((a, b) => b.skill - a.skill);

  let teams = Array.from({ length: TOTAL_TEAMS }, () => ({
    goalkeeper: null,
    fieldPlayers: [],
    totalSkill: 0,
  }));

  fieldPlayers.forEach((player, index) => {
    const teamIndex = index % TOTAL_TEAMS;
    teams[teamIndex].fieldPlayers.push(player);
    teams[teamIndex].totalSkill += player.skill;
  });

  teams.sort((a, b) => a.totalSkill - b.totalSkill);

  goalkeepers.forEach((goalkeeper, index) => {
    teams[index].goalkeeper = goalkeeper;
  });

  teams = teams
    .map((team, _) => ({
      ...team,
      totalSkill:
        team.totalSkill + (team.goalkeeper ? team.goalkeeper.skill : 0),
    }))
    .sort((a, b) =>
      a.fieldPlayers[0].name.localeCompare(b.fieldPlayers[0].name),
    );

  return teams;
};

export default distributeTeams;
