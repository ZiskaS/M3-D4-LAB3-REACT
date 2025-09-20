import React from "react";
import styles from "./Hobbies.module.css";

export default function Hobbies() {
  const hobbies = [
    { nombre: "Programar", icono: "💻" },
    { nombre: "Viajar", icono: "✈️" },
    { nombre: "Mundo culinario", icono: "🍳" },
    { nombre: "Arte", icono: "🎨" },
    { nombre: "Música", icono: "🎵" }
  ];

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Mis Hobbies</h2>
      </header>
      <ul className={styles.list}>
        {hobbies.map((hobby, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.icon}>{hobby.icono}</span>
            <span className={styles.nombre}>{hobby.nombre}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
