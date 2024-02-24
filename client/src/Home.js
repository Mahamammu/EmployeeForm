import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function Home() {
    const [Ename, setEname] = useState('');
    const [Eid, setEid] = useState('');
    const [Edept, setEdept] = useState('');
    const [Edob, setEdob] = useState('');
    const [Egender, setEgender] = useState('');
    const [Edesign, setEdesign] = useState('');
    const [Esalary, setEsalary] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://employeeform-3.onrender.com/', { Ename, Eid, Edept, Edob, Egender, Edesign, Esalary })
            .then(res => {
                navigate('/');
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('https://employeeform-3.onrender.com/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (Eid) => {
        axios.delete(`https://employeeform-3.onrender.com/${Eid}`)
            .then(res => navigate('/'))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h1>Enter Employee Details</h1>
                    <div className='inputs'>
                        <div className='name'>EName:</div>
                        <div className='inputs'>
                            <input type='text' placeholder='Name:' maxLength={30} onChange={e => setEname(e.target.value)} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>EId:</div>
                        <div className='inputs'>
                            <input type='text' placeholder='Id:' maxLength={30} onChange={e => setEid(e.target.value)} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>EDepartment:</div>
                        <div className='inputs'>
                            <input type='text' placeholder='Department:' maxLength={30} onChange={e => setEdept(e.target.value)} required />
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>EmpDOB:</div>
                        <div className='inputs'>
                            <input type='date' max={new Date().toISOString().split("T")[0]} onChange={e => setEdob(e.target.value)} required />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="name">Employee_Gender</div>
                        <input id="male" type="radio" name="Gender" value="Male" checked={Egender === "Male"} onChange={(e) => setEgender(e.target.value)} />
                        <label htmlFor="male">Male</label>

                        <input id="female" name="Gender" type='radio' value="Female" checked={Egender === "Female"} onChange={(e) => setEgender(e.target.value)} />
                        <label htmlFor="female">Female</label>
                    </div>

                    <div className='inputs'>
                        <div className='name'>Employee_Designation:</div>
                        <div className='inputs'>
                            <select onChange={e => setEdesign(e.target.value)} required>
                                <option value="">Select Designation</option>
                                <option value="Manager">Manager</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Developer">Developer</option>
                            </select>
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='name'>Employee_Salary:</div>
                        <div className='inputs'>
                            <input type='text' placeholder='Salary:' onChange={e => setEsalary(e.target.value)} required />
                        </div>
                    </div>

                    <div>
                        <button>Submit</button>
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
                                <th>Employee_ID</th>
                                <th>Employee_Department</th>
                                <th>Employee_DOB</th>
                                <th>Employee_Gender</th>
                                <th>Employee_Designation</th>
                                <th>Employee_Salary</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.Ename}</td>
                                    <td>{d.Eid}</td>
                                    <td>{d.Edept}</td>
                                    <td>{d.Edob}</td>
                                    <td>{d.Egender}</td>
                                    <td>{d.Edesign}</td>
                                    <td>{d.Esalary}</td>
                                    <td>
                                        <button onClick={() => handleDelete(d.Eid)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;

