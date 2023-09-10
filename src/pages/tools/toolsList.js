

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Get_Equipments,Get_All_Equipments_Mapping,Delete_Tool } from '../../actions/equipment';
import AskConfirm from '../../components/askConfirmModal';
import CTable from '../../components/Ctable';
import AddTool from './addTool';
import AssignTool from './assignTool';
import ReturnTool from './returnTool';
class Page extends Component {
    constructor(){
      super();
      this.state = {
        
      }
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = ()=>{
      this.props.Get_Equipments({
        limit:10
      },()=>{

      });
      this.props.Get_All_Equipments_Mapping({},()=>{});
    }
    
	onData_CLick = (item)=>{
    this.props.history.push(`/project/${item.id}`);
	}

  onClickAdd = ()=>{
    this.Show_Add();
  }
  onFetch = (post)=>{
    this.props.Get_Equipments(post,()=>{});
  }

  onDelete = (item)=>{
    this.props.Delete_Tool(item.id);
  }

    render(){
      const s = this.state;
  return (
     <>
        <div style={{}}>
          <CTable 
            fields={[ {title:"SL NO",key:"slno"},{title:"Name",key:"name"},{title:"Description",key:"description"},{title:"Stock",key:"stock"},{title:"Actions",key:"Actions"}]}
            list={this.props.equipment.list.data}
            data={this.props.equipment.list}
            title="Tools"
            onFetch={this.onFetch}
            onAddClick={this.onClickAdd}
            addBtn="Add Tool"
            custome={{
              "stock":(item,index)=> {
                let MappingList = this.props.equipment.allEquipmentMapping.filter(li => li.equipment_id === item.id);
                return(
                  <td >
                    {MappingList && MappingList.length ?MappingList.map(pr =>{
                      return(
                        <div className='fl'>
                           <p style={{margin:0,padding:0}}>{pr.project_name}: {pr.count}</p>
                           <i className="side-menu__icon fe fe-arrow-up-left point "  onClick={()=> this.onReturnTool(pr)} style={{color:"#777",fontSize:16,marginLeft:4}}></i>
                        </div>
                         
                      )
                    }):null}
                  <p style={{margin:0,padding:0}}>Stock: {item.stock}</p>
                  <p style={{margin:0,padding:0}}>Count: {item.count}</p>
                </td>
                )
              },
              "Actions":(item,index)=> {
                return(
                  <td>
                      <i className="side-menu__icon fe fe-plus-square point "  onClick={()=> this.show_assign_Tools(item)} style={{color:"#000",fontSize:16}}></i>
                      <i className="side-menu__icon fe fe-edit point " onClick={()=> this.Show_Add(item)} style={{color:"#000",marginLeft:8,fontSize:16}}></i>
                      <i className="side-menu__icon fe fe-trash point " onClick={()=> this.show_delete_modal(item,false,`Tab Delete to confirm deleting "${item.name}"`)} style={{color:"#000",marginLeft:8,fontSize:16}}></i>
                  </td>
                )
              }	
            }}
          />
        </div>
        <AddTool 
          show={call => this.Show_Add = call}
        />
           <AskConfirm 
          show={call => this.show_delete_modal = call}
          onSubmit={this.onDelete}
    />
           <AssignTool 
          show={call => this.show_assign_Tools = call}
          from_equipment
          onSuccess={this.fetchData}
    />
      <ReturnTool 
            show={call => this.onReturnTool = call}
            onSuccess={this.fetchData}
        />
    
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      equipment:state.equipment,
    }
  }
export default connect(mapStateToProps,{Get_Equipments,Get_All_Equipments_Mapping,Delete_Tool})(Page);
