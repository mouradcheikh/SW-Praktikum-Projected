//getParticipationByProject()

//getPersonByParticipation()

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import { Link as RouterLink } from 'react-router-dom';
import { AppApi } from '../../AppApi';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import ParticipationForm from '../dialogs/ParticipationForm';
// import {ic_compare_arrows} from 'react-icons-kit/md/ic_compare_arrows'
// import MoneyTransferDialog from './dialogs/MoneyTransferDialog'; Noten Dialog 




/**
 * Renders a ParticipationBO object within a ListEntry and provides a delete button to delete it. Links participations 
 * to a list of transactions. This is done by routing the link to /transactions and passing the ProjectBO and
 * the ParticipationBO as props to the ParticipationList component. It also shows a MoneyTransferDialog to transfer money.
 * 
 * @see See Material-UIs [Lists](https://material-ui.com/components/lists/)
 * @see See Material-UIs [ListItem](https://material-ui.com/api/list-item/)
 * @see See Material-UIs [Link](https://material-ui.com/components/links/)
 * @see See Material-UIs React Router integration [Composition](https://material-ui.com/guides/composition/#link)
 * @see See React Router [ReactRouter](https://reacttraining.com/react-router/web/guides/quick-start)
 * @see See React Router [Link](https://reacttraining.com/react-router/web/api/Link)
 * 
 * @see See [MoneyTransferDialog](#moneytransferdialog)
 * @see See [TransactionList](#transactionlist)
 * 
 * 
 */

class ParticipationListEntry extends Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();

    // Init an empty state
    this.state = {
      student: '',
      loadingInProgress: false,
      deletingInProgress: false,
      loadingError: null,
      deletingError: null,
      grade: '',
      showParticipationForm: false,
      // showMoneyTransferDialog: false,
    }
  }


  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // load initial balance
    // debugger;
    this.getGrading();
    // console.log("nach aufruf von Grading")
    this.getStudent();
    
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    if ((this.props.show) && (this.props.show !== prevProps.show)) {
      this.getStudent();
      this.getGrading();
    }
  }

  /** gets the students for this participation */

  
  getStudent = () => {
    let stud = this.props.participation.student_id
    if (stud !== 0){ //soll nurnach student im backend suchen, wenn participation auch eine student_id hat
      var api = AppApi.getAPI()
      // console.log(this.props.participation)
      api.getStudent(this.props.participation.student_id).then(student => //.student_id funktioniert (.getStudent_id()nicht?!?!?!?)
      this.setState({
        student: student,
        loadingInProgress: false, // loading indicator 
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          student: null,
          loadingInProgress: false,
          loadingError: e
        })
      );  

    // set loading to true
    this.setState({
      sut: 'loading',//????????
      loadingInProgress: true,
      loadingError: null
    });
  }
}

  /** Deletes this participation */
  deleteParticipation = () => {
    const { participation } = this.props;
    var api = AppApi.getAPI()
    api.deleteParticipation(participation.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(participation);
      this.props.onParticipationDeleted(participation);
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        deletingInProgress: false,
        deletingError: e
      })
    );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    });
  }

   /** Handles the onClick event of the edit participation button */
   editParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationForm: true
    });
  }

  /** Handles the onClose event of the ParticipationForm */
  participationFormClosed = (participation) => {
    // participation is not null and therefor changed
    if (participation) {
      this.setState({
        participation: participation,
        showParticipationForm: false
      });
    } else {
      this.setState({
        showParticipationForm: false
      });
    }
  }


  /** Handles click events from the transfer money button */
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ grade:
      this.textInput.current.value})
      // console.log(this.textInput.current.value)
      this.createGrading(this.textInput.current.value, this.props.participation.getID())
      this.getGrading()
    }

  createGrading(grade, participation_id){
    var api = AppApi.getAPI()
    // console.log(api)
    api.gradingStudent(grade, participation_id).then((grade) =>
        {
          // console.log(grade)
        this.setState({
            grade: grade
        })}
        )
      }
  
  
//     getGrading = () => {
//     let grade = this.props.participation.grading_id
//     if (grade !== 0){ //soll nurnach student im backend suchen, wenn participation auch eine student_id hat
//       var api = AppApi.getAPI()
//       console.log(this.props.participation)
//       api.getGradingByParticipation(this.props.participation.id).then(grade => 
//       this.setState({
//         grade: grade,
//         loadingInProgress: false, // loading indicator 
//         loadingError: null
//       })).catch(e =>
//         this.setState({ // Reset state with error from catch 
//           grade: null,
//           loadingInProgress: false,
//           loadingError: e
//         })
//       );  
//     // set loading to true
//     this.setState({
//       sut: 'loading',//????????
//       loadingInProgress: true,
//       loadingError: null
//     });
//     }
// }

