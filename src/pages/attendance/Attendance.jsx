
import React ,{useState,useEffect}from 'react'
import '../present/present.scss'
import Create from '../../components/create/Creates'
import PopUpLoading from '../../components/popUpLoading/Loading'
import PopupMessage from '../../components/popupMessage/Popup'
import Delete from '../../components/delete/Deletes'
import Update from '../../components/update/Updatee'
import CheckIcon from '@mui/icons-material/Check';


export default function Present() {
  const [className, setClassName] = useState()
    const [group, setGroup] = useState()
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState('')
    const [searched, setSearched] = useState([])
    const [date, setDate] = useState()
    const [showDeletePopup, setShowDeletePopup] = useState(false)

    const handleSearch =(e)=>{
      if (e) {
        e.preventDefault()
      }
       
        setLoading(true)
      
        let fetchquery = `className=${className}`
        if (group) {
            fetchquery+=`&group=${group}`
        }
        fetchquery+=`&date=${new Date(date).toDateString()}`

        fetch(`https://student-management-api.vercel.app/present/?${fetchquery}`)
        .then(res=>res.json())
        .then(data=>{
          setSearched(data.reverse());
          setLoading(false)})

    }

    const handleDelete = ()=>{
        setLoading(true)

        fetch(`https://student-management-api.vercel.app/present`, {
            headers:{Authorization : localStorage.getItem('tttt'),"Content-Type": "application/json" },
            method: "delete",
            body:JSON.stringify(searched.map(elm=>elm._id))
        
          
          }).then((res) => {

            setLoading(false);
            setShowDeletePopup(false)
            
            if (res.status == 200) {
                handleSearch()
              setShowMessage("attendance successfully been deleted");
            //   res.json().then((da) => setAllNotices((pre) => [da, ...pre]));
            } else {
              console.log(res)
              setShowMessage("Something went wrong");
   
            }
          });

      }

  return (
    <>

   
    <div className='present'>
      <div className="header">
      Attendance
      </div>
      <form action="" className='searchContainer' onSubmit={handleSearch}>
      <input onChange={e=>setClassName(e.target.value)} required type="number" placeholder='class'/>
      <input onChange={e=>setGroup(e.target.value)} type="text" placeholder='group'/>
      <input required onChange={e=>setDate(e.target.value)} type="date" placeholder='group'/>
      {/* {searched.length && <div> Delete All</div>} */}
        {/* <input type="text" name="date" placeholder='Date [dd-mm-yyyy]' id="" /> */}
        <input type="submit" value="search" className='btn' />
        {searched.length? <div className='delete' onClick={()=>setShowDeletePopup(true)}> Delete</div> : ''}
      </form>
    
      <div className="container">
        {searched.map((elm,index)=>
        <div className='item'>

          <div className="intro">
            <span>{elm.roll && elm.roll}.</span>
            <span>{elm.name && elm.name}</span>
          </div>
          <div className="check" >

            {elm.isPresent && <CheckIcon/>}

          

          </div>

        </div>)}

      </div>  
     
      

    </div>
    {showDeletePopup && <Delete deleteFunction={handleDelete} message={'delete all searched attendance ?'} setShowDeletePopup={setShowDeletePopup}/>}
    {loading && <PopUpLoading/>}
    {showMessage &&
    <PopupMessage showMessage={showMessage} setShowMessage={setShowMessage}/> }
    </>
  )
}
