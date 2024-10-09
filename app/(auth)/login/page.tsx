"use client"; // Indiquer que ce fichier est un composant client

// 2. Importer les composants MUI
import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { styled } from '@mui/system';

const BackgroundContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const FormBox = styled(Box)({
  width: '100%',
  maxWidth: 400,
  padding: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 8,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    <BackgroundContainer maxWidth={false}>
      <FormBox as="form" onSubmit={handleSubmit}>
        <Typography variant="h4" component="h2" gutterBottom align="center" color='info' fontWeight='bold'>
          Connexion
        </Typography>
        <TextField
          label="Nom d’utilisateur"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Se connecter
        </Button>
      </FormBox>
    </BackgroundContainer>
  );
};

export default Page;
