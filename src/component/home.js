import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';
    import { useHistory } from 'react-router-dom';

const HomeCom = ({fet}) => {
    const History = useHistory()
    const [Loaded1, setLoaded1] = React.useState(false);
    const [Loaded2, setLoaded2] = React.useState(false);
    const [onMonth, setMonth] = React.useState(false);
    const [birth, setBirth] = React.useState([]);
    const [samplemem, setMem] = React.useState([]);
    React.useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/cgm48/getmemberbybirth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    if (data.count == 0) {
        setMonth(true)
        fetch(fet + '/cgm48/getmemberbybirthmonth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    setBirth(data.response)
        setLoaded1(true)
  });
    } else {
        setBirth(data.response)
        setLoaded1(true)
    }
  });
    }, [])

    const ChangeRoute = (name) =>{
        History.push("/member?name=" + name.toLowerCase())
    }

    return ( 
        <>
        {window.innerWidth > 800 && (
          <div class="video-background">
          {localStorage.getItem('lowgraphic') == null ? (
            <div class="video-foreground">
            <iframe src="https://www.youtube.com/embed/BWDfOgXnXxw?autoplay=1&mute=1&controls=0&loop=1&playlist=BWDfOgXnXxw" frameborder="0"></iframe>
          </div>
          ) : (
            <Fade in={true} timeout={800}>
               <img src="https://i.scdn.co/image/ab676186000010165165395340dcd9ba036be6ed" width={window.innerWidth} />
              </Fade>
          )}
      </div>
        )}
             {window.innerWidth > 800 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Welcome to CGM48 Fan Space
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  This is your space for join with CGM48 fans around the world. Let's enjoy!
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  How do you do in this space?
                  <ListItem>
                    <ListItemText primary="1. See current all members and view her profile." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. Who are member born today. You can know. (Reference from local timezone)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Notes: Your donation and feedback is primary phase to help our online space work better." />
                  </ListItem>
                </Typography>
              </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="bnktheme pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className="ml-2 mr-2">
      <CardContent>
        <Typography variant="h5" component="h2">
          Welcome to CGM48 Fan Space
        </Typography>
        <hr />
        <Typography color="textSecondary">
          This is your space for join with CGM48 fans around the world. Let's enjoy!
        </Typography>
        <hr />
        <Typography variant="body1" component="p">
          How do you do in this space?
          <ListItem>
            <ListItemText primary="1. See current all members and view her profile." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Who are member born today. You can know. (Reference from local timezone)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Notes: Your donation and feedback is primary phase to help our online space work better." />
          </ListItem>
        </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  
  <div className="stage text-center pt-5 pb-2">
  {onMonth ? (
  <h3 className='mb-5'>CGM48 Members Birthday in this month</h3>
  ) : (
    <h3 className='mb-5'>CGM48 Members Birthday in today</h3>
  )}
  {Loaded1 ? (
      <div className='row ml-3 mr-3 justify-content-center'>
      {birth.length > 0 ? birth.map((item, i) => (
        <Zoom in={true} timeout={150} style={{ transitionDelay: (i * 150)-150 }}>
           <div className='col-md-3 mb-5' onClick={() => ChangeRoute(item.name)}>
           <Card>
           <CardActionArea>
           <CardMedia
                 src={item.img}
                 component="img"
                 className={item.graduated == true ? 'grayimg' : ''}
                 />
               <CardContent>
                   <h5>{item.name}</h5>
                   <p>Birthday: {new Date(new Date().getFullYear() + "-" + (new Date(item.birthday).getMonth() + 1)+ "-" + (new Date(item.birthday).getDate())).toDateString()}</p>
               </CardContent>
             </CardActionArea>
              </Card> 
           </div>
          </Zoom>
      )) : (
          <h6>No CGM48 member birthday in today.</h6>
      )}
      </div>
  ) : (
    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="50px" className='text-center' />
  )}
  </div>
        </>
    );
}
 
export default HomeCom;