import React from 'react';
import { Typography, ListItem, Zoom, IconButton,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from "aos";

const News = ({fet}) => {

    const [Loaded, setLoaded] = React.useState(false);
    const [news, setNews] = React.useState([]);
    React.useEffect(() => {
      AOS.init({ duration: 1000 });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/cgm48/getnews', {
            method :'get'
        })
        .then(response => response.json())
        .then(data => {
          if (data.rss.channel.item != undefined) {
            setNews(data.rss.channel.item)
            setLoaded(true)
        }
        }).catch(() => {
            setNews([])
            setLoaded(true)
        })
    }, [])

    return ( 
        <>
        {window.innerWidth >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://i.scdn.co/image/ab676186000010165165395340dcd9ba036be6ed" width={window.innerWidth} />
              </Fade>
      </div>
        )}
             {window.innerWidth >1200 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
              <Typography variant="h5" component="h2">
                CGM48 News
                </Typography>
                <hr />
                <Typography color="textSecondary">
                Fresh news about CGM48 right here!
                </Typography>
        <Typography color="textSecondary">
        Every update about CGM48 from many reliabled news agency. These news are provided by Google News.
        </Typography>
              </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className="bnktheme ml-2 mr-2">
      <CardContent>
        <Typography variant="h5" component="h2">
          CGM48 News
        </Typography>
        <hr />
        <Typography color="textSecondary">
          Fresh news about CGM48 right here!
        </Typography>
        <Typography color="textSecondary">
          These news are provided by Google News.
        </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  <div className="stage pb-2">
      {Loaded ? (
           <div className={window.innerWidth > 600 ? 'row pt-5 m-5' : 'row pt-4 m-2'}>
               {news.length > 0 ? news.map((item, i) => i < 30 && (
                   <div className='col-md-12 mb-5' data-aos="zoom-in-down">
                   <Card>
                   <CardHeader
                     action={
                       <IconButton href={item.link} target="_blank">
                         <MoreVertIcon />
                       </IconButton>
                     }
                     title={item.title}
                     subheader={item.source["#text"] + " | " + new Date(item.pubDate).toLocaleString()}
                   />
                 </Card>
                 </div>
               )) : (
                    <Card className='text-center m-5'>
                        <h6>No news in today</h6>
                    </Card>
               )}
           </div>
      ) : (
        <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
            <div className='text-center'>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center mt-3 mb-5' />
            </div>
        </Zoom>
      )}
  </div>
        </>
    );
}
 
export default News;