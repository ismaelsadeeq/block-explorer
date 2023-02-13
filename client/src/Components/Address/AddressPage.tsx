import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { CssBaseline,Box } from "@mui/material"

function AddressPage() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      >
    <Helmet>
      <title>Address</title>
    </Helmet>
    <CssBaseline />
    <Header/>
    <Footer />
  </Box>
  )
}

export default AddressPage