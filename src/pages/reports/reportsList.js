

import React, { Component } from 'react';
import { CardTitle, Txt } from '../../components/general';

const Reports = [
    {id:1,name:"Labour Report",route:"/labourWorkReport"},
    {id:1,name:"Expense Report",route:"/expenseReport"},
    // {id:1,name:"Transaction Report",route:""},
]


class Page extends Component {
    onData_CLick = (item)=>{
        this.props.history.push(item.route);
    }
    render(){
        return (
            <>
                <div style={{}}>
                        <div style={{flex:1,paddingRight:16,marginLeft:8}}>
                            <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6}}>
                                <div className='fl'> 
                                    <CardTitle fl title="Reports" />
                                </div>
                                {Reports.map(it =>{
                                    return(
                                        <div className='point' onClick={()=> this.onData_CLick(it)} style={{marginTop:8}}>
                                            <Txt point mt={4}  mb={4}>{it.name}</Txt>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                </div>
            </>
            )
        }
    }

export default Page;
