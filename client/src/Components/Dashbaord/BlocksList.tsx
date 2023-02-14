import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Typography } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const properties: Array<string> = ["Block height", "Transactions", "Time", "Block size",]
export default function BlocksList({ blocks }: { blocks: any }) {
  const navigate: NavigateFunction = useNavigate()
  if (blocks === null) {
    return (
      <>
        <CircularProgress style={{ color: 'white' }} />
      </>
    )
  }
  if (blocks.length === 0) {
    return (
      <>
        <Typography>
          Something went wrong could not get blocks
        </Typography>
      </>
    )
  }
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
              properties.map((property) => {
                return <TableCell align="left">
                  <Typography variant='body1'>
                    {property}
                  </Typography>
                </TableCell>
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {blocks.map((row: any) => {
            let time:Date = new Date(0)
            time.setUTCSeconds(row.time)
            return <TableRow
              onClick={() => { }}
              key={row.hash}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button onClick={() => {
                  navigate('/block/' + row.hash)
                }} style={{ textDecoration: "underline", color: 'lightBlue' }} >
                  {row.hash}
                </Button>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant='body1'>
                  {row.height}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant='body1'>
                  {row.nTx}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant='body1'>
                  {time.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant='body1'>
                  {row.size} Bytes
                </Typography>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}