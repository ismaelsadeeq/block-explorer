import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CurrencyBitcoin from '@mui/icons-material/CurrencyBitcoin';
import { url } from '../Utilities/util';
import { getRequest } from '../Utilities/Network';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '42ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
/*
tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7 ADDRESS
018e2ad3cd72c83ab207a07317199886d2e02324982818506ed29675f28fd361 TXID
000000d7c6d0ae8353f8cf9d9dd36fdab9ae450a659b496e2ab327d4d0c22f62  BlockHash
1222

*/


export default function Header() {
  const navigate: NavigateFunction = useNavigate()
  const [status, setStatus] = useState(false)
  async function changeHandler(value: string) {

    let method: string = url + "/get-type/"+value;
    const response = await getRequest(method);
    switch (response.type) {
      case "block":
        navigate("/block/" + response.hash)
        break
      case "transaction":
        navigate("/transaction/" + value)
        break
      case "address":
        navigate("/address/" + value)
        break
      default:
        setStatus(true)
        setTimeout(() => {
          setStatus(false)
        }, 2000);
    }

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <CurrencyBitcoin />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Bitcoin Explorer
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase onChange={
              async (e) => {
                setTimeout(async () => {
                  if(e.target.value.length>0){
                    return await changeHandler(e.target.value);

                    }
                }, 3000);
              }}
              placeholder="Address, Trasaction Id, Block height, Block Hash"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {status?
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              <Typography variant="subtitle2" marginTop={1}>
                Invalid Search
              </Typography>
              <Button onClick={()=>setStatus(false)}>
                <Cancel style={{ color: "#fff" }} />
              </Button>
            </div>:
              null  
            }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}