import {useDispatch, useSelector} from 'react-redux'
import {get_data_and_sort, default_state, set_selected, set_cases, prev_state, next_state} from "../redux/data/dataActions";
import {useState} from "react";
import styles from "./styles.module.scss"
import Selected from "./Selected";

const App = props=> {
    const dispatch = useDispatch();
    const data_ready= useSelector(state=>state.data.data_ready)
    const error= useSelector(state=>state.data.error)
    const success= useSelector(state=>state.data.success)
    const cases= useSelector(state=>state.data.cases)
    const selected= useSelector(state=>state.data.selected)
    const [url, setUrl] = useState("")
    const idSelect = useSelector(state=>state.data.idSelect)
    const idCases = useSelector(state=>state.data.idCases)
    // const [cases, setCases] = useState([])
    // const [selected, setSelected] = useState("")

    // useEffect(() => {
    //     dispatch(get_data());
    // }, [dispatch])
    const download = () =>{
        DefaultState()
        url === "" ? dispatch(get_data_and_sort()):dispatch(get_data_and_sort(url));
    }

    const select = (e, index) =>{
        console.log(e.target.value)
        if(e.target.value !=="DEFAULT" && index===0){
            dispatch(set_cases(data_ready[e.target.value], e.target.value))
        }else{
            dispatch(set_selected(e.target.value,e.target.value))
        }
    }

    const DefaultState = ()=>{
        setUrl("")
        dispatch(default_state())
    }
    const prevState = ()=>{
        dispatch(prev_state())
    }
    const nextState = ()=>{
        dispatch(next_state())
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
              <div className={styles.Editing}>
                  <button onClick={()=>DefaultState()} className={styles.DefaultState}>Сброс</button>
                  <button onClick={()=>prevState()} className={styles.prevState}>Назад</button>
                  <button onClick={()=>nextState()} className={styles.nextState}>Вперед</button>
              </div>
          </div>
          <div className={styles.Output}>
              <div className={styles.Selects}>
                  {data_ready?
                      <select value={idCases} className={styles.Select} onChange={(e)=>select(e, 0)}>
                          <option  value="DEFAULT" defaultValue>
                              выберте тип
                          </option>
                          {data_ready.map((data, i)=>(
                              <option key={i} value={i} >{typeof data[0]}</option>
                          ))}
                      </select>:""
                  }
                  {cases?
                      <select value={idSelect} className={styles.Select} onChange={(e)=>select(e, 2)}>
                          <option  value="DEFAULT" defaultValue>
                              выберте тип
                          </option>
                          {cases.map((data, i)=> (
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