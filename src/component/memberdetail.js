import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Fade, Grow, CardMedia, Typography, Zoom, Link, Breadcrumbs, Button, AppBar, Toolbar, IconButton, Slide, ListItemText, List , ListItem,Divider } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import GroupIcon from '@material-ui/icons/Group';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PanToolIcon from '@material-ui/icons/PanTool';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import moment from 'moment'

import { Fireworks } from 'fireworks-js/dist/react'
import Swal from 'sweetalert2'

var pm = new Audio('https://p.scdn.co/mp3-preview/26031551568cba193fbb55d6e4dcf3eb8fb99b04?cid=774b29d4f13844c495f206cafdad9c86')

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const fwoptions = {
    speed: 3,
  }

  const fwstyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'transperent'
  }

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  const hbdparse = [
    "May this special day bring you endless joy and tons of precious memories!",
    "Today is the birthday of the person who is spreading joy and positivity all around. May your birthday and your life be as wonderful as you are!",
    "Your birthday only comes once a year, so make sure this is the most memorable one ever and have a colorful day.",
    "Wishing you a wonderful day and all the most amazing things on your Big Day!"
]

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const MemDetail = ({fet, kamio, setSec}) => {

        const classes = useStyles();
        const [open, setOpen] = React.useState(false);
        const History = useHistory()
        const [mem, setmem] = React.useState('');
        const [arr, setArr] = React.useState([]); 
        const [geResult, setGE] = React.useState(null); 
        const [Loaded, setLoaded] = React.useState(false);
        const [birthday, setBirthday] = React.useState(false);
        const [kami, setKami] = React.useState(0);
        
        const [play, onPlay] = React.useState(false);
        const [GEPoster, setGEPoster] = React.useState('');

        const downGEPost = (name) => {
            let a = document.createElement('a');
            a.href = GEPoster;
            a.download = name + ".webp";
            a.target = '_blank'
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            alert('Downloading ' + name + '.webp')
        }

    //    const GEdown = (mem) => {
    //         fetch('https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@latest/bnk48thirdge/' + mem + '1.webp', {
    //             method :'get'
    //         })
    //             .then(response => {
    //                 if (response.status === 200 || response.status === 304) {
    //                     return response.text()
    //                 }
    //                 throw new Error('Something went wrong');
    //             })
    //             .then(data => {
    //                 setGEPoster('https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@latest/bnk48thirdge/' + mem + '1.webp')
    //             }).catch(() => {
    //                 setGEPoster('')
    //             });
    //     }

        const BirthdayCheck = (val) => {
            fetch(fet + '/cgm48/getmemberbybirth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
            .then(response => response.json())
            .then(data => {
                if (data.count > 0) {
                     const arr = (data.response)
                     const i = arr.findIndex(x => x.name == val)
                     if (i > -1) {
                        setBirthday(true)
                     }
                } else {
                    setBirthday(false)
                }
            });
        }

        const PlaySong = () => {
            if (pm.paused) { 
                pm.play()
                onPlay(true)
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new window.MediaMetadata({
                        title: 'Happy Birthday, ' + arr[0].name +'!',
                        artist: hbdparse[Math.floor(Math.random() * 4)],
                        artwork: [
                            { src: arr[0].img, sizes: '500x500' },
                        ],
                        album: 'CGM48 Fans Space platform'
                    });
                }
                var loop = setInterval(function () {
                    if (pm.paused) { 
                        clearInterval(loop)
                        onPlay(false)
                    }
                }, 100);
            }
        }

        const Subsc = (val) =>{
            if (localStorage.getItem("glog") == null)
            {
                Swal.fire({
                    title: "You need to login to set this member to your Kami-Oshi.",
                    icon: 'warning',
                    iconColor: 'rgb(203, 150, 194)',
                  })
            } else {
                if (arr[0].graduated == true) {
                    Swal.fire({
                        title: arr[0].name +" CGM48 is graduated",
                        icon: 'error',
                        text: 'This member is graduated. You cannot select this member to your Kami-Oshi anymore.',
                      })
                    return false
                }
                if (localStorage.getItem("glog") != null && kamio != ''  && kamio != '-') {
                    Swal.fire({
                        title: 'Confirm to Change your Kami-Oshi',
                        text: "You will change Kami-Oshi from \"" + capitalizeFirstLetter(kamio) + "\" to \"" + capitalizeFirstLetter(val) + "\". Are you sure?",
                        icon: 'question',
                        iconColor: 'rgb(203, 150, 194)',
                        showCancelButton: true
                      }).then((result) => {
                        if (result.isConfirmed) {
                            setLoaded(false)
                            fetch(fet + '/cgm48/uptkami?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString() + '&name=' + val, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                })
                                .then(response => response.text())
                                .then(data => {
                                   window.location.reload()
                                })
                                .catch((error) => {
                                    alert("System will be temporary error for a while. Please try again")
                                    setLoaded(true)
                                    setKami(1)
                                });
                        }
                      })
                } else if (kamio == '-') {
                    setLoaded(false)
                    fetch(fet + '/cgm48/uptkami?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString() + '&name=' + val, {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        })
                        .then(response => response.text())
                        .then(data => {
                            window.location.reload()
                        })
                        .catch((error) => {
                            alert("System will be temporary error for a while. Please try again")
                            setLoaded(true)
                            setKami(1)
                        });
                  } else {
                      setKami(0)
                    fetch(fet + '/cgm48/getFanMem?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString()  , {
                        method :'get'
                    })
                      .then(response => response.json())
                      .then(data => {
                        setKami(1)
                        if (data.obj != 'none') {
                            Swal.fire({
                                title: 'Confirm to Change your Kami-Oshi',
                                text: "You will change Kami-Oshi from \"" + capitalizeFirstLetter(kamio) + "\" to \"" + capitalizeFirstLetter(val) + "\". Are you sure?",
                                icon: 'question',
                                iconColor: 'rgb(203, 150, 194)',
                                showCancelButton: true
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    setLoaded(false)
                                    fetch(fet + '/bnk48/uptkami?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString() + '&name=' + val, {
                                        method: 'POST', // or 'PUT'
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        })
                                        .then(response => response.text())
                                        .then(data => {
                                           window.location.reload()
                                        })
                                        .catch((error) => {
                                            alert("System will be temporary error for a while. Please try again")
                                            setLoaded(true)
                                            setKami(1)
                                        });
                                }
                              })
                        } else {
                            setLoaded(false)
                            fetch(fet + '/cgm48/uptkami?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString() + '&name=' + val, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                })
                                .then(response => response.text())
                                .then(data => {
                                    window.location.reload()
                                    setLoaded(true)
                                })
                                .catch((error) => {
                                    alert("System will be temporary error for a while. Please try again")
                                    setLoaded(true)
                                    setKami(1)
                                });
                        }
                      }).catch(() => {
                        setKami(1)
                      })
                  }
            }
        }

        React.useEffect(() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            var url_string = window.location.href; 
            var url = new URL(url_string);
            var c = url.searchParams.get("name");
            if (c != null && c != "") {
                if (localStorage.getItem("glog") != null) {
                    fetch(fet + '/cgm48/getFanMem?i=' + (JSON.parse(localStorage.getItem("glog")).googleId).toString()  , {
                      method :'get'
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.obj != 'none' && (data.obj.response.name).toLowerCase() == c) {
                        setKami(2)
                      } else {
                        setKami(1)
                      }
                    });
                  } else {
                    setKami(1)
                  }
                setmem(c)
                fetch(fet + '/cgm48/getmember?name=' + c +'&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                    method :'post'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.response == 'Not found this member in record.') {
                        History.push("/")
                    } else {
                        const temp =[]
                        temp.push(data.response)
                        setArr(temp)
                        if (data.response.ge != "") {
                            fetch(fet + '/bnk48/getge?rankid=' + data.response.ge, {
                                method :'post'
                            })
                                .then(response => response.json())
                                .then(data => {
                                    setGE(data.response)
                                    setLoaded(true)
                                }).catch(() => {
                                  setGE([])
                                  setLoaded(true)
                                })
                        } else {
                            setLoaded(true)
                        }
                        BirthdayCheck(data.response.name)
                    }
                }).catch(() => {
                    setArr([])
                    setLoaded(true)
                })
         
            } else {
                History.push("/")
            }
            return (() => {
                pm.pause()
            })
        }, [])
        function numberWithCommas(x) {
            const options = { 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2 
            };
            return Number(x).toLocaleString('en', options);
        }
        function ordinal_suffix_of(i) {
            var j = i % 10,
                k = i % 100;
            if (j == 1 && k != 11) {
                return i + "st";
            }
            if (j == 2 && k != 12) {
                return i + "nd";
            }
            if (j == 3 && k != 13) {
                return i + "rd";
            }
            return i + "th";
        }
        const tokenrateexchange = 90;
        return (  
        <>
            <div className="pt-5 pb-2">
                <h3 className={window.innerWidth > 600 ? ' ml-5' : ' ml-3'}>{mem != '' ? 'About ' + capitalizeFirstLetter(mem) + ' CGM48' : 'Fetching Header'}</h3>
                <Breadcrumbs className={window.innerWidth > 600 ? ' ml-5' : ' ml-3'} aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => History.push("/memberlist")}>
                        Members
                    </Link>
                    <Typography color="textPrimary">{capitalizeFirstLetter(mem)}</Typography>
                </Breadcrumbs>
                <hr />
                {Loaded ? (
                    <>
                    {arr.length > 0 && arr.map((item, i) => (
                            <div>
                            <Fade in={play} timeout={{enter:300,exit:500}}>
                            <Fireworks options={fwoptions} style={fwstyle} />
                            </Fade>
                            <Card className={(window.innerWidth > 600 ? ' m-5' : ' m-3') + " bnktheme row"} key={i}>
                            <div className={window.innerWidth > 1600 ? 'col-lg-3 mb-1' : 'col-lg-4 mb-1'}>
                                <Fade in={true} timeout={600} style={{ transitionDelay: 300}}>
                                    <CardMedia
                                    src={item.img}
                                    component="img"
                                    />
                                </Fade>
                            </div>
                            <Fade in={true} timeout={1200} style={{ transitionDelay: 600}}>
                                <div className='col-md mt-5 mb-5'>
                                    <h4>{item.fullnameEn[0]} {item.fullnameEn[1]} [{item.name}]</h4>
                                        {item.ge != null && (
                                            <a className='cur' href="https://bnk48fan.cpxdev.tk/ge3">{geResult.rank == 1 ? 'The winner of BNK48 12th Single Senbutsu General Election by ' + numberWithCommas(geResult.score) + ' tokens!' : ordinal_suffix_of(geResult.rank) + ' of BNK48 12th Single Senbutsu General Election by ' + numberWithCommas(geResult.score) + ' tokens!'}<br/></a>
                                        )}
                                    <Button onClick={() => Subsc(mem)} className={(kami == 1 ? 'bg-primary' : 'text-dark') + ' mt-3'} variant="contained" disabled={kami == 1 ? false : true}>{kami == 0 && <img className='pb-1' src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="20px" />} {kami == 2 ? "She's your Kami-Oshi" : kami == 1 ? 'Set as Kami-Oshi' : 'Loading Status'}</Button> 
                                    <hr />
                                    <>
                                        <h6><LocationOnIcon fontSize="small"/> {item.province}</h6>
                                        {birthday ? (
                                            <h6><CakeIcon fontSize="small"/> Today is her birthday! ({new Date().getFullYear() - new Date(item.birthday).getFullYear() + ' years old'})</h6>
                                        ) : (
                                            <h6><CakeIcon fontSize="small"/> {moment(item.birthday).format('DD MMMM YYYY')}</h6>
                                        )}
                                        {!item.graduated && (
                                            <>
                                            <p><GroupIcon fontSize="small"/> {item.team != ''?item.team : 'TBA'}</p>
                                            <p><AccountCircleIcon fontSize="small"/> {ordinal_suffix_of(item.gen)} Generation</p>
                                            </>
                                        )}
                                        <p><FavoriteIcon fontSize="small"/>&nbsp;
                                            {
                                                item.favorite.length > 0 ? item.favorite.map((its, i) => i == item.favorite.length - 1 ? its : its + ', ') : 'None'
                                            }
                                        </p>
                                        <p><NaturePeopleIcon fontSize="small"/>&nbsp;
                                            {
                                                item.hobby.length > 0 ? item.hobby.map((its, i) => i == item.hobby.length - 1 ? its : its + ', ') : 'None'
                                            }
                                        </p>
                                        {item.graduated && (
                                            <p><PanToolIcon fontSize="small"/> Graduated</p>
                                        )}
                                        {!item.graduated && (
                                            <>
                                            Follow her:&nbsp;
                                            <a className='text-light' href={item.follow[0]} target='_blank'><FacebookIcon/></a>
                                            <a className='text-light' href={item.follow[1]} target='_blank'><InstagramIcon/></a>
                                            <a className='text-light' href={'https://app.bnk48.com/members/cgm48/' + item.name.toLowerCase()} target='_blank'><PhoneIphoneIcon/></a>
                                            </>
                                        )}
                                    </>
                                    <hr />
                                    <a className='text-dark' href={item.ref} target='_blank'>Reference from CGM48 official Site</a>
                                    <br />
                                    {birthday && (
                                        <Button onClick={()=> PlaySong()} className='mt-3' color="primary" variant="contained">Click here see effect</Button>  
                                    )}
                                </div>
                        </Fade>
                    </Card>
                    <Dialog fullScreen open={open} onClose={() => setOpen(false)} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
                            <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            BNK48 12th Single General Election Promote
                            </Typography>
                        </Toolbar>
                        </AppBar>
                        <div className='container mt-3 pb-3'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <Slide direction='right' in={open} timeout={600} style={open ? { transitionDelay: 400 } : {}}>
                                    <img src={GEPoster} width='100%' className='imgge' onDoubleClick={() => downGEPost(item.name)} />
                                </Slide>
                            </div>
                            <div className={'col-md' + (window.innerWidth < 600 ? ' mt-3' : '')}>
                                <Slide direction='left' in={open} timeout={600} style={open ? { transitionDelay: 400 } : {}}>
                                    {item.ge != '' ? (
                                    <CardMedia
                                        component='iframe'
                                        height={600}
                                        src={'https://www.youtube.com/embed/' + item.ge +'?mute=1' + (window.innerWidth <= 600 ? '' : '&autoplay=1')}
                                        allowFullScreen
                                    />
                                    ) : (
                                        <h5 className='mt-3'>GE Appeal Comment Video of "{item.name} CGM48" is coming soon</h5>
                                    )}
                                </Slide>
                            </div>
                        </div>
                        </div>
                    </Dialog>
                            </div>
                    ))}
                    </>
                ) : (
                    <Grow in={!Loaded} timeout={600}>
                            <div>
                            <Card className={(window.innerWidth > 600 ? ' m-5' : ' m-3') + " bnktheme row"}>
                            <div className={window.innerWidth > 1600 ? 'col-lg-3 mb-1' : 'col-lg-4 mb-1'}>
                                <Skeleton height={530} />
                            </div>
                                <div className='col-md mt-5 mb-5'>
                                    <Skeleton />
                                    <hr />
                                    <>
                                        <h6><LocationOnIcon fontSize="small"/> <Skeleton /></h6>
                                        <h6><CakeIcon fontSize="small"/> <Skeleton /></h6>
                                        <p><GroupIcon fontSize="small"/> <Skeleton /></p>
                                        <p><AccountCircleIcon fontSize="small"/> <Skeleton /></p>
                                        <p><FavoriteIcon fontSize="small"/>&nbsp;
                                            <Skeleton />
                                        </p>
                                        <p><NaturePeopleIcon fontSize="small"/>&nbsp;
                                            <Skeleton />
                                        </p>
                                        <>
                                            <Skeleton />
                                        </>
                                    </>
                                    <hr />
                                    <Skeleton />
                                </div>
                    </Card>
                            </div>
                    </Grow>
                )}
                
            </div>
        </>
         );
    }
     
    export default MemDetail;