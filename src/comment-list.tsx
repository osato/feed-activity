import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { 
  Grid, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    paddingTop: '5px',
  },
  layout: {
    textAlign: 'left',
  },
  displayButton: {
    float: 'right',
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
}));

function CommentList(props: any) {
  const classes = useStyles();
  const { post } = props;

  useEffect(() => {
    console.log('post object', post);
  }, [post])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.layout}>
          <List component="div" disablePadding>
            {post.comments && post.comments.map((comment: any) => (
              <ListItem className={classes.nested} key={comment.id}>
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={comment.name + ' - (' + comment.email + ')'}
                  secondary={comment.body ? comment.body : null}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default CommentList;