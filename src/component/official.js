import React from 'react';
import { Card, CardHeader, DialogActions, DialogTitle, DialogContent, Zoom, CardActions, IconButton, Dialog, Button, Grow, Typography, CardContent } from '@material-ui/core';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AOS from "aos";

const Offi = ({fet}) => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [para, setpara] = React.useState({});
    const [fetLLoad, setFet] = React.useState(false);

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(encodeURI(fet + '/cgm48/getoffnews?tstamp=' + Math.floor( new Date().getTime()  / 1000)), {
            method: 'post', // or 'PUT'
            })
            .then(response => response.json())
            .then(data => {
                setLoaded(true)
                setArr(data.data)
            })
            .catch((error) => {
                setLoaded(true)
            console.error('Error:', error);
            });
    }, [])

    function removeurl(text) {
        const uri = text.match(/https?:\/\/\S+/gi)
        const re = text.replace(uri, '')
        return re
      }
        const hand = (order, val) => {
            setOpen(order)
            if (order == true) {
                setpara(val)
                setFet(true)
            } else {
                setFet(false)
                setpara('')
            }
        }


    return ( 
        <>
        <h3 className='text-center mt-5'>Official Update</h3>
        <p className='text-center'>News or announcement update from CGM48 Official. Powered by Twitter</p>
        {Loaded ? (
             <div className={"stage justify-content-center pt-5" + (window.innerWidth > 600 ? ' pl-5 pr-5' : ' pl-3 pr-3')}>
             <br />
             <div className='row'>
             {Arr.length > 0 ? Arr.map((item,i) => (
                 <div className={"col-md-12 mb-5" + (window.innerWidth > 600 ? ' pl-5 pr-5' : '')} data-aos="zoom-in-down">
                 <Card onClick={() => hand(true,{ id: item.id, name: 'More tweet about "' + item.text.substring(0, 60) + '..."' })}>
                <CardContent>
                    <Typography variant="h6" dangerouslySetInnerHTML={window.innerWidth < 700 ? { __html: removeurl(item.text.replace(new RegExp('\n', 'g'), '<br />')) } : { __html: removeurl(item.text) }}>
                    </Typography>
               
                    <hr />
                    <Typography color="textSecondary">
                    {new Date(item.created_at).toLocaleString()}
                    </Typography>
                    </CardContent>
                <CardActions disableSpacing>
                <FavoriteIcon /> {item.public_metrics.like_count} Liked
                </CardActions>
                 </Card>
                 </div>
             )) : (
                 <div className='text-center col-md-12'>
                     No update from Official
                 </div>
             )}
             </div>
             <Dialog
                    open={open}
                    onClose={() => hand(false)}
                    fullWidth={true}
                    maxWidth='md'
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{para.name}</DialogTitle>
                    <DialogContent>
                    <Grow in={!fetLLoad} timeout={300}>
                        <div className='d-flex justify-content-center'>
                    <TwitterTweetEmbed
                        tweetId={para.id}
                        onLoad={() => setFet(false)}
                        />
                        </div>
                        </Grow>
                        {fetLLoad && (
                             <Zoom in={fetLLoad} timeout={{ enter: 200, exit: 200}}>
                        <div className='text-center'>
                             <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                             </div>
                             </Zoom>
                        )}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => hand(false)} className="text-dark">
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
             </div>
        ) : (
            <div className='text-center'>
            <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
            <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center mt-3 mb-5' />
            </Zoom>
            </div>
        )}
        </>
    );
}
 
export default Offi;