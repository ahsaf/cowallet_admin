

import React, { Component } from 'react';
import {CInput,get_error_string, Txt, Check_Positive_Number_Error,Check_OBJ_Required_Error, Btn, Tost_Massages } from '../../components/general';
import { Post } from '../../services/services';
import {
    CButton,CModalHeader,CModalTitle,CModal,CModalBody,CModalFooter,CSwitch
    } from '@coreui/react';
import SearchPicker from '../../components/SearchPicker';
import { Get_Equipments } from '../../actions/equipment';
import { Get_Works } from '../../actions/work';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
class ReturnTool extends Component {
    constructor(){
        super();
        this.state={
            count:"",
            e_count:"",
            loading:false,
            show_add:false,
            data:{}
        }
    }
    onChangeText = (field, value)=>{
        this.setState({[field]:value});
    }
    onChange2 = (n,v)=>{
        this.setState({[n]:v});
      }
  
    componentDidMount(){
        if(this.props.show){
            this.props.show(this.show_modal);
        }
    }
    show_modal = (client)=>{
          this.setState({show_add:true,count:client.count,data:client});
      }
    onSubmit = ()=>{
        const s = this.state;
        const e_count = s.count && Number(s.count)&& Number(s.count) > 0 && Number(s.count) <= s.data.count?false:"Invalid count";
        if(e_count){
            this.setState({e_count});
        }else{
            this.setState({loading:true});
            Post("/equipment/return",{id:s.data.id,count:Number(s.count)},(st,res)=>{
                if(st){
                    this.setState({   count:"",
                    e_count:"",
                    loading:false,
                    show_add:false,
                    data:{}});
                    toast("Tool return added successfully",{type:"success"});
                    this.props.onSuccess();
                }else{
                    toast(Tost_Massages.wrong);
                    this.setState({
                    loading:false
                });
                }
            });
        }
    }
    render(){
		const s = this.state;
        const p = this.props;
       
  return (
     <>
    <CModal 
        show={this.state.show_add} 
        onClose={() => this.setState({show_add:false})}
        size="lg"
    >
    <CModalHeader closeButton>
        <CModalTitle>{'Return tool'}</CModalTitle>
    </CModalHeader>
    <CModalBody>
  <div className='fl'>
    <CInput 
        title="Count"
        fl
        value={s.count}
        ml={8}
        number
        onChange={this.onChange2.bind(this, 'count')}
        err={s.e_count}
    />
        </div>
  </CModalBody>
  <CModalFooter>
      <Btn 
      title={"Submit"}
      wi={100}
      onClick={this.onSubmit}
      loading={s.loading}
      />
  </CModalFooter>
 
</CModal>
        
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
        equipment:state.equipment,
    }
  }
export default connect(mapStateToProps,{Get_Works,Get_Equipments})(ReturnTool);
