import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { CssBaseline } from "@mui/material"

function Block() {
  return (
    <>
      <Helmet>
        <title>Block</title>
      </Helmet>
      <CssBaseline />
      <Header/>
      <Footer />
    </>
  )
}

export default Block