import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { databaseActions } from "../../store/database-slice";
import { getPlayers } from "../../util/Firebase";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import classes from "./Players.module.css";

const Players = () => {
  const roomKey = useSelector((state) => state.database.roomKey);
  const nicknames = useSelector(state => state.database.nicknames)
  const dispatch = useDispatch();
  const createData = (nickname, points) => {
    return { nickname, points };
  };

  const rows = [
    createData("Dave", 12),
    createData("Neil", 20),
    createData("Miri", 16),
  ];

  useEffect(() => {
    console.log(roomKey);
    const playersData = getPlayers(roomKey);
    dispatch(databaseActions.savePlayers(playersData));
    // console.log(playersData);

    // for (const user in playersData) {
    //   console.log(playersData[user].nickname);
    // }
    console.log(nicknames);
  }, [roomKey, dispatch]);
  return (
    <TableContainer className={classes.box}>
      <p>{roomKey}</p>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Players</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.nickname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nickname}
              </TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Players;
