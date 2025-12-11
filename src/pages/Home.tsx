import { useState } from "react";
import { fetchClash } from "../api/clashApi";

export default function Home() {
  const [tag, setTag] = useState("");
  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!tag) {
      setError("Ingresa un TAG válido.");
      return;
    }

    try {
      setError("");
      const cleanTag = tag.replace("#", "%23"); // API requiere %23
      const data = await fetchClash(`/players/${cleanTag}`);
      setPlayer(data);
    } catch (err: any) {
      setError("No se encontró el jugador o el TAG es incorrecto.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>
      <h1>Clash Royale Stats</h1>

      <input
        type="text"
        placeholder="Ingresa el TAG del jugador"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "250px",
          borderRadius: "5px",
          marginRight: "10px",
        }}
      />

      <button onClick={handleSearch} style={{ padding: "0.5rem" }}>
        Buscar
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {player && (
        <div style={{ marginTop: "2rem" }}>
          <h2>{player.name}</h2>
          <p>Copas: {player.trophies}</p>
          <p>Arenas: {player.arena?.name}</p>
          <p>Nivel: {player.expLevel}</p>
        </div>
      )}
    </div>
  );
}
