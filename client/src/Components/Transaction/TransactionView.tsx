import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Container, Link } from '@mui/material';
import TransactionInputs from './Inputs';
import TransactionOutputs from './Outputs';
const transaction = {
  "txid": "018e2ad3cd72c83ab207a07317199886d2e02324982818506ed29675f28fd361",
  "hash": "ba8cacb7df38c689fb97da023ffc6e96e3b72d0bf58f2cb93fb687ec28c99bde",
  "version": 2,
  "size": 273,
  "vsize": 246,
  "weight": 984,
  "locktime": 0,
  "vin": [
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
    ],
  "vout": [
      {
          "value": 50,
          "n": 0,
          "scriptPubKey": {
              "asm": "1 7099e4b23427fc40ba4777bbf52cfd0b7444d69a3e21ef281270723f54c0c14b",
              "desc": "rawtr(7099e4b23427fc40ba4777bbf52cfd0b7444d69a3e21ef281270723f54c0c14b)#gshgfzzk",
              "hex": "51207099e4b23427fc40ba4777bbf52cfd0b7444d69a3e21ef281270723f54c0c14b",
              "address": "tb1pwzv7fv35yl7ypwj8w7al2t8apd6yf4568cs772qjwper74xqc99sk8x7tk",
              "type": "witness_v1_taproot"
          }
      },
      {
          "value": 0,
          "n": 1,
          "scriptPubKey": {
              "asm": "OP_RETURN aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf9 ecc7daa24900473044022045cab4f6958e87d5f7b2c809169a4aed976b69ea8b8695bd45ae36c1cede2d9302206cfb07aacc149fbdde1f50496c6376c487123b55f3a595cfe00b36aa075a3c0d0100",
              "desc": "raw(6a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf94c4fecc7daa24900473044022045cab4f6958e87d5f7b2c809169a4aed976b69ea8b8695bd45ae36c1cede2d9302206cfb07aacc149fbdde1f50496c6376c487123b55f3a595cfe00b36aa075a3c0d0100)#g2tzvx5t",
              "hex": "6a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf94c4fecc7daa24900473044022045cab4f6958e87d5f7b2c809169a4aed976b69ea8b8695bd45ae36c1cede2d9302206cfb07aacc149fbdde1f50496c6376c487123b55f3a595cfe00b36aa075a3c0d0100",
              "type": "nulldata"
          }
      }
  ],
  "hex": "020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0f03bafb010a2f7369676e65743a332ffeffffff0200f2052a010000002251207099e4b23427fc40ba4777bbf52cfd0b7444d69a3e21ef281270723f54c0c14b0000000000000000776a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf94c4fecc7daa24900473044022045cab4f6958e87d5f7b2c809169a4aed976b69ea8b8695bd45ae36c1cede2d9302206cfb07aacc149fbdde1f50496c6376c487123b55f3a595cfe00b36aa075a3c0d01000120000000000000000000000000000000000000000000000000000000000000000000000000",
  "blockhash": "000000948a2b6aad0a15bec0178aa682082c354b05a142de381ce3ab313396ef",
  "confirmations": 2,
  "time": 1676324504,
  "blocktime": 1676324504
}
function TransactionView() {
  return (
    <Container>
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableBody>
        <TableRow
          key="id"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Id
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.txid}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="hash"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Block Hash
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
          <Link >
              <Typography variant='body1' style={{textDecoration:"underline",color:'lightBlue'}}  align="right"> 
              {transaction.blockhash}
              </Typography>
          </Link> 
          </TableCell>
        </TableRow>
        <TableRow
          key="status"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Status
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.confirmations > 0?"Confirmed":"Unconfirmed"}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="confirmations"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Confirmations
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.confirmations}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow
          key="time"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Time
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.time}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="version"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Version
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.version}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow
          key="lock"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Lock Time
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.locktime}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="size"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Size
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.size}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="inputs"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Inputs
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.vin.length}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="outputs"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Traansaction Outputs
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.vout.length}
            </Typography>
          
          </TableCell>
        </TableRow>
    </TableBody>
  </Table>
</TableContainer>
<TransactionInputs />
<TransactionOutputs />
  </Container>
  )
}

export default TransactionView