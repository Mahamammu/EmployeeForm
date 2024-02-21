import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from'react-router-dom';
import './Style.css';


function Home() {
   
    const [Ename, setEname] = useState('')
    const [Eid, setEid] = useState('')
    const [Edept, setEdept] = useState('')
    const [Edob, setEdob] = useState('')
    const [Egender, setEgender] = useState('')
    const [Edesign, setEdesign] = useState('')
    const [Esalary, setEsalary] = useState('')
    const navigate=useNavigate();

    const [data,setData]=useState([]);




    const handleSubmit = (event) =>{
        console.log(Ename,Eid,Edept,Edob,Egender,Edesign,Esalary);
        event.preventDefault();
        axios.post('https://employeeform-3.onrender.com/',{Ename,Eid,Edept,Edob,Egender,Edesign,Esalary})
        .then(res =>{
            navigate('/');
        }).catch(err => console.log(err));
    
    }

    
    useEffect(()=>{
        axios.get('https://employeeform-3.onrender.com/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));

})
    const handleDelete=(Eid)=>{
        axios.delete('https://employeeform-3.onrender.com/'+Eid)
        .then(res => {navigate('/')})
        .catch(err => console.log(err));
    }
  return (
    <div>
        <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Enter Employee Details</h1>
                        <div className='inputs'>
                            <div className='name'>EName:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Name:' onChange={e => setEname(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>EId:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Id:' onChange={e => setEid(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>EDepartment:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Department:' onChange={e => setEdept(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>EmpDOB:</div>
                            <div classname='inputs'>
                                <input type='date' onChange={e => setEdob(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="inputs">
                            <div className="name">Employee_Gender</div>
                                    <input id="male" type="radio" name="Gender" value="Male" checked={Egender === "Male"} onClick={(e) => setEgender(e.target.value)} />
                                    <label id="Male">Male</label>

                            
                            
                                    <input id="female" name="Gender" type='radio' value="Female" checked={Egender === "Female"} onClick={(e) => setEgender(e.target.value)} />
                                         <label id="female">Female</label>
                        
                        </div>

                        <div className='inputs'>
                            <div className='name'>Employee_Designation:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Designation :' onChange={e => setEdesign(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Employee_Salary:</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Salary:' onChange={e => setEsalary(e.target.value)} required/>
                            </div>
                        </div>


                        <div>
                            <button  >Submit</button>
                        </div>
                    </form>
                </div>
        <div className='table-container'>
            <div className='main'>
                <h1> Employee Details</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Employee_Name</th>
                            <div></div>
                            <th>Employee_ID</th>
                            <div></div>
                            <th>Employee_Department</th>
                            <div></div>
                            <th>Employee_DOB</th>
                            <div></div>
                            <th>Employee_Gender</th>
                            <div></div>
                            <th>Employee_Designation</th>
                            <div></div>
                            <th>Employee_Salary</th>
                            <div></div>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map( (d ,i) => (
                            <tr>
                                <td>{d.Ename}</td>
                                <div></div>
                                <td>{d.Eid}</td>
                                <div></div>
                                <td>{d.Edept}</td>
                                <div></div>
                                <td>{d.Edob}</td>
                                <div></div>
                                <td>{d.Egender}</td>
                                <div></div>
                                <td>{d.Edesign}</td>
                                <div></div>
                                <td>{d.Esalary}</td>
                                <div></div>
                                <td>
                                    <button onClick={e=>handleDelete(d.Eid)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div> 
    </div>
  )
}
export default Home

