import {connect, useDispatch, useSelector} from 'react-redux'
import {get_data, smoothing_data, sort_primitive_data} from "../redux/data/dataActions";
import {useEffect, useState} from "react";
import styles from "./styles.scss"

const App = props=> {
    const dispatch = useDispatch();
    const data= useSelector(state=>state.data.data)
    const data2= useSelector(state=>state.data.data2)
    const data3= useSelector(state=>state.data.data3)


    useEffect(() => {
        dispatch(get_data());
    }, [dispatch])
    function test(){
        dispatch(smoothing_data())
    }
    function test1(){
        dispatch(sort_primitive_data())
    }
  return (
      <div className={styles.Container}>
          <div className={styles.Input}>
              <button className={styles.Button}/>
          </div>
          <div className={styles.Output}>

          </div>
      </div>
  );
}

const mapStateToProps = state => {
    return {
        data: state.data.data
    }
}

export default connect(mapStateToProps)(App)


// <button onClick={()=>test()}>press F</button>
//           <button onClick={()=>test1()}>press F</button>
//           {data2?
//               data2.map((data, i)=>(
//                   <div key={i}>{typeof data[0]}</div>
//               ))
//               :<div>no data</div>}