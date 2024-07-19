import { useState } from "react";

import PlayersSelection from "./components/PlayersSelection";
import { players } from "./utils/players";

export default function App() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  return (
    <section className="w-full h-full">
      <PlayersSelection
        players={players}
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
      />
    </section>
  );
}
