import { useState } from "react";

import TeamsModal from "./TeamsModal";
import distributeTeams from "../utils/distribute_teams";

export default function PlayersSelection({
  players,
  selectedPlayers,
  setSelectedPlayers,
}) {
  const [withGoalkeepers, setWithGoalkeepers] = useState(true);

  const SELECTED_PLAYERS_LIMIT = withGoalkeepers ? 12 : 10;

  const reachLimit = selectedPlayers.length >= SELECTED_PLAYERS_LIMIT;
  const goalkeepersCount = selectedPlayers.filter(
    (player) => player?.goalkeeper,
  ).length;

  const isSelected = (player) => {
    return selectedPlayers.some((selected) => selected.name === player.name);
  };

  const onClick = (player) => {
    if (reachLimit && !isSelected(player)) return;

    if (isSelected(player)) {
      const notSelectedPlayers = selectedPlayers.filter(
        (selected) => selected.name !== player.name,
      );

      return setSelectedPlayers(notSelectedPlayers);
    }

    if (player.goalkeeper && goalkeepersCount >= 2) {
      return;
    }

    setSelectedPlayers([...selectedPlayers, player]);
  };

  const listPlayers = withGoalkeepers
    ? players
    : players.filter((player) => !player.goalkeeper);

  const teams = distributeTeams({
    selectedPlayers,
    limit: SELECTED_PLAYERS_LIMIT,
  });

  return (
    <>
      <TeamsModal teams={teams} />

      <div className="w-full h-full lg:w-2/6 lg:m-auto">
        <div className="card bg-base-100 shadow-xl h-full">
          <div className="card-body">
            <div className="py-4 bg-base-100 sticky top-0">
              <h2 className="card-title">Selecione os jogadores</h2>
              <div className="flex flex-row gap-1 mb-6">
                <p>Sortear goleiros</p>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={withGoalkeepers}
                  onChange={() => {
                    setWithGoalkeepers(!withGoalkeepers);
                    setSelectedPlayers([]);
                  }}
                />
              </div>

              <div className="flex flex-row items-center justify-between mb-4">
                <div>
                  <p className={`${reachLimit && "text-secondary"}`}>
                    Jogadores selecionados: {selectedPlayers.length}/
                    {SELECTED_PLAYERS_LIMIT}
                  </p>

                  {withGoalkeepers && (
                    <p className={`${goalkeepersCount >= 2 && "text-accent"}`}>
                      Goleiros: {goalkeepersCount}/2
                    </p>
                  )}
                </div>

                {reachLimit &&
                  (withGoalkeepers ? goalkeepersCount === 2 : true) && (
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        document
                          .getElementById("sort-players-modal")
                          .showModal()
                      }
                    >
                      Sortear!
                    </button>
                  )}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              {listPlayers.map((player, index) => (
                <button
                  className={`${isSelected(player) && (player.goalkeeper ? "btn-accent" : "btn-primary")} btn btn-lg`}
                  onClick={() => onClick(player)}
                  key={index}
                >
                  {player.name} {player.goalkeeper && "(Goleiro)"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
