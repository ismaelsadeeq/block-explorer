import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const properties:Array<string> = ["Block height","Transactions","Time", "Block size",]
function createData(
  hash: string,
  height: number,
  time: string,
  transactions: number,
  size: number,
) {
  return { hash, height, time, transactions, size };
}

const rows = [
  createData('0000011aa506643213a88810a9a369a866a1d12d9fbc8e6ab95f59b1db5975f9', 129942, "1676303411", 4, 1565),
  createData('0000011aa506643213a88810a9a369a866a1d12d9fbc8e6ab95f59b1db5975f9', 129942, "1676303411", 4, 1565),
  createData('0000011aa506643213a88810a9a369a866a1d12d9fbc8e6ab95f59b1db5975f9', 129942, "1676303411", 4, 1565),
  createData('0000011aa506643213a88810a9a369a866a1d12d9fbc8e6ab95f59b1db5975f9', 129942, "1676303411", 4, 1565),
  createData('0000011aa506643213a88810a9a369a866a1d12d9fbc8e6ab95f59b1db5975f9', 129942, "1676303411", 4, 1565),
];

export default function BlocksList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
            <Typography variant='body1'> 
              Block Hash
              </Typography>
              </TableCell>
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
          {rows.map((row) => (
            <TableRow
              onClick={()=>{}}
              key={row.hash}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1' style={{textDecoration:"underline"}} > 
                {row.hash}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant='body1'> 
                {row.height}
                </Typography>
              </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.transactions}
              </Typography>
                </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.time}
              </Typography>
                </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.size}
                </Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}