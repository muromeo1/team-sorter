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

        <h3 className="font-bold text-lg">Times</h3>

        {teams &&
          teams.map((team, index) => (
            <div key={index} className="mb-5">
              <p>
                Goleiro: {team.goalkeeper.name} - Skill: {team.goalkeeper.skill}
              </p>

              <FieldPlayers players={team.fieldPlayers} />

              <p className="mt-2">
                Nota do time: {team.totalSkill / (team.fieldPlayers.length + 1)}
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
      <p>Jogador: {player.name}</p>
      <p>- Skill: {player.skill}</p>
    </div>
  ));
};
