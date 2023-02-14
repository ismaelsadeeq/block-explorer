import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Container, Link } from '@mui/material';

const properties:Array<string> = ["Transaction","TX Out",]

const inputs = [
      {
          "coinbase": "03bafb010a2f7369676e65743a332f",
          "txinwitness": [
              "0000000000000000000000000000000000000000000000000000000000000000"
          ],
          "sequence": 4294967294
      },
      {
        "txid":"67e9b17c580fd9fefbe1576c38b3e2bf4113be9e47b41229d2cc4cda95bcdb34",
        "vout":0,
        "scriptSig":{"asm":"","hex":""},
        "txinwitness":["30440220089083cde58d4bfa46bc9425a8f4e4773fc427c7518390b646da6ebd19c1693202207b49a140dd14e46cbb53a6a6279fbd71121f46bd29cda14362263d93aba70af801","0221a6ac9646b2e95376a04cc223aa6a1175cba046cadcd4126537836656b433e2"],
        "sequence":4294967294
      }
  ]

function TransactionInputs() {
  return (
    <div>
      <Typography variant='h5' padding={2} style={{textDecoration:'underline'}}>
       {inputs.length} {inputs.length === 1?"Input from transaction":"Inputs from transactions"}
      </Typography>

  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
          <TableRow>
            {
              properties.map((property)=>{
                return   <TableCell align="left">
                  <Typography variant='body1'> 
                  {property}
                  </Typography>
                </TableCell>
              })
            }
          </TableRow>
        </TableHead>
      <TableBody>
        {inputs.map((input) => (
          <TableRow
            key={input.sequence}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
          
            {
              input.coinbase !== undefined?
              <TableCell component="th" scope="row">
              <Typography variant='body1'   align="left"> 
                Coinbase
              </Typography>
              </TableCell>
              :
              // <div  style={{display:'flex',justifyContent:'space-between'}}>
              <TableCell component="th" scope="row">
              <Typography variant='body1' style={{textDecoration:"underline",color:'lightBlue'}}  align="left"> 
                {input.txid}
              </Typography>
              </TableCell>
              // </div>

            }
             <TableCell component="th" scope="row">
              <Typography variant='body1' align="left"> 
                {input.vout !==undefined?input.vout +1:""}
              </Typography>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
}

export default TransactionInputs