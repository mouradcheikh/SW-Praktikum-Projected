import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, createMuiTheme, Theme } from '@material-ui/core/styles';
import {withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid, Container } from '@material-ui/core';
import {Link} from 'react-router-dom';
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 600 ,
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: 'gray'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      backgroundColor: 'white',
    },
  })
);

export default function AdminView(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Container maxWidth = 'lg'> */}
      <Grid container spacing={1} justify = 'center'>
        
        <Grid alignContent = 'center' alignItems = 'center'>
          <Grid>
          <h1 align = 'center' style ={{color: "white"}} >Herzlich Willkommen</h1>
          <h2>Sie haben sich als Admin eingeloggt</h2>
            
            </Grid>
          {/* <Paper className={classes.paper}> */}

            








          {/* <Link to='/CreatePerson' style={{ textDecoration: 'none' }}>
          <MenuItem>Personen anlegen</MenuItem>
          </Link >
          <Link to='/CreateSemester' style={{ textDecoration: 'none' }}>
          <MenuItem>Semester erstellen</MenuItem>
          </Link >
          <Link to='/CreateModule'>
          <MenuItem>Modul erstellen</MenuItem>
          </Link >
          <Link to='/ProjectListNew'>
          <MenuItem>Projekte freigeben</MenuItem>
          </Link>
          <Link to="/CreateProjectType">
          <MenuItem>Projektarten pflegen</MenuItem>
          </Link>
          </Paper>
          </Grid>
          <Grid item xs={12}>
            <h3>Dozent-Aktionen</h3>
            <Paper className={classes.paper}>
              <Link to="/DropDown_Dozent">
                <MenuItem>
                  Projekte erstellen/Bewertung-Teilnehmerpflege von Projekten{" "}
                </MenuItem>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <h3>Student-Aktionen</h3>
            <Paper className={classes.paper}>
              <Link to="SelectStudent">
                <MenuItem>
                  Student für Projekte registieren/Semesterbericht einsehen
                </MenuItem>
              </Link> */}
            {/* </Paper> */}
          </Grid>
     
      </Grid>
    {/* </Container> */}
    </div>
  );
}

// export default (AdminView)




// export default function MenuListComposition() {
//   const classes = useStyles();




// class AdminView extends Component {





//   render() {

//    const {classes} = this.props

// return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <MenuList>
//         <Grid item xs={12}>
//         <h3>Admin-Aktionen</h3>
//           <Paper className={classes.paper}>
//           <Link to='/CreatePerson'>
//           <MenuItem>Personen anlegen</MenuItem>
//           </Link >
//           <Link to='/CreateSemester'>
//           <MenuItem>Semester erstellen</MenuItem>
//           </Link >
//           <Link to='/CreateModule'>
//           <MenuItem>Modul erstellen</MenuItem>
//           </Link >
//           <Link to='/ProjectListNew'>
//           <MenuItem>Projekte freigeben</MenuItem>
//           </Link>
//           <Link to="/CreateProjectType">
//           <MenuItem>Projektarten pflegen</MenuItem>
//           </Link>
//           </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <h3>Dozent-Aktionen</h3>
//             <Paper className={classes.paper}>
//               <Link to="/DropDown_Dozent">
//                 <MenuItem>
//                   Projekte erstellen/Bewertung-Teilnehmerpflege von Projekten{" "}
//                 </MenuItem>
//               </Link>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <h3>Student-Aktionen</h3>
//             <Paper className={classes.paper}>
//               <Link to="SelectStudent">
//                 <MenuItem>
//                   Student für Projekte registieren/Semesterbericht einsehen
//                 </MenuItem>
//               </Link>
//             </Paper>
//           </Grid>
//         </MenuList>
//       </Grid>
//     </div>
//   );



//   const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       // backgroundColor: 'gray'
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: "left",
//       color: theme.palette.text.secondary,
//     },
//   })
//   );

// };
// }

// export default withStyles(styles)(AdminView);