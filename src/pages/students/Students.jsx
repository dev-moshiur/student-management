

import './students.scss'
import {useState,useEffect} from 'react'
// import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import Create from '../../components/create/Creates'
import PopUpLoading from '../../components/popUpLoading/Loading'
import PopupMessage from '../../components/popupMessage/Popup'
import Delete from '../../components/delete/Deletes'
import Update from '../../components/update/Updatee'
import {Link} from 'react-router-dom'

export default function Students({searched, setSearched,group, setGroup,className, setClassName}) {
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState('')
    const [showCreateForm, setShowCreateForm] = useState(false)

    const [datalists, setDatalists] = useState({})
 
  
    const [roll, setRoll] = useState()
    const [phone, setphone] = useState()
    
    const [deleteid, setDeleteid] = useState()
    const [updateId, setUpdateId] = useState()
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)  
    const [updateFields, setUpdateFields] = useState([])

    useEffect(() => {
      fetch('https://student-management-api.vercel.app/getDatalists')
      .then(res=>res.json())
      .then(data=>setDatalists(data))
    }, [])
    


    const activeUpdate=(id)=>{
      
      const item = searched[id]
      setUpdateId(item)
     const inputs = [
        {
          field: "input",
          type: "text",
          name: "name",
          label:'Student name',
          defaultValue:item.name
        },
        
        {
          field: "input",
          type: "text",
          name: "className",
          label:'Class',
          defaultValue:item.className
        },
        {
          field: "input",
          type: "text",
          name: "group",
          label:'Group',
          defaultValue:item.group
        },
        {
          field: "input",
          type: "text",
          name: "roll",
          label:'Roll',
          defaultValue:item.roll
        },
        {
            field: "input",
            type: "text",
            name: "phone",
            label:'Phone number',
            defaultValue:item.phone
          },
        {
          field: "textarea",
          type: "text",
          name: "address",
          label:'Address',
          defaultValue:item.address
        },
       
      ];
      setUpdateFields(inputs)
      setShowUpdateForm(true)
    }

    const activeDelete = (id)=>{
      const item = searched[id]
      setDeleteid(item)
      setShowDeletePopup(true)

    }
    const handleSearch =(e)=>{
      if (e) {
        e.preventDefault()
      }
       
        setLoading(true)
        // ?className=${className.current.value}&
        let fetchquery = `className=${className}&`
        if (group) {
            fetchquery+=`group=${group}&`
            
        }
        if (roll) {
            fetchquery+=`roll=${roll}&`
            
        }
        if (phone) {
            fetchquery+=`phone=${phone}`
            
        }
        console.log(fetchquery)
        

        fetch(`https://student-management-api.vercel.app/student/?${fetchquery}`)
        .then(res=>res.json())
        .then(data=>{setSearched(data.reverse());setLoading(false)})

    }
    
    const inputFieldsForCreate = [
        {
          field: "input",
          type: "text",
          name: "name",
          label:'Student name',
        },
        
        {
          field: "input",
          type: "text",
          name: "className",
          label:'Class',
        },
        {
          field: "input",
          type: "text",
          name: "group",
          label:'Group',
        },
        {
          field: "input",
          type: "text",
          name: "roll",
          label:'Roll',
        },
        {
            field: "input",
            type: "text",
            name: "phone",
            label:'Phone number',
          },
        {
          field: "textarea",
          type: "text",
          name: "address",
          label:'Address',
        },
       
      ];
      const handleCreate =(e)=>{
        e.preventDefault()
        setLoading(true)

        const body = {
            name: e.target.name.value,
            className: e.target.className.value,
            group: e.target.group.value,
            roll: e.target.roll.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
           
            
          };
          fetch("https://student-management-api.vercel.app/student", {
            headers:{Authorization : localStorage.getItem('tttt'),"Content-Type": "application/json" },
            method: "post",
        
            body: JSON.stringify(body),
          }).then((res) => {
            setShowCreateForm(false);
            setLoading(false);
            if (res.status == 200) {
              setShowMessage("Student successfully been added");
              handleSearch()
            //   res.json().then((da) => setAllNotices((pre) => [da, ...pre]));
            } else {
              console.log(res)
              setShowMessage("Something went wrong");

            }
          });



      }

      const handleUpdate = (e)=> {
        e.preventDefault()
        setLoading(true)

        const body = {
            name: e.target.name.value,
            className: e.target.className.value,
            group: e.target.group.value,
            roll: e.target.roll.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
           
            
          };
          fetch(`https://student-management-api.vercel.app/student/${updateId._id}`, {
            headers:{Authorization : localStorage.getItem('tttt'),"Content-Type": "application/json" },
            method: "put",
        
            body: JSON.stringify(body),
          }).then((res) => {
            setShowDeletePopup(false);
            setLoading(false);
            setShowUpdateForm(false)
            if (res.status == 200) {
              setShowMessage("Student information successfully been updated");
              handleSearch()
            //   res.json().then((da) => setAllNotices((pre) => [da, ...pre]));
            } else {
              console.log(res)
              setShowMessage("Something went wrong");
              
              
            }
          });


      }

      const handleDelete = ()=>{
        setLoading(true)

        fetch(`https://student-management-api.vercel.app/student/${deleteid._id}`, {
            headers:{Authorization : localStorage.getItem('tttt'),"Content-Type": "application/json" },
            method: "delete",
        
          
          }).then((res) => {
            setShowUpdateForm(false);
            setLoading(false);
            if (res.status == 200) {
              setShowMessage("Student successfully been deleted");
            //   res.json().then((da) => setAllNotices((pre) => [da, ...pre]));
            } else {
              console.log(res)
              setShowMessage("Something went wrong");
              handleSearch()
            }
          });

      }
  return (
    <>
    <div className='students'>
        <div className="header">
            Students

        </div>
        <div className="example">
        For testing search with <strong>class : 10</strong>  and <strong>group : science</strong>
      </div>
        <form className='searchContainer' onSubmit={handleSearch}>
            <input defaultValue={className? className : ''} onChange={e=>setClassName(e.target.value)} required type="number" placeholder='class'/>
            <input list='group' defaultValue={group} onChange={e=>setGroup(e.target.value)} type="text" placeholder='group'/>
              <datalist id='group'>
                {datalists.groups?.map(elm=><option value={elm}>{elm}</option>)}

              </datalist>
            <input onChange={e=>setRoll(e.target.value)} type="text" placeholder='roll'/>
            <input onChange={e=>setphone(e.target.value)} type="text" placeholder='phone'/>
            <input type="submit" className='btn' value={'Search'}/>
            
        </form>
        <div className="container">
            {/* <div className="tableHeader">
                <div>Name and phone number</div>
                <div>Address</div>
                
                <div></div>
                
                <div></div>
                <div></div>
            </div> */}
            <div className="stus">
                {searched.map((elm,index)=>
                <div className="row">
                    <div className='top'>
                    <div><span className='dn'>Name</span> <span className='dn'>:</span> <span>{elm.name}</span></div>
                    <div><span className='dn'>Mobile</span> <span className='dn'>:</span> <span>{elm.phone}</span></div>
                    <div><span className='dn'>Address</span> <span className='dn'>:</span> <span>{elm.address}</span></div>
                    
                    </div>
                    <div className="actions">

                        <div className=''><EmailIcon/></div>
                        <div className='btntwo'>
                          <Link to={`/single-student/?student=${elm._id}`}>View</Link>
                          
                          </div>
                        <div className='btn' onClick={()=>activeUpdate(index)}>Update</div>
                        <div className='red' onClick={()=>activeDelete(index)}><DeleteIcon/></div>

                    </div>
                
                
                

                </div>)}
            </div>
        </div>
        <div className="btn" onClick={()=>setShowCreateForm(true)}>
            add a student
        </div>
    </div>
    {showDeletePopup && 
    <Delete deleteFunction={handleDelete} setShowDeletePopup={setShowDeletePopup} message={`delete ${ deleteid ? deleteid.name : ''} ?`}/>}
    {showUpdateForm && 
    <Update handleSubmit={handleUpdate} inputs={updateFields} header='update student' setShowUpdateForm={setShowUpdateForm}/>}
    {showMessage && 
    <PopupMessage showMessage={showMessage} setShowMessage={setShowMessage}/>}
    {loading && 
    <PopUpLoading/>}
    {showCreateForm &&
    <Create handleSubmit={handleCreate} header={'add a student'}  inputs={inputFieldsForCreate} setShowCreateForm={setShowCreateForm}/> }
    </>
  )
}
