import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { Button, CssBaseline,Box } from "@mui/material"

function Block() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      >
      <Helmet>
        <title>Block</title>
      </Helmet>
      <CssBaseline />
      <Header/>
      
      <Button>
        Back
      </Button>
      <Footer />
    </Box>
  )
}

export default Block