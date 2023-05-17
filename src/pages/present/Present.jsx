
import React ,{useState,useEffect}from 'react'
import './present.scss'
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
    const [chekPreent, setChekPreent] = useState(false)

    


    const handlePost = ()=>{
      setLoading(true)
      // present
      fetch("https://student-management-api.vercel.app/present", {
            headers:{Authorization : localStorage.getItem('tttt'),"Content-Type": "application/json" },
            method: "post",
        
            body: JSON.stringify(searched),
          }).then((res) => {
           
            setLoading(false);
            if (res.status == 200) {
              setSearched([])
              setShowMessage("Attendance successfully been added");
           
            //   res.json().then((da) => setAllNotices((pre) => [da, ...pre]));
            } else {
         
              setShowMessage("Something went wrong");

            }
          });
    }
    useEffect(() => {
      setSearched(searched)
    }, [searched])



    const handleSearch =(e)=>{
      if (e) {
        e.preventDefault()
      }
       
        setLoading(true)
        // ?className=${className.current.value}&
        let fetchquery = `className=${className}`
        if (group) {
            fetchquery+=`&group=${group}`
            
        }
        const fetchNew = fetchquery
        fetchquery+=`&date=${new Date().toDateString()}`


        // check
        fetch(`https://student-management-api.vercel.app/present/check/?${fetchquery}`)
        .then(res=>res.json())
        .then(data=>{
          setChekPreent(data.isPresented)
          console.log(data.isPresented)
          
          setLoading(false)})
        
        

        fetch(`https://student-management-api.vercel.app/student/?${fetchNew}`)
        .then(res=>res.json())
        .then(data=>{
          const temp = []
          data.forEach(elm=>{
            const item = {
              studentId:elm._id,
              isPresent:true,
              name:elm.name,
              date:new Date().toDateString(),
              roll:elm.roll,
              className:elm.className,
              group:elm.group
              
            }
            temp.push(item)
            
          })
          setSearched(temp.reverse());
          console.log(temp)
          
          
          setLoading(false)})

    }

  return (
    <>

   
    <div className='present'>
      <div className="header">
        Name Present
      </div>
      <form action="" className='searchContainer' onSubmit={handleSearch}>
      <input onChange={e=>setClassName(e.target.value)} required type="text" placeholder='class name'/>
      <input onChange={e=>setGroup(e.target.value)} type="text" placeholder='group'/>
        {/* <input type="text" name="date" placeholder='Date [dd-mm-yyyy]' id="" /> */}
        <input type="submit" value="search" className='btn' />
      </form>
      {!chekPreent  &&
      <div className="container">
        {searched.map((elm,index)=>
        <div className='item'>

          <div className="intro">
            <span>{elm.roll && elm.roll}.</span>
            <span>{elm.name && elm.name}</span>
          </div>
          <div className="check" onClick={()=>{
            
            // console.log(temp)
            setSearched((pre)=>{
              const temp = [...pre]
            temp[index].isPresent = !temp[index].isPresent;
            return temp

            })
          }}>

            {elm.isPresent && <CheckIcon/>}

          

          </div>

        </div>)}

      </div>  }
      {chekPreent &&  <div className='already'>Already Presented today</div>}
      <div className="btn" aria-disabled onClick={handlePost}>Submit</div>

    </div>
    {loading && <PopUpLoading/>}
    {showMessage &&
    <PopupMessage showMessage={showMessage} setShowMessage={setShowMessage}/> }
    </>
  )
}
