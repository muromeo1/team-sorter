import { useState } from "react";

import SelectPlayers from "./components/SelectedPlayers";

export default function App() {
  const players = [
    { name: "Fabiano", skill: 3, goalkeeper: false },
    { name: "Lucas", skill: 2.5, goalkeeper: false },
    { name: "Murilo", skill: 4, goalkeeper: false },
    { name: "Zé", skill: 5, goalkeeper: true },
    { name: "Araos", skill: 5, goalkeeper: false },
    { name: "Henrique", skill: 3.5, goalkeeper: false },
    { name: "Dani", skill: 3, goalkeeper: true },
    { name: "Menduba", skill: 5, goalkeeper: false },
    { name: "Alvaro", skill: 4, goalkeeper: false },
    { name: "Eduardo", skill: 3.5, goalkeeper: false },
    { name: "Renato", skill: 4, goalkeeper: false },
    { name: "Renan", skill: 3.5, goalkeeper: false },
    { name: "Barreto", skill: 3, goalkeeper: true },
    { name: "Deja", skill: 3, goalkeeper: false },
    { name: "Iago", skill: 1.5, goalkeeper: false },
    // Add more players if needed
  ];

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  return (
    <section className="w-full h-screen">
      <SelectPlayers
        players={players}
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
      />
    </section>
  );
}
