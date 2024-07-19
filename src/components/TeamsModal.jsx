export default function TeamsModal({ teams }) {
  if (!teams) return;

  return (
    <dialog id="sort-players-modal" className="modal">
      <div className="modal-box h-screen">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg text-primary text-center mb-5">
          Times
        </h3>

        {teams &&
          teams.map((team, index) => (
            <div key={index} className="mb-5">
              <p className="font-bold mb-5 text-center">Time {index + 1}</p>

              {team.goalkeeper && (
                <p className="mb-2">Goleiro: {team.goalkeeper.name}</p>
              )}

              <FieldPlayers players={team.fieldPlayers} />

              <p className="mt-3">
                Ranking do time:{" "}
                {(team.totalSkill / (team.fieldPlayers.length + 1)).toFixed(1)}
              </p>
            </div>
          ))}
      </div>
    </dialog>
  );
}

const FieldPlayers = ({ players }) => {
  return players.map((player, index) => (
    <div key={index} className="flex flex-row gap-1">
      <p>{player.name}</p>
    </div>
  ));
};
