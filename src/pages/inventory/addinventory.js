

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string, CheckBox, get_date,UnitsList, Tost_Massages  } from '../../components/general';
import { Post } from '../../services/services';
import SearchPicker from '../../components/SearchPicker';
import { CLRS } from '../../components/constants';
import { toast } from 'react-toastify';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        name:"",
        e_name:"",
        rate:"",
        e_rate:"",
        unit:"Hour",
        id:0,
        loading:false
      }
    }
    componentDidMount(){

    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
    }
    onSubmit = ()=>{
        const s = this.state;
        const e_name = get_error_string(s.name,"Name",3);
        const e_rate = Number(s.rate) > 0?false:"Invalid unit charge";
        this.setState({e_name,e_rate});
        if(!e_name && !e_rate){
            this.setState({loading:true});
            const post = {
              name:s.name,
              rate: Number(s.rate),
              unit:s.unit,
              id:s.id
            }
            Post("/item/create",post,(st,res)=>{
                if(st,res){
                  console.log("RES: ", res)
                    this.setState({loading:false,name:"",e_name:"",rate:"",e_rate:"",id:0});
                    if(s.id){
                      toast("Inventory updated successfully");
                      this.props.history.goBack();
                    }else{
                      toast("Inventory added successfully");
                    }
                }else{
                    this.setState({loading:false});
                    toast(Tost_Massages.wrong);
                }
            });
        }
    }
  
    render(){
  
  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{}}>
              <div className='fl' style={{marginBottom:16,backgroundColor:CLRS.WHITE,overflow:"hidden",alignItems:"center",borderRadius:"6px 6px 0px 0px",borderBottom:"1px #cccccc solid"}} >
              <h4  class="card-title mg-b-2 mt-3 ml-3 mb-3" style={{flex:1}}>New Inventory</h4>
              </div>
          <div style={{padding:16}}>
          <div className='fl'>
              <CInput
                    title="Name"
                    fl
                    onChange={(a) => this.onChangeText("name",a)}
                    value={this.state.name}
                    err={this.state.e_name}
              />
                <CInput
                    title="Unit Charge"
                    fl
                    onChange={(a) => this.onChangeText("rate",a)}
                    value={this.state.rate}
                    err={this.state.e_rate}
                    ml={8}
              />
          </div>
          <div className='fl'>
          <Picker
                title="Unit"
                list={UnitsList}
                onSelect={this.onChangeText.bind(this, 'unit')}
                field="name"
                value_field="id"
                fl
              />
              <div style={{flex:1}}>
                <Btn
                  wi={100}
                  ml={8}
                  mt={25}
                  title="SUBMIT"
                  style={{height:38}}
                  onClick={this.onSubmit}
                  loading={this.state.loading}
                />
              </div>
          </div>
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
      user:state.user,
      customer:state.customer,
      inventory:state.inventory,
      party:state.party,
      work:state.work,
      account:state.account
    }
  }
export default connect(mapStateToProps)(Page);
