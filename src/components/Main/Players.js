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
  const players = useSelector((state) => state.database.players);
  const dispatch = useDispatch();

  // fetch players data from Firebase.js to save to redux store and display on screen.
  useEffect(() => {
    getPlayers(roomKey);
    dispatch(databaseActions.savePlayers(getPlayers(roomKey)));
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
          {players.map((player) => (
            <TableRow
              key={player.nickname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.nickname}
              </TableCell>
              <TableCell align="right">{player.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Players;
