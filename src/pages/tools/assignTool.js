

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
            e_count:"",
            project:{},
            e_project:"",
            tool:{},
            og_tool:{},
            e_tool:"",
            equipment_id:0,
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
       
        if(this.props.from_project){
            this.props.Get_Equipments({},(st,res)=>{});
        }else if(this.props.from_equipment){
            this.props.Get_Works({},()=>{});
        }
    }
    show_modal = (client)=>{
          this.setState({show_add:true,equipment_id:client && client.id?client.id:0,og_tool:client})
      }

    onSubmit = ()=>{
        const s = this.state;
        const p = this.props;
        // const e_count = Check_Positive_Number_Error(s.count,"Count")
        const e_project = p.from_project?false:Check_OBJ_Required_Error(s.tool,"id","Project")
        const e_tool = Check_OBJ_Required_Error(s.tool,"id","Tool")
        const e_count = s.count && Number(s.count) && Number(s.count) > 0 ? p.from_equipment? Number(s.count) > s.og_tool.stock?"Enter a value is lessthan current stock":false:s.tool && s.tool.id ?Number(s.count) > s.tool.stock?"Enter a value is lessthan current stock":false:false:"Enter valid count";
        this.setState({e_count,e_project,e_tool});
        if(!e_count && !e_project && !e_tool){
            this.setState({loading:true});
            const post = {
                project_id:p.from_project?p.project_id:s.tool.id,
                equipment_id:p.from_project?s.tool.id:s.equipment_id,
                count:Number(s.count)
            }
            Post("/equipment/createEquipmentAssign",post,(st,res)=>{
                if(st && res && res.status === "done"){
                    this.setState({loading:false,show_add:false});
                    toast("Tool added successfully",{type:"success"});
                    this.clearState();
                    if(this.props.onSuccess){
                        this.props.onSuccess();
                    }
                }else if(st && res && res.status === "err" && res.msg && res.msg.details && res.msg.details.length){
                    this.setState({loading:false});
                    toast(Tost_Massages.wrong,{type:"error"});
                }else{
                    this.setState({loading:false});
                    toast(Tost_Massages.wrong,{type:"error"});
                }
            })
        }
    }
clearState = ()=>{
    this.setState({name:"",
    e_name:"",
    description:"",
    customer_name:"",
    customer_phone:"",
})
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
        <CModalTitle>{'Add tool to project'}</CModalTitle>
    </CModalHeader>
    <CModalBody>
  <div className='fl'>
    <SearchPicker
                title={p.from_project?"Tool":"Project"}
                list={p.from_project?this.props.equipment.list.data:this.props.work.works?.data}
                onChange={(a)=> this.onChangeText("tool",a)}
                err={this.state.e_tool}
                onEnterPress={this.focusCount}
                value={this.state.tool}
                fl

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
    />
        </div>
        {s.tool && s.tool.id && !p.from_equipment?<label>Stock: {s.tool.stock}</label>:null}
        

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
        work:state.work,
    }
  }
export default connect(mapStateToProps,{Get_Works,Get_Equipments})(AssignTool);
