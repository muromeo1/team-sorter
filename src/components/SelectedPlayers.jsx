import TeamsModal from "./TeamsModal";

export default function SelectedPlayers({
  players,
  selectedPlayers,
  setSelectedPlayers,
}) {
  const SELECTED_PLAYERS_LIMIT = 12;

  const isSelected = (player) => {
    return selectedPlayers.some((selected) => selected.name === player.name);
  };

  const reachLimit = selectedPlayers.length >= SELECTED_PLAYERS_LIMIT;

  const onClick = (player) => {
    if (reachLimit && !isSelected(player)) return;

    if (isSelected(player)) {
      const notSelectedPlayers = selectedPlayers.filter(
        (selected) => selected.name !== player.name,
      );

      return setSelectedPlayers(notSelectedPlayers);
    }

    setSelectedPlayers([...selectedPlayers, player]);
  };

  const teams = distributeTeams({
    selectedPlayers,
    limit: SELECTED_PLAYERS_LIMIT,
  });

  return (
    <>
      <TeamsModal teams={teams} />

      <div className="w-full h-full">
        <div className="card shadow-xl h-full">
          <div className="card-body">
            <h2 className="card-title">Selecione os jogadores</h2>

            <div className="flex flex-row items-center mb-4">
              <p className={`${reachLimit && "text-secondary"}`}>
                Jogadores selecionados: {selectedPlayers.length}/
                {SELECTED_PLAYERS_LIMIT}
              </p>

              {reachLimit && (
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    document.getElementById("sort-players-modal").showModal() &&
                    distributeTeams({ selectedPlayers })
                  }
                >
                  Sortear!
                </button>
              )}
            </div>

            {players.map((player, index) => (
              <button
                className={`${isSelected(player) && "btn-primary"} btn btn-lg mt-2"`}
                onClick={() => onClick(player)}
                key={index}
              >
                {player.name} {player.goalkeeper && "(Goleiro)"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const distributeTeams = ({ selectedPlayers, limit }) => {
  if (selectedPlayers.length !== limit) return;

  const goalkeepers = selectedPlayers
    .filter((player) => player.goalkeeper)
    .sort((a, b) => b.skill - a.skill);

  const fieldPlayers = selectedPlayers
    .filter((player) => !player.goalkeeper)
    .sort((a, b) => b.skill - a.skill);

  const totalTeams = Math.min(
    goalkeepers.length,
    Math.floor(fieldPlayers.length / 5),
  );
  let teams = Array.from({ length: totalTeams }, () => ({
    goalkeeper: null,
    fieldPlayers: [],
    totalSkill: 0,
  }));

  // Distribute field players to teams to balance their total skill
  fieldPlayers.forEach((player, index) => {
    const teamIndex = index % totalTeams;
    teams[teamIndex].fieldPlayers.push(player);
    teams[teamIndex].totalSkill += player.skill;
  });

  // Sort teams by their total skill in ascending order (weaker teams first)
  teams.sort((a, b) => a.totalSkill - b.totalSkill);

  // Assign goalkeepers to teams, best goalkeepers to weakest teams
  goalkeepers.forEach((goalkeeper, index) => {
    teams[index].goalkeeper = goalkeeper;
  });

  // Resort teams to original order to maintain balance
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
