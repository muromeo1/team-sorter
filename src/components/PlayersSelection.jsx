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

  const initialPlayers = withGoalkeepers
    ? players
    : players.filter((player) => !player.goalkeeper);

  const reachLimit = selectedPlayers.length >= SELECTED_PLAYERS_LIMIT;

  const [playersList, setPlayersList] = useState(initialPlayers);

  const goalkeepersCount = selectedPlayers.filter(
    (player) => player?.goalkeeper,
  ).length;

  const teams = distributeTeams({
    selectedPlayers,
    limit: SELECTED_PLAYERS_LIMIT,
  });

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

  const searchPlayers = (name) => {
    if (!name) setPlayersList(initialPlayers);

    setPlayersList(
      initialPlayers.filter((player) =>
        player.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s]/gi, "")
          .includes(name.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <TeamsModal teams={teams} />

      <div className="w-full h-full lg:w-2/6 lg:m-auto">
        <div className="card h-full">
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

              <div className="flex gap-2 w-full mb-4">
                <input
                  id="search-player-input"
                  type="text"
                  placeholder="Pesquisar..."
                  className="input input-bordered w-full"
                  onChange={(e) => searchPlayers(e.target.value)}
                />

                <button
                  className="btn"
                  onClick={() => {
                    setPlayersList(initialPlayers);
                    document.getElementById("search-player-input").value = "";
                  }}
                >
                  X
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              {playersList.map((player, index) => (
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
