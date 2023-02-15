import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Typography } from '@mui/material';

const properties:Array<string> = ["Locking Script","Value","Locking Script Type","Address",]


const outputs =  [
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
]

function TransactionOutputs({outputs}:{outputs:any}) {
  if(outputs === undefined){
    return <>
    
    </>
  }
  if(outputs === null){
    return <>
    
    </>
  }
  return (
    <div>
      <Typography variant='h5' padding={2} style={{textDecoration:'underline'}}>
        Transaction is sending to {outputs.length} {outputs.length === 1?"Output":"Outputs"}
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
        {outputs.map((output:any) => (
          <TableRow
            key={output.scriptPubKey.asm}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
             <TableCell component="th" scope="row">
            
              <Typography variant='subtitle1' align="left" color={'grey'}  > 
                {output.scriptPubKey.asm}
              </Typography>
      
            </TableCell>
            <TableCell component="th" scope="row">
            <Typography variant='body1' align="left"> 
              {output.value}
            </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
            <Typography variant='body1' align="left"> 
              {output.scriptPubKey.type}
            </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
            {
              output.scriptPubKey.address !== undefined?
              <Typography variant='body1'   align="left"> 
               {output.scriptPubKey.address}
              </Typography>
             
              :"OP_RETURN OUTPUT"
            }
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
}

export default TransactionOutputs