import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Divider } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      <Link color="inherit" href="https://qala.dev/">
        Qala
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // minHeight: '20vh',
      }}
    >
      <Divider  />
     <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Bitcoin Blockchain Explorer

          </Typography>
          <Typography variant="body1">
            Signet Network
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}