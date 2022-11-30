import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { databaseActions } from "../../store/database-slice";
import { getDatabase, ref, onValue } from "firebase/database";
import { getUserId } from "../../util/Firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Arrow from "../../images/arrrow-64px.png";
import classes from "./Players.module.css";

const arrowIcon = (
  <img src={Arrow} alt="my uid indicator" className={classes.arrow} />
);
const Players = () => {
  const roomKey = useSelector((state) => state.database.roomKey);
  const players = useSelector((state) => state.database.players);
  const dispatch = useDispatch();

  const uid = getUserId();

  // fetch players data from Firebase.js to save to redux store and display on screen.
  useEffect(() => {
    const db = getDatabase();
    const nicknamesRef = ref(db, "rooms/" + roomKey + "/players");
    let data;
    return onValue(nicknamesRef, (snapshot) => {
      data = snapshot.val();
      dispatch(databaseActions.savePlayers(data));
    });
  }, [roomKey, dispatch]);

  return (
    <div className={classes.box}>
      <TableContainer>
        <p className={classes.roomKey}>{roomKey}</p>
        <Table className={classes.playersTable} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th">Players</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.nickname}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={classes.tableRow}
              >
                <TableCell component="th" scope="row">
                  {/* {uid === player.id
                    ? player.nickname + " <="
                    : player.nickname} */}
                  <span>{player.nickname}</span>{" "}
                  <span>{uid === player.id ? arrowIcon : null}</span>
                </TableCell>
                <TableCell align="right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Players;
