import {useDispatch, useSelector} from 'react-redux'
import {get_data_and_sort, default_state, set_selected, prev_state, next_state} from "../redux/data/dataActions";
import styles from "./styles.module.scss"
import Selected from "./Selected";

const App = props=> {
    const dispatch = useDispatch();
    const state= useSelector(state=>state.data.state)
    const head= useSelector(state=>state.data.head)
    const error= useSelector(state=>state.data.error)
    const success= useSelector(state=>state.data.success)

    const download = () =>{
        DefaultState()
        dispatch(get_data_and_sort())
    }

    const select = (e, index) =>{
        dispatch(set_selected(e.target.value))
    }

    const DefaultState = ()=>{
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
                  {state[head].data_ready?
                      state[head].data_ready.map((data, i)=>(
                      <select key={i} value={"DEFAULT"} className={styles.Select} onChange={(e)=>select(e, 2)}>
                          <option  value="DEFAULT" defaultValue>
                              {typeof data[0]}
                          </option>
                          {data.map((data, i)=> (
                              <option key={i} value={data} >{`${data}`}</option>
                          ))}
                      </select>
                          ))
                      :""
                  }
              </div>
              <Selected selected={state[head].selected}/>
          </div>
      </div>
  );
}


export default App

