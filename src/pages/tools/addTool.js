

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

class AssignTool extends Component {
    constructor(){
        super();
        this.state={
            count:"",
            description:"",
            stock:"",
            e_count:"",
            name:"",
            e_name:"",
            id:0,
            loading:false,
            show_add:false
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
        if(client){
            this.setState({
                show_add:true,
                id:client.id,
                count:client.count,
                stock:client.stock,
                name:client.name,
                description:client.description
            });
        }else{
            this.setState({show_add:true,
                id:0,
                count:"",
                stock:"",
                name:"",
                description:""})
        }
         
      }

    onSubmit = ()=>{
        const s = this.state;
        const e_count = Check_Positive_Number_Error(s.count,"Count")
        const e_name = get_error_string(s.name,"Name",3);

        this.setState({e_count,e_name});
        if(!e_count || !e_name ){
            this.setState({loading:true});
            const post = {
                name:s.name,
                description:s.description,
                count:s.count && Number(s.count) && Number(s.count) > 0?Number(s.count):0,
                id:s.id?s.id:0,
                stock:s.stock,
                old_data:s.equipment?s.equipment:{}
            }
            
            Post(`/equipment/${s.id?"update":"create"}`,post,(st,res)=>{
                if(st && res && res.status === "done"){
                    this.setState({loading:false,show_add:false});
                    toast(`Tool ${s.id?"updated":"added"} successfully`);
                    this.clearState();
                    this.props.Get_Equipments({limit:10},()=>{});
                }else if(st && res && res.status === "err" && res.msg && res.msg.details && res.msg.details.length){
                    this.setState({loading:false,show_add:false});
                    toast(Tost_Massages.wrong);
                }else{
                    toast(Tost_Massages.wrong);
                    this.setState({loading:false,show_add:false});
                }
            });
        }
    }
clearState = ()=>{
    this.setState({
        name:"",
        e_name:"",
        description:"",
        customer_name:"",
        customer_phone:"",
    });
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
        <CModalTitle>{'Add tool'}</CModalTitle>
    </CModalHeader>
    <CModalBody>
  <div className='fl'>
      <CInput 
        title="Name"
        fl
        value={s.name}
        onChange={this.onChange2.bind(this, 'name')}
        err={s.e_name}
        onEnterPress={this.focusCount}
    />
    <CInput 
        title="Count"
        fl
        value={s.count}
        ml={8}
        number
        onChange={this.onChange2.bind(this, 'count')}
        err={s.e_count}
        focus={call => this.focusCount = call}
        onEnterPress={this.focusDesc}
    />
        </div>
        <div className='fl'>
    <CInput 
        title="Description"
        fl
        value={s.description}
        onChange={this.onChange2.bind(this, 'description')}
        focus={call => this.focusDesc = call}
        onEnterPress={this.onSubmit}
    />
    {s.id?
     <CInput 
        title="Stock"
        fl
        value={s.stock}
        ml={8}
        number
        onChange={this.onChange2.bind(this, 'stock')}
    />:null}
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
export default connect(mapStateToProps,{Get_Works,Get_Equipments})(AssignTool);
