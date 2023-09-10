import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { CardTitle, get_date, LabelData, setNumberFormat, Txt, Edit_Delete_Btns, Tost_Massages } from '../../components/general';
import { Post } from '../../services/services';

class Page extends Component {
    constructor(){
      super();
      this.state = {
        work:{},
        transactions:[],
        id:0
      }
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = ()=>{
        let url = this.props.location.pathname;
        url = url.split('/');
        if(url && url.length > 1){
            Post('/project/singleDeposits',{
                id:url[2]
            },(st,res)=>{
                if(st && res.status === "Success"){
                    this.setState({work:res.data,transactions:res.transactions,loading:false,id:url[2]});
                }else{
                    toast(Tost_Massages.wrong);
                }
            });
        }
    }

    render(){
      const s = this.state;
      const work = this.state.work?this.state.work:{};
  return (
     <>
        <div style={{}}>
            <h2 style={{marginLeft:16,marginBottom:16}}>{s.work.name}</h2>
            <div className='fl'>
                <div style={{flex:1,paddingRight:16,marginLeft:8}}>
                    <div style={{backgroundColor:"#FFF",padding:8,borderRadius:6}}>
                        <div className='fl'> 
                            <CardTitle fl title="FD & BG" />
                            <Edit_Delete_Btns style={{marginTop:8}} onEditPress={() => this.EditProject(s.work)} onDeletePress={this.show_delete_modal}  />
                        </div>
                        <LabelData 
                            label="Amount"
                            data={s.work.amount}
                            mt={12}
                        />
                          <LabelData 
                            label="Deposit Date"
                            data={get_date(s.work.date)}
                            fl
                            mt={12}
                        />
                        <LabelData 
                            label="End Date"
                            data={get_date(s.work.end_date)}
                            fl
                            mt={12}
                        />
                          {s.work.tender_end && s.work.tender?
                        <LabelData 
                            label="Project Name"
                            data={s.work.project_name}
                            fl
                            mt={12}

                        />:null}
                        <LabelData 
                            label="Remarks"
                            data={s.work.remarks}
                            fl
                            mt={12}

                        />
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      work:state.work,
    }
  }
export default connect(mapStateToProps)(Page);