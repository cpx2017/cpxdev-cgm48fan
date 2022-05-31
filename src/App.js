import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch as BasicSwitch,
  useHistory
} from "react-router-dom";
import { AppBar, Toolbar,Typography, IconButton, Drawer, FormControlLabel, Switch, ListItem, ListItemIcon, Divider, ListItemText,
  Dialog, DialogActions, Button, DialogTitle, DialogContent, Avatar, Badge, CardContent, CardMedia, Slide, Grow, Fade } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AcUnitIcon from '@material-ui/icons/AcUnit'
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
import DnsIcon from '@material-ui/icons/Dns';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CodeIcon from '@material-ui/icons/Code';

import Home from './component/home';
import MemberList from './component/members';
import News from './component/news';
import Offici from './component/official';
import MamSam from './component/memberdetail';
import Api from './component/apisupport';
import PageErr from './component/404'

import Fet from './fetch'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const drawerWidth = 240;
const Client = '961896647339-roenm2ee6i60ed2rhbe2sqee0unlqj0f.apps.googleusercontent.com'
const useStyles = makeStyles((theme) => ({
  sm: {
    width: theme.spacing(3.8),
    height: theme.spacing(3.8),
  },
  lg: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  search: {
    right: theme.spacing(1),
    position: 'absolute',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  fabButton: {
    position: 'fixed',
    zIndex: 1000,
    bottom: 30,
    left: window.innerWidth > 600 ? 100 : 20,
    width: "auto",
    right: window.innerWidth > 600 ? 100 : 20,
  },
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);


function App() {
  const cls = useStyles();
  const History = useHistory()
  const [ Reduce, setReduce] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [uri, setUri] = React.useState('');
  const [login, setLogin] = React.useState(false);
  const [MemberDl, setMemDl] = React.useState(false);
  const [loginLoad, setLogLoad] = React.useState(false);
  const [kamiimg, setKami] = React.useState('');
  const [kamin, setKname] = React.useState('-');
  const [allDone, setAllDone] = React.useState(false);
  const [styleFade, setSty] = React.useState(0);
  const [geready, setReadyGE] = React.useState(false);
  
  const FetchKami = (fetdata) => {
    if (localStorage.getItem("glog") != null) {
      fetch(fetdata + '/cgm48/getFanMem?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString()  , {
        method :'get'
    })
      .then(response => response.json())
      .then(data => {
        if (data.obj != 'none') {
          setKami(data.obj.response.img)
          setKname(data.obj.response.name)
        } else {
          setKami('-')
          setKname('-')
        }
      });
    }
  }

  const ReduceAction = () => {
    if (localStorage.getItem("lowgraphic") == null) {
      localStorage.setItem("lowgraphic", "")
      setReduce(true)
    } else {
      localStorage.removeItem("lowgraphic")
      setReduce(false)
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem("lowgraphic") == null) {
      setReduce(false)
    } else {
      setReduce(true)
    }
    if (localStorage.getItem("glog") == null) {
      setLogin(false)
    } else {
      setLogin(true)
    }
    function isOdd() {
      const ran = Math.floor((Math.random() * 1000) + 1);
      return Math.abs(ran % 2) == 1;
   }
   
    setSty(isOdd() == true ? 2 :1)
    if (localStorage.getItem("lowgraphic") == null) {
      setReduce(false)
    } else {
      setReduce(true)
    }
    if (localStorage.getItem("glog") == null) {
      setLogin(false)
    } else {
      setLogin(true)
    }
    var dem = setInterval(function(){ 
      if (Fet().ul !== '') {
        clearInterval(dem)
        var timeo = setInterval(function(){ 
          if (sessionStorage.getItem('ads') != null) {
            clearInterval(timeo)
            setAllDone(true)
          }
        }, 4500);
        setUri(Fet().ul)
        FetchKami(Fet().ul)
      }
  }, 10);
  }, [])


  const responseGoogle = (response) => {
    localStorage.setItem("glog", JSON.stringify(response.profileObj))
    fetch(Fet().ul + '/cgm48/addFanMember?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString(), {
      method: 'POST', // or 'PUT'
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      })
      .then(response => response.text())
      .then(data => {
        if (data == "false") {
          FetchKami(Fet().ul)
          setLogin(true)
          setLogLoad(false)
          setOpen(false)
        } else {
          alert("System will be temporary error for a while. Please try again")
          setLogLoad(false)
          setMemDl(false)
          setLogin(false)
          localStorage.removeItem("glog")
          setOpen(false)
        }
      })
      .catch((error) => {
          alert("System will be temporary error for a while. Please try again")
          setLogLoad(false)
          setMemDl(false)
          setLogin(false)
          localStorage.removeItem("glog")
          setOpen(false)
      });
  }

  const errorlog = (response) => {
    setLogLoad(false)
    console.log(response);
  }

  const Signout = (response) => {
    setLogLoad(false)
    setMemDl(false)
    setLogin(false)
    localStorage.removeItem("glog")
    setOpen(false)
    if (window.location.pathname == '/fandom' || window.location.pathname == '/fandomroom') {
      window.location.href = '/'
    }
  }

  const GoElec = () => {
    window.open('//bnk48fan.cpxdev.tk/ge3', '_blank').focus();
  }

  if (uri != '' && allDone) {
    return (
      <div> 
          {uri != '' && (
            <>
             <Slide in={localStorage.getItem('lowgraphic') == null && window.innerWidth > 1100 ? !open : true} timeout={600} direction='down'>
            <AppBar position="sticky" className='bnktheme app-barcurve'>
                <Toolbar>
                  {open == false && (
                  <IconButton onClick={() => setOpen(true)} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  )}
                  <div onClick={()=> History.push('/')}>
                    <Typography variant='h5' className='title'>
                     CGM48 Fans Space
                    </Typography>
                  </div>
                    {window.innerWidth > 800 && (
                      <div className={cls.search + ' mt-2'}>
                      <FormControlLabel
                      control={
                        <Switch
                          checked={Reduce}
                          name="reduce"
                          onChange={()=> ReduceAction()}
                          color="secondary"
                        />
                      }
                      label="Reduce Graphic"
                    />
                      </div>
                    )}
                </Toolbar>
              </AppBar>
              </Slide>
              <Drawer
                        className={cls.drawer}
                        variant="temporary"
                        color="primary"
                        anchor="right"
                        open={open}
                        classes={{
                          paper: cls.drawerPaper,
                        }}
                      >
                      <div className={cls.drawerHeader} position="fixed">
                        <IconButton onClick={() => setOpen(false)} size="large">
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <Divider />
                      <d onClick={() => setOpen(false)}>
                      <ListItem component={Link} to='/' className={window.location.pathname == '/' ? 'activeNav' : ''} button>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem component={Link} to='/memberlist' className={window.location.pathname == '/memberlist' ? 'activeNav' : ''} button>
                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Members" />
                      </ListItem>
                      <ListItem component={Link} to='/news' className={window.location.pathname == '/news' ? 'activeNav' : ''} button>
                        <ListItemIcon>
                          <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="News" />
                      </ListItem>
                      <ListItem component={Link} to='/officialupdate' className={window.location.pathname == '/officialupdate' ? 'activeNav' : ''} button>
                        <ListItemIcon>
                          <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Official Update" />
                      </ListItem>
                      <ListItem onClick={() => GoElec()} button>
                        <ListItemIcon>
                          <HowToVoteIcon />
                        </ListItemIcon>
                        <ListItemText primary='BNK48 12th Single General Election' />
                      </ListItem>
                      <ListItem component={Link} to='/api' button>
                        <ListItemIcon>
                          <CodeIcon />
                        </ListItemIcon>
                        <ListItemText primary='API' />
                      </ListItem>
                      </d>
                      <Divider />
                      <ListItem onClick={() => {
                        alert('Region mode will enhance system performance. Current region connection has been referenced by IP address')
                      }} button>
                        <ListItemIcon>
                          <DnsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Region: ' + Fet().nme} />
                      </ListItem>
                      {
                  loginLoad ? (
                    <ListItem onClick={() => setMemDl(true)} button>
                    <ListItemIcon>
                    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="40px" />
                    </ListItemIcon>
                    <ListItemText primary="Signing in" />
                  </ListItem>
                  ) : (
                    <>
                      {!login ? (
                  <ListItem button>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <GoogleLogin
                    clientId={Client}
                    render={renderProps => (
                      <ListItemText onClick={renderProps.onClick} primary="Login as Google Account" />
                    )}
                    onSuccess={(e) => responseGoogle(e)}
                    onRequest={() => setLogLoad(true)}
                    onFailure={(e) => errorlog(e)}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={login}
                  />
                </ListItem>
                ) : (
                  <ListItem onClick={() => setMemDl(true)} button>
                  <ListItemIcon>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    badgeContent={kamiimg != '' && kamiimg != '-' ? <img src={kamiimg} data-toggle="tooltip" data-placement="top" title={"\"" + kamin + "\" is your Kami-Oshi"} className={cls.sm + ' border border-white rounded-circle cir avatarlimit'} /> : ''}
                  >
                    <Avatar alt={JSON.parse(localStorage.getItem("glog")).name} src={JSON.parse(localStorage.getItem("glog")).imageUrl} />
                  </Badge>
                  
                  </ListItemIcon>
                  <ListItemText primary="You're logged in" secondary={JSON.parse(localStorage.getItem("glog")).name} />
                </ListItem>
                )}
                 </>
                  )
                }
                
                      </Drawer>
                            <BasicSwitch>
                            <Route exact path="/" render={() => <Home fet={Fet().ul} />} />
                            <Route path="/memberlist" render={() => <MemberList fet={Fet().ul} />} />
                            <Route path="/news" render={() => <News fet={Fet().ul} />} />
                            <Route path="/officialupdate" render={() => <Offici fet={Fet().ul} />} />
                            <Route path="/member" render={() => <MamSam fet={Fet().ul} kamio={kamin} />} />
                            <Route path="/api" render={() => <Api fet={Fet().ul} />} />
                            <Route exact render={() => <PageErr />} />
                          </BasicSwitch>
                      
                     
              <footer className="bg-white text-center pt-2 pb-2 bnktheme">
                Copyright {new Date().getFullYear()}, CPXDevStudio Allright Reserved
                <br /> All CGM48 contents are licensed by Independent Artist Management (iAM). We don't affiliated with them. Please don't be to copy and modified contents for any commercial use.
              </footer>
              {localStorage.getItem("glog") != null && (
           <Dialog
           open={localStorage.getItem("glog") != null ? MemberDl : false}
           onClose={() => setMemDl(false)}
           fullWidth={true}
           maxWidth='sm'
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
       >
           <DialogTitle id="alert-dialog-title">Are you sure to sign-out</DialogTitle>
           <DialogContent>
             {kamin != '-' ? (
           <ListItem onClick={() => window.location.href = "/member?name=" + kamin.toLowerCase()} button>
               <ListItemIcon>
               <img alt={JSON.parse(localStorage.getItem("glog")).name} src={kamiimg} className={cls.lg + ' border border-white rounded-circle cir avatarlimit'} />
             </ListItemIcon>
             <ListItemText primary={'Your Kami-Oshi is ' + kamin + ' CGM48'} secondary='Click here to see more description of your Kami-Oshi' />
             </ListItem>
             ) : (
           <ListItem button>
               <ListItemIcon>
                         <Avatar alt={JSON.parse(localStorage.getItem("glog")).name} src="" />
                       </ListItemIcon>
                       <ListItemText primary="You don't have any Kami-Oshi" secondary='Please choose your member which you love only once person.' />
                       </ListItem>
             )}
                     <ListItem className='text-info' button>
                       <ListItemText primary='Feature will be unavaliable when you not sign in' secondary='Choose and share your Kami-Oshi member, Fandom group view and add new event' />
                     </ListItem>
           </DialogContent>
           <DialogActions>
           <GoogleLogout
           clientId={Client}
           render={renderProps => (
             <Button onClick={renderProps.onClick} className="text-danger">
             Sign out
         </Button>
           )}
           onLogoutSuccess={(e) => Signout(e)}
           isSignedIn={login}
         />
           <Button onClick={() => setMemDl(false)} className="text-dark">
               Close
           </Button>
           </DialogActions>
       </Dialog>
        )}
              </>
          )}
        </div> 
          )
  }

  return (
    <div className="container mt-5 mb-5">
      {window.innerWidth > 900 ? (
         <div className="row" onDoubleClick={() => setAllDone(true)}>
         <Fade in={styleFade != 0 ? true : false} timeout={400} style={{ transitionDelay: styleFade == 2 ? 0 : 500 }}>
           <div className="col pr-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/pc/1.webp" width="100%" />
           </div>
         </Fade>
         <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 300 : 400 }}>
           <div className="col p-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/pc/2.webp" width="100%" />
           </div>
         </Fade>
         <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 400 : 300 }}>
           <div className="col p-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/pc/3.webp" width="100%" />
           </div>
         </Fade>
           <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 500 :  0 }}>
           <div className="col pl-0">
               <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/pc/4.webp" width="100%" />
           </div>
         </Fade>
         <Grow in={uri != '' && geready ? true : false} timeout={1000}>
         <div className={cls.fabButton}>
             <Alert severity="info">
             <AlertTitle>Heal your energy with CGM48 "Maeshika Mukanee" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
               Double click or tap on image to skip this page
             </Alert>
             </div>
         </Grow>
         <Grow in={uri != '' && !geready ? true : false} timeout={1000}>
         <div className={cls.fabButton}>
             <Alert severity="info">
             <AlertTitle>Heal your energy with CGM48 "Maeshika Mukanee" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
                     Double click/tap here on image or wait 5 seconds to skip this page
             </Alert>
             </div>
         </Grow>
       </div>
      ) : (
        <div className="row" onDoubleClick={() => setAllDone(true)}>
        <Fade in={styleFade != 0 ? true : false} timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 0 : 350 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/1.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1250 : 450 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/2.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1350 : 550 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/3.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 250 :  650 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/4.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1150 :  750 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/5.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1450 :  850 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/6.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 350 :  950 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/7.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1050 :  1050 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/8.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1550 :  1150 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/9.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 450 :  1250 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/10.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 950 :  1350 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/11.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1650 :  1450 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/12.webp" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 550 :  1550 }}>
          <div className="col pr-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/13.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 850 :  1650 }}>
          <div className="col p-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/14.webp" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1650 :  1450 }}>
          <div className="col pl-0">
              <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/cgm48/phone/15.webp" width="100%" />
          </div>
        </Fade>
        <Grow in={uri != '' && geready ? true : false} timeout={1000}>
        <div className={cls.fabButton}>
            <Alert severity="info">
              <AlertTitle>Heal your energy with CGM48 "Maeshika Mukanee" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
              Double click or tap on image to skip this page
            </Alert>
            </div>
        </Grow>
        <Grow in={uri != '' && !geready ? true : false} timeout={1000}>
        <div className={cls.fabButton}>
            <Alert severity="info">
            <AlertTitle>Heal your energy with CGM48 "Maeshika Mukanee" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
                    Double click/tap here on image or wait 5 seconds to skip this page
            </Alert>
            </div>
        </Grow>
      </div>
      )}
</div>
  )
}

export default App;
