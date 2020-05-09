// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import useJoinGroup from '../hooks/CommentHooks';
// import { withRouter } from 'react-router-dom';
// import {
//   Button,
//   makeStyles,
//   List,
//   ListItem,
//   Card,
//   CardHeader,
//   CircularProgress,
//   Typography,
// } from '@material-ui/core';
// // import {red} from '@material-ui/core/colors';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import { favourite } from '../hooks/ApiHooks';

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     color: 'rgba(255, 255, 255, 0.54)',
//   },
//   list: {
//     height: '100%',
//     width: '100%',
//   },
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     /* backgroundColor: theme.palette.background.paper, */
//   },
//   jaa: {
//     display: 'block',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     /* backgroundColor: theme.palette.background.paper, */
//   },
//   container: {
//     display: 'grid',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// }));

// const JoinGroup = ({ fileId, favId, history }) => {
//   const [loading, setLoading] = useState(false);
//   const classes = useStyles();
//   const doUpload = async () => {
//     setLoading(true);
//     try {
//       const uploadObject = {
//         file_id: fileId,
//         favourite_id: favId,
//       };
//       const result = await favourite(
//         uploadObject,
//         localStorage.getItem('token')
//       );
//       console.log('fav', result);
//       setTimeout(() => {
//         setLoading(false);
//         history.push('/groups');
//       }, 1000);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

//   const { inputs, setInputs, handleInputChange, handleSubmit } = useJoinGroup(
//     doUpload
//   );

//   useEffect(() => {}, [inputs.comment, setInputs]);
//   console.log('inputs', inputs);

//   return (
//     <>
//       <List>
//         <Card className={classes.jaa}>
//           <ValidatorForm
//             onSubmit={handleSubmit}
//             instantValidate={false}
//             noValidate
//           >
//             <ListItem>
//               <Button
//                 fullWidth
//                 color='primary'
//                 type='submit'
//                 variant='contained'
//               >
//                 Join Group
//               </Button>
//             </ListItem>
//           </ValidatorForm>
//           {loading && (
//             <ListItem>
//               <CircularProgress />
//             </ListItem>
//           )}
//         </Card>
//       </List>
//     </>
//   );
// };

// JoinGroup.propTypes = {
//   history: PropTypes.object,
//   fileId: PropTypes.number,
// };

// export default withRouter(JoinGroup);
