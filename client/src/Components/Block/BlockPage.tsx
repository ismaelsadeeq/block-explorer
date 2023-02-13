import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { Button, CssBaseline, Box, Typography, IconButton } from "@mui/material"
import { Container } from "@mui/system"
import { ArrowBack, ArrowBackIosNewRounded } from "@mui/icons-material"

function Block() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Helmet>
        <title>Explore Bitcoin</title>
      </Helmet>
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} >
        <Header />
        <Container style={{
          paddingTop:'15px',
          display:'flex',
          justifyContent:'space-between'
        }}>
          <Button >
           <IconButton >
              <ArrowBackIosNewRounded />
           </IconButton>
          </Button>
          <Typography  variant="h5" component="h1" >
          Block
        </Typography>
        </Container>


        
      </Container>
      <Footer />
    </Box>

  )
}

export default Block