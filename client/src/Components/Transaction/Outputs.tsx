import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Typography } from '@mui/material';

const properties:Array<string> = ["Locking Script","Value","Locking Script Type","Address",]

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