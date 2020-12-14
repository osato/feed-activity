import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { 
  Grid, Container, Typography, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, ListItemSecondaryAction, IconButton, Divider, Collapse

} from '@material-ui/core';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CommentList from './comment-list';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    paddingTop: '20px',
  },
  layout: {
    textAlign: 'center',
  },
  bgColor: {
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  click: {
    cursor: 'pointer',
  },
}));

function Post() {
  const classes = useStyles();
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [dense, setDense] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const getComments = async () => {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    await fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    }).then((data: any) => {
      setComments(data);
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
      await fetch(apiUrl).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed.');
      }).then((data: any) => {
        setPosts(data);
        getComments();
      }).catch(error => {
        console.log(error);
      });
    };

    getPosts();
  }, []);

  const handleClick = (index: any) => {
    if (posts.length > 0 && comments.length > 0) {
      posts.forEach((post) => {
        post.comments = [];
        comments.forEach((comment) => {
          if (post.id === comment.postId) {
            post.comments.push(comment);
          }
        });
      });
    }

    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.layout}>
            <Typography variant="h6">
              User Posts & Comments
            </Typography>
            <div className={classes.bgColor}>
              <List className={classes.root} dense={dense}>
                {posts.map((post, index) => (
                  <React.Fragment>
                    <ListItem key={post.id} className={classes.click} onClick={() => handleClick(index)}>
                      <ListItemAvatar>
                        <Avatar>
                          <AccountBoxSharpIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={'User ' + post.userId + ': ' + post.title}
                        secondary={post.body ? post.body : null}
                      />
                      {index === selected ? <ExpandLess /> : <ExpandMore />}
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <SmsOutlinedIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={index === selected} timeout="auto" unmountOnExit>
                      <CommentList post={post} />
                    </Collapse>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Post;