import React from "react"
import { Helmet } from "react-helmet-async"
import Header from "../../Layout/Header"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from "../../Layout/Footer"



function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Explore Bitcoin</title>
      </Helmet>
      <Header />
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container>
      <Footer />
    </>
    
  )
}

export default DashboardPage