import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import vPack from './pack.json'

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
        const txt = val.toLowerCase()
        setSearch(txt)
        if (txt == '') {
            setmem(Arr)
        } else {
            const data = Arr.filter(x => (x.name.toLowerCase()).includes(txt));
            setmem(data)
        }
    }

    const handleChangeGroup = (event) => {
        setFr('-')
        setGr(event.target.value);
        if (event.target.value == 'team') {
            setFilter(vPack.team)
        } else if (event.target.value == 'gen') {
            setFilter(vPack.gen)
        } else {
            setFilter([])
        }
      };

      const onSearch = () => {
          if (seGroup != '-' && seFill != "-") {
          setLoaded(false)
            fetch(fet + '/cgm48/getmemberby?filter=' + seGroup + '&param=' + seFill + '&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                method :'post'
            })
      .then(response => response.json())
      .then(async data => {
        await setArr(data.response)
          if (search !== '') {
            const txt = search.toLowerCase()
            setSearch(txt)
            const d = data.response.filter(x => (x.name.toLowerCase()).includes(txt));
            setmem(d)
          } else {
            setmem(data.response)
            setArr(data.response)
          }
          setLoaded(true)
      });
          }
      }
    
      const onReset = () => {
        if (seGroup != '-' || seFill != "-" || search != '') {
        setLoaded(false)
        fetch(fet + '/bnk48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
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
            setFilter([])
            setGr('-')
            setFr('-')
            setSearch('')
        }
    }

    return ( 
        <>
        <div className="stage text-center pt-5 pb-2">
            <h3>Members</h3>
            <br />
            <Card className="text-left ml-5 mr-5">
            <TextField label="Search Member" value={search} fullWidth={true} className="m-3 col-md-10" onChange={(e) => SearchEng(e.target.value)} />
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
             )}
             <ButtonGroup>
             {seGroup != '-' && seFill != '-' && (
                 <Button className='ml-5 mt-4 mb-3' color="primary" onClick={() => onSearch()} variant="contained">Search</Button>
             )}
              <Button className={(seGroup != '-' && seFill != '-' ? 'ml-3' : 'ml-5') + ' mt-4 mb-3 mr-2'} color="secondary" onClick={() => onReset()} variant="contained">Reset</Button>
             </ButtonGroup> */}
             </Card>
            {Loaded ? (
                <div className='row ml-3 mr-3 mt-5 justify-content-center'>
                {mem.length > 0 ? mem.map((item, i) => (
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
                                </CardContent>
                                </CardActionArea>
                                </Card> 
                            </div>
                    </Zoom>
                   
                )) : (
                    <div className='text-center col-md-12'>
                        <h6>No BNK48 members to show. Please try different keyword</h6>
                    </div>
                )}
                </div>
            ) : (
                <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                </Zoom>
            )}
        </div>
        </>
     );
}
 
export default Memberlist;