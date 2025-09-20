import { useEffect, useState, useMemo } from "react";
import styles from "./SongList.module.css";

export default function SongList() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/songs.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSongs(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Error cargando JSON");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredSongs = useMemo(() => {
    return songs
      .filter(song =>
        song.titulo.toLowerCase().includes(query.trim().toLowerCase())
      )
      .filter(song => song.valoracion >= Number(minRating));
  }, [songs, query, minRating]);

  if (loading) return <p className={styles.status}>Cargando…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Mis Canciones Favoritas</h2>
        <div className={styles.controls}>
          <input
            className={styles.input}
            placeholder="Buscar por título…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label>
            Min ★
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </label>
        </div>
      </header>

      <ul className={styles.list}>
        {filteredSongs.map((song, index) => (
          <li key={index} className={styles.item}>
            <img
              className={styles.albumImage}
              src={song.imagenAlbum}
              alt={`Portada del álbum ${song.album}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
            <div className={styles.details}>
              <h3 className={styles.title}>{song.titulo}</h3>
              <p className={styles.album}>Álbum: {song.album}</p>
              <p className={styles.duration}>
                Duración: {Math.floor(song.duracion / 60)}:
                {(song.duracion % 60).toString().padStart(2, "0")}
              </p>
              <p className={styles.rating}>Valoración: {song.valoracion} ★</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
