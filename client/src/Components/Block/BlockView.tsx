import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Container, Link } from '@mui/material';

interface blk  {
  "hash": string,
  "confirmations": number,
  "height": number,
  "version": number,
  "versionHex": string,
  "merkleroot": string,
  "time": number,
  "mediantime": number,
  "nonce": number,
  "bits": string,
  "difficulty": number,
  "chainwork": string,
  "nTx": number,
  "previousblockhash": string,
  "strippedsize": number,
  "size": number,
  "weight": number,
  // "tx":string[]
}
const properties = [
  {"title": "Block Hash","value":"000000d7c6d0ae8353f8cf9d9dd36fdab9ae450a659b496e2ab327d4d0c22f62"},
  {"title": "Block Confirmations","value":"1"},
  {"title": "Block Height","value":"129962"},
  {"title": "Version","value":"536870912"},
  {"title": "Version Hex","value":"20000000"},
  {"title": "Merkleroot","value":"a2e993dba682a3cb0cf279646baf7a07391642db0568e0c808068bab092ccd8a"},
  {"title": "Time","value":"1676315993"},
  {"title": "Median Time","value":"1676314475"},
  {"title": "Nonce","value":"2121471"},
  {"title": "Bits","value":"1e014204"},
  {"title": "Difficulty","value":"0.003105391985904217"},
  {"title": "Chainwork","value":"00000000000000000000000000000000000000000000000000000171c79922a0"},
  {"title": "Transactions","value":"1"},
  {"title": "Previous Block Hash","value":"000000ec3b7649d99509bd42109c907535826176e77c6160936b7272238e00bf"},
  {"title": "Stripped Size","value":"318"},
  {"title": "Size","value":"354"},
  {"title": "Weight","value":"318"}]
const transactions =  [
      "a2e993dba682a3cb0cf279646baf7a07391642db0568e0c808068bab092ccd8a"
  ]

export default function TransactionList() {
  return (
    <Container>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {properties.map((property) => (
            <TableRow
              key={property.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              {property.title}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                {
                  property.title =="Previous Block Hash"?
                    <Link >
                      <Typography variant='body1' style={{textDecoration:"underline",color:'lightBlue'}}  align="right"> 
                          {property.value}
                    </Typography>
               </Link>:
                  <Typography variant='body1'  align="right"> 
                     {property.value}
                </Typography>
                }
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography variant='h5' padding={5}>
      Transactions
    </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {transactions.map((tx) => (
              <TableRow
                key={tx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <Typography variant='body1' style={{textDecoration:"underline",color:"lightblue"}}  align="left"> 
                          {tx}
                    </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
  );
}