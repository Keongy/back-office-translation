"use client";
import { Button, Container, Typography, Box, Link } from "@mui/material";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Home() {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Image
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handleLogout} startIcon={
            <Image
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
          }>
            Se déconnecter
          </Button>
        </Box>
      </Box>
      <Box component="footer" mt={4} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          <Link href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
            <Image
              aria-hidden
              src="https://nextjs.org/icons/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </Link>
          {" | "}
          <Link href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
            <Image
              aria-hidden
              src="https://nextjs.org/icons/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </Link>
          {" | "}
          <Link href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
            <Image
              aria-hidden
              src="https://nextjs.org/icons/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
