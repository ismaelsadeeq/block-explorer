import React from "react"
import { Helmet } from "react-helmet-async"
import Header from "../../Layout/Header"
import CssBaseline from '@mui/material/CssBaseline';
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
          Body
        </Typography>
      </Container>
      <Footer />
    </>
    
  )
}

export default DashboardPage