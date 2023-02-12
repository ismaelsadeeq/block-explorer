import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { CssBaseline } from "@mui/material"

function AddressPage() {

  return (
    <>
    <Helmet>
      <title>Address</title>
    </Helmet>
    <CssBaseline />
    <Header/>
    <Footer />
  </>
  )
}

export default AddressPage