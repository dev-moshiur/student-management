


import './singleStudent.scss'
import React,{useState,useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
export default function SingleStudent() {
    const {search} = useLocation();
    const [data, setData] = useState([])
    useEffect(() => {
      fetch(`https://student-management-api.vercel.app/present/?studentId=${search.split('=')[1]}`)
      .then(res=>res.json())
      .then(d=>{setData(d.reverse());console.log(d)})
      
    }, [])
    
  
  return (
    <div className='singleStudent'>
        <div className="header">
            Student presence info
        </div>
        {data.length &&
        <div className="intrt">
            <div className="row">
                <span>Name :</span>
                <span>{data[0].name}</span>
            </div>
            <div className="row">
                <span>Class :</span>
                <span>{data[0].className}</span>
            </div>
            <div className="row">
                <span>Group :</span>
                <span>{data[0].group && data[0].group}</span>
            </div>
        </div> }
        <div className="container">
        {data.map((elm,index)=>
        <div className='item'>

          <div className="intro">
            <span>{new Date(elm.createdAt).toDateString()}.</span>
            
          </div>
          <div className="check" >

            {elm.isPresent && <CheckIcon/>}

          

          </div>

        </div>)}

      </div>  

    </div>
  )
}
