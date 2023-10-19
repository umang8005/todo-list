import './Todo.css'
import { useEffect , useState } from "react";
import search from './img/search.png';

function Todo()
{
    let [data, setData] = useState([]);
    let [isActive , setisActive] = useState(false);
    let [completed , setCompleted] = useState([]);
    let [check , setcheck] = useState("all");



    useEffect(() => {   
        let setlocal = JSON.parse(localStorage.getItem('Task'));
        if (setlocal == null) {
            setData([]);
        }
        else {
            setData(setlocal)
        }

    }, setData);

    let todoDetails = (e) => {
        e.preventDefault();
        var obj = {
            task : e.target.task.value,
            isActive : false,
            id : Math.round(Math.random()*1000)
        }
        let record = ([...data,obj]);
        setData(record);
        localStorage.setItem('Task', JSON.stringify(record));
        e.target.task.value = "";
        // console.log(obj.id);
    }

    let deleteTask = (id) => {
        let pos = data.findIndex(v => v.id == id);
        if(pos != -1)
        {
            data.splice(pos, 1);
        }
        setData(data);
        localStorage.setItem('Task', JSON.stringify(data));
        let localRecord = JSON.parse(localStorage.getItem('Task'));
        setData(localRecord);
    }

    let changevalue = (id) => {
        let pos = data.findIndex(v => v.id == id);
        // console.log(pos);
        if(data[pos].isActive)
        {
            data[pos].isActive = false;
        }
        else
        {
            data[pos].isActive = true;
        }
        //  console.log(data);
        localStorage.setItem('Task', JSON.stringify(data));

    }
    return(
        <div style={{textAlign : "center",marginTop : "100px"}}>
            <div className='box'>
                <div style={{textAlign : "center"}}>
                        <h1 className='heading'>THINGS TO DO</h1>
                        <form onSubmit={(e) => todoDetails(e)}>
                            <input type='text' name='task' placeholder='Add New' className='input_box' style={{marginBottom : "20px"}}></input>
                        </form>
                        {check == "active" ? 
                            data.map((v) => {
                                return(
                                    <>
                                        {v.isActive == false ?
                                            <div>
                                            <div className='print-box'>
                                                <input type="checkbox" name='task-print' onChange={() => changevalue(v.id)}/>
                                                <label for="task-print" style={{marginLeft : "22px"}}>{v.task}</label>
                                                <p className='delete' onClick={() => deleteTask(v.id)}>❌</p>
                                                <hr className='line'/>
                                            </div>
                                            </div>
                                        : ""
                                        }  
                                    </>
                                )
                            })

                        :check == "completed" ?

                        
                        data.map((v) => {
                            return(
                                <>
                                    {v.isActive == true ?
                                        <div>
                                        <div className='print-box'>
                                            <input type="checkbox" name='task-print' onChange={() => changevalue(v.id)}/>
                                            <label for="task-print" style={{marginLeft : "22px"}}>{v.task}</label>
                                            <p className='delete' onClick={() => deleteTask(v.id)}>❌</p>
                                            <hr className='line'/>
                                        </div>
                                        </div>
                                    : ""
                                    }  
                                </>
                            )
                        })
                        
                        :check == "all" ?

                        data.map((v) => {
                            return(
                                <>
                                    {v.isActive == true || v.isActive == false?
                                        <div>
                                        <div className='print-box'>
                                            {v.isActive == true ?
                                            
                                                <input type="checkbox" name='task-print' checked onChange={() => changevalue(v.id)}/>
                                                
                                            :
                                            
                                                <input type="checkbox" name='task-print' onChange={() => changevalue(v.id)}/>
                                            
                                            }
                                            <label for="task-print" style={{marginLeft : "22px"}}>{v.task}</label>
                                            <p className='delete' onClick={() => deleteTask(v.id)}>❌</p>
                                            <hr className='line'/>
                                        </div>
                                        </div>
                                    : ""
                                    }  
                                </>
                            )
                        })

                        : ""
                    
                        }
                        
                </div>
                <div style={{textAlign : "center"}}>
                    <div className='bottom-box'>
                        <div style={{display : "flex",alignItems : "center"}}>
                            <p style={{fontSize : "28px",marginLeft : '20px'}}>+</p>
                            <img src={search} alt="search" className='search' />
                            <span className='or'>|</span>
                            <p className='text'>{data.length} items left</p>
                        </div>
                        <div>
                            <input type="submit" name='all' value="All" className='btn' onClick={() => setcheck("all")} />
                            <input type="submit" name='active' value="Active" className='btn' onClick={() => setcheck("active")}/>
                            <input type="submit" name='completed' value="Completed" className='btn' onClick={() => setcheck("completed")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;