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
Card, Dialog, DialogActions, Button, DialogTitle, DialogContent, Avatar, Slide } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
import MamSam from './component/memberdetail';
import Api from './component/apisupport';
import PageErr from './component/404'

import Fet from './fetch'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const drawerWidth = 240;
const Client = '961896647339-roenm2ee6i60ed2rhbe2sqee0unlqj0f.apps.googleusercontent.com'
const useStyles = makeStyles((theme) => ({
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
  const [kamin, setKname] = React.useState('');
  
  const FetchKami = (fetdata) => {
    if (localStorage.getItem("glog") != null) {
      fetch(fetdata + '/bnk48/getFanMem?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString()  , {
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
    var dem = setInterval(function(){ 
      if (Fet().ul !== '') {
        clearInterval(dem)
        setUri(Fet().ul)
        // FetchKami(Fet().ul)
      }
  }, 10);
  }, [])


  const responseGoogle = (response) => {
    setLogLoad(false)
    localStorage.setItem("glog", JSON.stringify(response.profileObj))
    if (window.location.pathname != '/') {
      window.location.reload();
    }
    setLogin(true)
    setOpen(false)
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

  if (uri != '') {
    return (
 

      <div> 
          {uri != '' && (
            <BrowserRouter>
             <Slide in={localStorage.getItem('lowgraphic') == null && window.innerWidth > 1100 ? !open : true} timeout={600} direction='down'>
            <AppBar position="sticky" className='bnktheme app-barcurve'>
                <Toolbar>
                  {open == false && (
                  <IconButton onClick={() => setOpen(true)} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  )}
                  <div onClick={()=> window.location.href = "/"}>
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
                      <ListItem component={Link} to='/' button>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem component={Link} to='/memberlist' button>
                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Members" />
                      </ListItem>
                      <ListItem component={Link} to='/news' button>
                        <ListItemIcon>
                          <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="News" />
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
                        window.open('https://status.cpxdev.tk', '_blank').focus()
                      }} button>
                        <ListItemIcon>
                          <DnsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Region: ' + Fet().nme} />
                      </ListItem>
                      
                      
                      </Drawer>
                            <BasicSwitch>
                            <Route exact path="/" render={() => <Home fet={Fet().ul} />} />
                            <Route path="/memberlist" render={() => <MemberList fet={Fet().ul} />} />
                            <Route path="/news" render={() => <News fet={Fet().ul} />} />
                            <Route path="/member" render={() => <MamSam fet={Fet().ul} kamio={kamin} />} />
                            <Route path="/api" render={() => <Api fet={Fet().ul} />} />
                            <Route exact render={() => <PageErr />} />
                          </BasicSwitch>
                      
                     
              <footer className="bg-white text-center pt-2 pb-2 bnktheme">
                Copyright {new Date().getFullYear()}, CPXDevStudio Allright Reserved
                <br /> All CGM48 contents are licensed by Independent Artist Management (iAM). We don't affiliated with them. Please don't be to copy and modified contents for any commercial use.
              </footer>
              </BrowserRouter>
          )}
          <Dialog
            open={MemberDl}
            onClose={() => setMemDl(false)}
            fullWidth={true}
            maxWidth='sm'
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Are you sure to sign-out</DialogTitle>
            <DialogContent>
              Some feature cannot be used when you don't login.
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
          
        </div> 
          )
  }

    return (
      <div className='text-center mt-5 pt-5'>
      <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center' />
   Welcome to CGM48 Fan Space, please wait
 </div>
    )
}

export default App;
