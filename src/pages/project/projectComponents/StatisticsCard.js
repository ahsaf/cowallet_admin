import React from 'react';
import { Txt,setNumberFormat } from '../../../components/general';


const StatisticsCard = ({value,title,bg,icon}) =>{
    return (
        <div  className='fl' style={{backgroundColor:bg?bg:"#FFF",height:100,flex:1,padding:16,marginRight:8,borderRadius:6,alignItems:"center"}}>
            <div style={{width:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {/* <i className="fe fe-credit-card" /> */}
                <img src={icon}  style={{width:50,height:50}} />
            </div>
            <div className='fldc' >
                <Txt w="500" s={16}>{setNumberFormat(value)}</Txt>
                <Txt c="thrd">{title}</Txt>
            </div>
        </div>
    )
}
export default StatisticsCard;