import {useDispatch, useSelector} from 'react-redux'
import {get_data_and_sort} from "../redux/data/dataActions";
import {useState} from "react";
import styles from "./styles.module.scss"
import Selected from "./Selected";

const App = props=> {
    const dispatch = useDispatch();
    const data_ready= useSelector(state=>state.data.data_ready)
    const error= useSelector(state=>state.data.error)
    const success= useSelector(state=>state.data.success)
    const [url, setUrl] = useState("")
    const [cases, setCases] = useState([])
    const [selected, setselected] = useState("")

    // useEffect(() => {
    //     dispatch(get_data());
    // }, [dispatch])
    const download = () =>{
        url === "" ? dispatch(get_data_and_sort()):dispatch(get_data_and_sort(url));
    }

    const select = (e, index) =>{
        if(e.target.value !=="DEFAULT" && index===0){
            setCases((prevCases)=> {
                const cas =[...prevCases]
                cas[0] = data_ready[e.target.value]
                return cas
            })
        }else{
            setselected(selected=>selected=e.target.value)
        }
    }


  return (
      <div className={styles.Container}>
          <div className={styles.Input}>
              <input placeholder={"необязательно"} className={styles.InputUrl} type={"text"} onChange={e => setUrl(e.target.value)}/>
              <button onClick={()=>download()} className={styles.Button}>Загрузить</button>
              <div className={styles.Error}>
                  {error? <p>error</p>:""}
                  {success? <p>Загружено</p>:""}
              </div>
          </div>
          <div className={styles.Output}>
              <div className={styles.Selects}>
                  {data_ready?
                      <select className={styles.Select} onChange={(e)=>select(e, 0)}>
                          <option  value="DEFAULT" defaultValue>
                              выберте тип
                          </option>
                          {data_ready.map((data, i)=>(
                              <option key={i} value={i} >{typeof data[0]}</option>
                          ))}
                      </select>:""
                  }
                  {cases[0]?
                      <select className={styles.Select} onChange={(e)=>select(e, 2)}>
                          <option  value="DEFAULT" defaultValue>
                              выберте тип
                          </option>
                          {cases[0].map((data, i)=> (
                              <option key={i} value={data} >{`${data}`}</option>
                          ))}
                      </select>
                      :""
                  }
              </div>
              <Selected selected={selected}/>
          </div>
      </div>
  );
}

// const mapStateToProps = state => {
//     return {
//         data: state.data.data,
//         error: state.data.error
//     }
// }




// export default connect(mapStateToProps)(App)
export default App


// <button onClick={()=>test()}>press F</button>
//           <button onClick={()=>test1()}>press F</button>
//           {data2?
//               data2.map((data, i)=>(
//                   <div key={i}>{typeof data[0]}</div>
//               ))
//               :<div>no data</div>}