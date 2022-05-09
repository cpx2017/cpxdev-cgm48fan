import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import vPack from './pack.json'
import moment from 'moment'
import AOS from "aos";

const Memberlist = ({fet}) => {

    const History = useHistory()

    const [seGroup, setGr] = React.useState('-');
    const [seFill, setFr] = React.useState('-');
    const [search, setSearch] = React.useState('');
    const [Loaded, setLoaded] = React.useState(false);
    const [Filter, setFilter] = React.useState([]);


    const [Arr, setArr] = React.useState([]);
    const [mem, setmem] = React.useState([]);
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/cgm48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'get'
        })
  .then(response => response.json())
  .then(data => {
    setmem(data.response)
    setArr(data.response)
    setLoaded(true)
  }).catch(() => {
    setmem([])
    setArr([])
    setLoaded(true)
  })
 
    }, [])


    const ChangeRoute = (name) =>{
        History.push("/member?name=" + name.toLowerCase())
    }

    const SearchEng = (val) => {
        if (val !== '') {
            const txt = val.toLowerCase()
            setSearch(txt)
            const d = Arr.filter(x => (x.name.toLowerCase()).includes(txt));
            setmem(d)
          } else {
            setSearch('')
            setmem(Arr)
          }
    }

    
      const onReset = () => {
        setSearch('')
        setmem(Arr)
    }

    return ( 
        <>
        <h3 className='text-center mt-4'>Members</h3>
        <br />
        <div className="stage text-center pt-5 pb-2">
            <Card className={"text-left " + (window.innerWidth > 700 ? 'ml-5 mr-5' : 'ml-2 mr-2')}>
            <TextField label="Search Member" value={search} className="m-3" onChange={(e) => SearchEng(e.target.value)} />
            {/* <TextField
                select
                label="Choose Group"
                value={seGroup || '-'}
                className="m-3"
                onChange={(e) => handleChangeGroup(e)}
                >
                    {vPack.drop.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
             </TextField> */}
             {/* {Filter.length > 0 && seGroup != '-' && (
                 <TextField
                 select
                 label="Choose Filter type"
                 value={seFill || '-'}
                 className="m-3"
                 onChange={(e) => setFr(e.target.value)}
                 >
                     {Filter.map((option) => (
                         <MenuItem key={option.value} value={option.value}>
                         {option.label}
                         </MenuItem>
                     ))}
              </TextField>
             )} */}
             <ButtonGroup>
                <Button className={'ml-5 mt-4 mb-3 mr-2'} color="secondary" onClick={() => onReset()} variant="contained">Reset</Button>
             </ButtonGroup>
             </Card>
             <Zoom in={mem.length > 0 ? Loaded : false}>
             <Card className='mt-2 ml-5 mr-5'>
                     <CardContent>
                         Found {mem.length} matched BNK48 members
                     </CardContent>
                 </Card>
             </Zoom>
            
            {Loaded ? (
                <div className='row ml-3 mr-3 mt-5 justify-content-center'>
                {mem.length > 0 ? mem.map((item, i) => (
                      <div data-aos="zoom-in" className='col-md-3 mb-5' onClick={() => ChangeRoute(item.name)}>
                        <Card>
                            <CardActionArea>
                            <CardMedia
                                    src={item.img}
                                    component="img"
                                    className={item.graduated == true ? 'grayimg' : ''}
                                    />
                                <CardContent>
                                    <h5>{item.name}</h5>
                                </CardContent>
                                </CardActionArea>
                                </Card> 
                            </div>
                   
                )) : (
                    <div className='text-center col-md-12'>
                        <h6>No BNK48 members to show. Please try different keyword</h6>
                    </div>
                )}
                </div>
            ) : (
                <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                </Zoom>
            )}
        </div>
        </>
     );
}
 
export default Memberlist;