getGrading = () => {
  let grade = this.props.participation.grading_id
  // console.log(grade)
  if (grade !== 0){ //soll nurnach student im backend suchen, wenn participation auch eine student_id hat
    var api = AppApi.getAPI()
    // console.log(this.props.participation)
    api.getGrading(this.props.participation.grading_id).then(grade => 
    this.setState({
      grade: grade,
      loadingInProgress: false, // loading indicator 
      loadingError: null
    })).catch(e =>
      this.setState({ // Reset state with error from catch 
        grade: null,
        loadingInProgress: false,
        loadingError: e
      })
    );  
  // set loading to true
  this.setState({
    sut: 'loading',//????????
    loadingInProgress: true,
    loadingError: null
  });
  }
}
  
    passed(){
      let passed = this.state.grade.passed
      // console.log(passed)
      // if (passed !== undefined){
        if (passed == true){
          return "Bestanden"
        }      
        else {
          return "Nicht Bestanden"
        }
      // }
    }
     
    

  // /** Handles the onClose event from the transfer money dialog */
  // moneyTransferDialogClosed = (transaction) => {
  //   this.setState({
  //     showMoneyTransferDialog: false
  //   });
  //   if (transaction) {
  //     // Transaction is not null and therefore was performed
  //     this.getBalance();
  //   }
  // }



  /** Renders the component */
  render() {
    const { classes, project, participation } = this.props;
    const { loadingInProgress, deletingInProgress, loadingError, deletingError, showParticipationForm, student, grade } = this.state;
    

    return (
      <div>
        <ListItem>
          <Typography className={classes.participationEntry}>
            {/* <Link component={RouterLink} to={{
              pathname: '/StudentZuordnung',
              owner: {
                project: project,
                participation: participation
              }
            }} >
              Teilnehmer {participation.id + " - " + student.matr_nr + " - " + student.name}
            </Link> */}
       
            <div>

            {student.matr_nr + " - " + student.name}
            </div>
           

            <Button color='primary' onClick={this.editParticipationButtonClicked}>
              edit
            </Button>

          </Typography>
            <div>
            {/* <form className={classes.root} noValidate autoComplete="off"> */}
            <form >
              {/* <Input type="text" placeholder="Note" ref ={this.textInput} inputProps={{ 'aria-label': 'description' }} className= "form-control" /> */}
              <input placeholder= "Note" type="text" ref={this.textInput} className= "form-control"/>
              <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' endIcon={<SendIcon/>} onClick={this.handleSubmit}>
              Bewerten
              </Button>
              {/* <input type="checkbox" checked={participation.graded} onChange={handleGraded}/> */}
            </form>
            <div>

            Bewertet: {grade.grade + " - " + this.passed()}
            </div>
            </div>

          <ListItemSecondaryAction>          
            <Button color='secondary' size='small' endIcon={<DeleteIcon/>} onClick={this.deleteParticipation}>
             Löschen
            </Button>
          </ListItemSecondaryAction>

        </ListItem>
        <ListItem>
          <LoadingProgress show={loadingInProgress || deletingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getStudent} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getGrading} />
          <ContextErrorMessage error={deletingError} contextErrorMsg={`The participation ${participation.getID()} could not be deleted.`} onReload={this.deleteParticipation} />
        </ListItem>
        <ParticipationForm show={showParticipationForm} participation={participation} student={student} onClose={this.participationFormClosed} />
        {/* <MoneyTransferDialog show={showMoneyTransferDialog} project={project} participation={participation} onClose={this.moneyTransferDialogClosed} /> */}
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%'
  }, 
  buttonMargin: {
    marginRight: theme.spacing(2),
  },
  participationEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

//TEXTFIELD PLACEHOLDER STYLES --> noch bearbeiten
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
    }));

/** PropTypes */
ParticipationListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO of this ParticipationListEntry */
  project: PropTypes.object.isRequired,
  /** The ParticipationBO to be rendered */
  participation: PropTypes.object.isRequired,
  /**  
   * Event Handler function which is called after a sucessfull delete of this participation. 
   * 
   * Signature: onParticipationDeleted(ParticipationBO participation); 
   */
  onParticipationDeleted: PropTypes.func.isRequired,
  /** If true, balance is (re)loaded */
  show: PropTypes.bool.isRequired
}


//TEXTFIELD

export default withStyles(styles, useStyles)(ParticipationListEntry);
