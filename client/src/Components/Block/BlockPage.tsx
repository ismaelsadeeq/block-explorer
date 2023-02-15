import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { Button, CssBaseline, Box, Typography, IconButton } from "@mui/material"
import { Container } from "@mui/system"
import {  ArrowBackIosNewRounded } from "@mui/icons-material"
import BlockView from "./BlockView"
import { useEffect, useState } from "react"
import { url } from "../../Utilities/util"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"
import { getRequest } from "../../Utilities/Network"

function Block() {

  const navigate:NavigateFunction = useNavigate()
  const [block,setBlock] = useState(null)
  const {hash}  =  useParams()
  async function getData(){
    let method:string = url + "/search-block-hash/" + hash
    const block = await getRequest(method)
    setBlock(block)
  }
  useEffect(()=>{
   getData()
  },[hash])
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
          <Button onClick={()=>{
            navigate(-1)
          }} >
           <IconButton >
              <ArrowBackIosNewRounded />
           </IconButton>
          </Button>
          <Typography  variant="h5" component="h1" >
          Block
        </Typography>
        </Container>
        <BlockView  block={block}/>

      </Container>
      <Footer />
    </Box>

  )
}

export default Block