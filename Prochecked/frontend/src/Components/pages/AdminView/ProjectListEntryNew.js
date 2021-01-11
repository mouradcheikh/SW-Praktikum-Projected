import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button,ButtonGroup } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import {ProjectBO} from '../../../AppApi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import CheckIcon from '@material-ui/icons/Check';
import ModuleForm from'../../dialogs/DropdownModule'

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';




/**
 * Renders a ProjectBO object within a expandable/collapsible ProjectListEntryNew with the project manipulation
 * functions. If expanded, it renders a AccountList.
 * 
 * @see See [ProjectListNew](#projectlist)
 * 
 */
class ProjectListEntryNew extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: props.project,
      showProjectForm: false,
      showProjectDeleteDialog: false,
      updatedProject: null,
    };
  }

  updateModule = (new_module, new_state) => {
    console.log("updatemodule")
    let updated_project = this.state.project
    updated_project.setModule(new_module)
    this.setState({
      project: updated_project
    }, () => {this.updateProject(new_state); console.log(this.state.project)})
  }

  updateProject = (new_state) => {
    // clone the original cutomer, in case the backend call fails
    console.log(new_state)
    let updatedProject = Object.assign(new ProjectBO(), this.state.project);
    // set the new attributes from our dialog
    
    updatedProject.setProjectState(new_state);
   
    AppApi.getAPI().updateProject(updatedProject).then(project => {
      this.setState({
        // project: project,
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null,
        updatedProject: updatedProject,                 // no error message
      }, () => this.updateParentComponent());
      // keep the new state as base state
      this.baseState.project = this.state.project;
      this.props.onClose(updatedProject);      // call the parent with the new project
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator 
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  FreigabeButtonClicked = (event) => {
    this.setState({
      showProjectForm: true
    });
  }

  updateModuleOfProject = (project) => {
    this.setState({
      project: project
    }, () => console.log(this.state.project))
    
  }

  updateParentComponent = (() => {
    this.props.getProjectsByStateNew()
    this.props.getProjectsByStateDeclined()
    this.props.getProjectsByStateAccepted()
    console.log("else if state 3")
})

ProjectFormClosed = (project) => {
  // participation is not null and therefor changed
  if (project) {
    this.setState({
      project: project,
      showProjectForm: false
    });
  } else {
    this.setState({
      showProjectForm: false
    });
  }
}
//   /** Handles onChange events of the underlying ExpansionPanel */
//   expansionPanelStateChanged = () => {
//     this.props.onExpandedStateChange(this.props.project);
//   }

//   /** Handles onAccountDelete events from an AccountListEntry  */
//   deleteAccountHandler = (deletedAccount) => {
//     // console.log(deletedAccount.getID());
//     this.setState({
//       accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
//     })
//   }

/** Handles click events from the transfer money button */

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, showProjectForm, showProjectDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      project.project_state ===1?
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
                  <Button variant="contained"
                          color="secondary"
                          className={classes.buttonFreigeben}
                          startIcon={<CheckIcon/>}
                          variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(3),() => this.FreigabeButtonClicked()}>
                  Freigeben
                  </Button>
                  
                  <Button variant="contained"
                          color="secondary"
                          className={classes.buttonAblehnen}
                          startIcon={<HighlightOffIcon/>}
                          variant='outlined' color='primary' size='small' onClick={() => this.updateProject(2)}>
                  Ablehnen
                  </Button>
                </Typography>
                <ModuleForm show={showProjectForm} project={project} onClose={this.ProjectFormClosed} updateProject ={this.updateProject} updateModuleOfProject={this.updateModuleOfProject}/>
                <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
                </Typography>
                <Typography variant='body1' className={classes.heading}>{"Projektart:"+ " "+ project.getProjectType()} 
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
         <AccordionDetails> 
          </AccordionDetails>
        </Accordion> 
      </div>
      : project.project_state ===2?
      <div>
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          id={`project${project.getID()}accountpanel-header`}
        >
          
          <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item>
              <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CheckIcon/>}
                className={classes.button} variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(3)}>
                Freigeben
                </Button>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ReplyRoundedIcon/>}
                className={classes.button} variant='outlined' color='primary' size='small' onClick={() => this.updateModule(0, 1)}>
                Rückgängig
                </Button>
              </Typography>
              <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
       <AccordionDetails> 
        </AccordionDetails>
      </Accordion> 
    </div>
    : 
    <div>
    <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        id={`project${project.getID()}accountpanel-header`}
      >
        
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
              <Button variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<HighlightOffIcon/>}
              className={classes.button} variant='outlined' color='primary' size='small' onClick={() => this.updateModule(0, 2)}>
              Ablehnen
              </Button>
              <Button variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<ReplyRoundedIcon/>}
              className={classes.button} variant='outlined' color='primary' size='small'  onClick={() => this.updateModule(0, 1)}>
              Rückgängig
              </Button>
            </Typography>
            <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
     <AccordionDetails> 
      </AccordionDetails>
    </Accordion> 
  </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  buttonFreigeben: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(65)
  },
  buttonAblehnen:{
    marginRight: theme.spacing(0),
  }

});
 


/** PropTypes */
ProjectListEntryNew.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,
  /** The state of this ProjectListEntryNew. If true the project is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjectListEntryNew 
   * 
   * Signature: onExpandedStateChange(ProjectBO project)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /** 
   *  Event Handler function which is called after a sucessfull delete of this project.
   * 
   * Signature: onProjectDelete(ProjectBO project)
   */
  onProjectDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjectListEntryNew);




