"use client"; // Indiquer que ce fichier est un composant client

import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Gérer la soumission du formulaire de connexion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Utiliser `signIn` de `next-auth/react` pour tenter de se connecter
    const result = await signIn("credentials", {
      redirect: false, // Empêcher la redirection automatique
      username,
      password,
    });

    if (result?.error) {
      setError("Nom d’utilisateur ou mot de passe incorrect");
    } else {
      // Rediriger l'utilisateur vers la page d'accueil en cas de connexion réussie
      router.push("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{width: "300px", padding: "20px", border: "1px solid #ccc"}}
      >
        <h2>Connexion</h2>
        <input
          type="text"
          placeholder="Nom d’utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{width: "100%", margin: "10px 0", padding: "10px"}}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{width: "100%", margin: "10px 0", padding: "10px"}}
        />
        {error && <p style={{color: "red"}}>{error}</p>}
        <button type="submit" style={{width: "100%", padding: "10px"}}>
          Se connecter
        </button>
      </form>
    </div>
  );
}
