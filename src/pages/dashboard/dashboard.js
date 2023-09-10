

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Dashboard } from '../../actions/user';

import { Btn, get_date, LabelData, setNumberFormat, Txt } from '../../components/general';
import { CLRS } from '../../components/constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const gen_Last30Days = ()=>{
  let dates = [];
    for(let i = 1; i < 30 ; i++){
      dates.unshift(moment().subtract("days", i).format("DD/MM"))
    }
    return dates;
}

export const data = {
  labels:gen_Last30Days(),
  datasets: [
    {
      label: 'Last 30 days',
      data: [10,200,50,12,0,41,70],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'Yesterday',
    //   data: [20,500,40,54,10,58,0],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};


const DashBoardCard = ({style,count = 0,value=0,title="",icon="",img}) =>{
  return(
    <div className='dashboardcard' style={{flex:1,...style}}>
      <div className="dashcardstats">
         <Txt >{title} ({count})</Txt>
        <Txt s={12} c="gray" mt={16}>Total Balance</Txt>
        <Txt mt={-4} s={20} w="500">{setNumberFormat(value)}</Txt>
      </div>
        <div className='dashcardicon'>
        {/* <i style={{size:24}} className="fe fe-dollar-sign"></i> */}
        <img src={img} style={{width:120,height:80}} />
        </div>
    </div>
  )
}


class Page extends Component {
    constructor(){
      super();
      this.state = {
      }
    }
    componentDidMount(){
      this.props.Get_Dashboard();
    }
    onData_CLick = (item)=>{
      this.props.history.push(`/project/${item.id}`);
    }
    onClickAddattendance = ()=>{
      this.props.history.push("/add-attendance");
    }
    onClickAddExpense = ()=>{
      this.props.history.push("/add-purchase");
    }

    render(){
      const s = this.state;
      const statistics = this.props.user.dashboard.statistics?this.props.user.dashboard.statistics:{}
  return (
     <>
        <div style={{}}>
          <div className='fl' style={{marginBottom:16}}>
              <DashBoardCard title='Customers' count={0} value={0}  style={{marginRight:16}} img={require("../../assets/img/customer.png")}  />
              <DashBoardCard title='Party' count={statistics.partyCount} value={statistics.partyBalacne} style={{marginRight:16}} img={require("../../assets/img/partyicon.png")}  />
              <DashBoardCard  title='Employees' count={statistics.employeeCount} value={statistics.employeeBalance} img={require("../../assets/img/workericon3d.png")}   style={{marginRight:16}}  />
          </div>
          <div className='fl' style={{marginBottom:16}}>
            <div style={{flex:2,marginRight:16,backgroundColor:"#fff",borderRadius:6,padding:8}}>
              <Line options={options} data={data} />
            </div>
            <div   style={{padding:16,flex:1,marginRight:16,backgroundColor:"#fff",borderRadius:6 }}  >
                    <h4  class="card-title mg-b-2 mt-2" style={{flex:1}}>Projects</h4>
                    <div style={{}}>
                        {this.props.user.dashboard  && this.props.user.dashboard.projects && this.props.user.dashboard.projects.length ?this.props.user.dashboard.projects.map(it=>{
                          return(
                            <div onClick={()=> this.onData_CLick(it)} className='fl tumbclass' style={{marginTop:10}}>
                                <Txt c="thrd"  point   fl>{it.name}</Txt>
                            </div>
                          )
                        }):<Txt c="thrd">Add your first project</Txt>}
                    </div>
                </div>
          </div>



	
				{/* <div className="card" style={{padding:16,flex:1,marginRight:16}}  >
                <h4  class="card-title mg-b-2 mt-2" style={{flex:1}}>statistics</h4>
                  <div className='fl' style={{marginTop:10}}>
                    <Txt c="thrd"  fl>Employee Balance ({statistics.employeeCount})</Txt>
                    <Txt>{setNumberFormat(statistics.employeeBalance)}</Txt>
                  </div>
                  <div className='fl' style={{marginTop:10}}>
                    <Txt c="thrd"  fl>Party Balance ({statistics.partyCount})</Txt>
                    <Txt>{setNumberFormat(statistics.partyBalacne)}</Txt>
                  </div>
                  <div className='fl' style={{marginTop:10}}>
                    <Txt c="thrd"  fl>Total Balance</Txt>
                    <Txt>{setNumberFormat(statistics.totalBalance)}</Txt>
                  </div>
                </div> */}
        </div>
      
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      user:state.user,
    }
  }

export default connect(mapStateToProps,{Get_Dashboard})(Page);
