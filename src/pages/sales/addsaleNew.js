

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Expenses } from '../../actions/party';
import { Get_Parties } from '../../actions/party';
import { Get_Customers } from '../../actions/customer';
import { Get_Accounts } from '../../actions/accounts';
import { Get_Works } from '../../actions/work';
import CTable from '../../components/Ctable';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string, CheckBox, get_date, Check_Positive_Number_Error, Check_OBJ_Required_Error, Tost_Massages, setSearchPickerDefaulValue, GetItemID, Edit_Delete_Btns  } from '../../components/general';
import { Post } from '../../services/services';
import SearchPicker from '../../components/SearchPicker';
import { toast } from 'react-toastify';
import AddParty from '../party/addparty';
import AddCustomer from '../customers/addcustomer';
import EditSaleItem from './editSaleItem';
class Page extends Component {
    constructor(){
      super();
      this.state = {
        party:{},
        e_party:"",
        amount:"",
        e_amount:"",
        project:{},
        qty:"",
        e_qty:"",
        item:"",
        service:{},
        e_item:"",
        items:[
         //  {
         //   item:"test test",
         //   amount:200,
         //   qty:2,
         //   total:400,
         //   id:Math.random()
         //  }
        ],
        payed:false,
        payed_amount:"",
        total:0,
        loading:false,
        account:HAND_ACCOUNT,
        date:get_date(new Date(),"YYYY-MM-DD"),
        id:0,
        comeBack:false,
        isSale:false,
      }
    }
    componentDidMount(){
      if(this.props.location && this.props.location.state){
        let updateState = {};
        if(this.props.location.state.party && this.props.location.state.party.id){
          updateState.party=setSearchPickerDefaulValue(this.props.location.state.party);
        }
        if(this.props.location.state.data && this.props.location.state.data.id){
          const data = this.props.location.state.data ;
          let newItems = [];
          if(this.props.location.state.items && this.props.location.state.items.length){
            this.props.location.state.items.map(it =>{
              newItems.push({
                item:it.name,
                amount:it.rate,
                qty:it.qty,
                total:it.total,
                id:it.id
              });
            });
          }
          updateState.party = setSearchPickerDefaulValue({name:data.og_party_name,id:data.party_id});
          updateState.project = setSearchPickerDefaulValue({name:data.project_name,id:data.project_id});
          updateState.date = get_date(data.date,"YYYY-MM-DD");
          updateState.items = newItems;
          updateState.id = data.id;
          updateState.total = data.total;
          updateState.comeBack = this.props.location.state.comeBack;
          updateState.isSale = this.props.location.state.isSale?true:false;
        }
        else if(this.props.location.state.project && this.props.location.state.project.id){
          updateState.project=setSearchPickerDefaulValue(this.props.location.state.project);
        }
        this.setState(updateState);
      }
        if(this.props.isSale){
            this.setState({isSale:true})
            this.props.Get_Customers({},()=>{});
        }else{
            this.props.Get_Parties({},()=>{});
        }
      
        this.props.Get_Works({},()=>{});
        this.props.Get_Accounts({},()=>{});
    }
    onChangeText = (field, value)=>{
      this.setState({[field]:value});
    }
  onSlectItem = (cus)=>{
    this.setState({item:cus,unit_price:String(cus.unit_price)})
  }
  onPayedTick = (current)=>{
      if(current){
        this.setState({payed:false})
      }else{
        this.setState({payed:true,payed_amount:String(this.state.total)})
      }
  }
  onSubmit = ()=>{
    const s = this.state;
    let e_party = Check_OBJ_Required_Error(s.party,"id",s.isSale?"Customer":"Party");
    if(e_party){
      this.setState({e_party});
    }else
    if(s.items.length === 0){
      alert("At least one item required.")
      this.setState({e_party});
    }else{
        this.setState({loading:true,e_party});
        const post = {
          items:s.items,
          party_id:GetItemID(s.party),
          item_id:GetItemID(s.service),
          project_id:GetItemID(s.project),
          payed:s.payed,
          payed_amount:s.payed_amount,
          account_id:s.payed ?GetItemID(s.account) :0,
          date:s.date,
          isSale:s.isSale,
          id:s.id
        }
        Post("/expense/create",post,(st,res)=>{
          if(st){
            this.setState({loading:false});
            toast(`${s.isSale?"Sale":"Purchase"} saved successfully`,{type:"success"});
            this.clear_state();
            if(s.comeBack){
              this.props.history.goBack();
            }
            // const { reloadData } = this.props.route && this.props.route.params?this.props.route.params:{};
            // if(reloadData){
            //   reloadData();
            // }
          }else{
            toast(Tost_Massages.wrong);
          }
        });
    }
  }
  onEditItem = (item)=>{
    const newItems = this.state.items;
    let oldTotal = 0;
    newItems.map(it =>{
        if(it.id === item.id){
            it.qty = item.qty;
            it.amount = item.amount;
            it.item = item.name;
            oldTotal = it.total;
            it.total = Number(item.amount) * Number(item.qty);
        }
    });
    let totaldiff = oldTotal - (Number(item.amount) * Number(item.qty));
    this.setState({items:newItems,total:(this.state.total - totaldiff)})
  }

  clear_state = ()=>{
    this.setState({
          party:{},
          party_name:"",
          amount:"",
          e_amount:"",
          item:"",
          e_item:"",
          items:[],
          payed:false,
          payed_amount:"",
          total:0,
          loading:false,
          new_party:false,
          select_party:true
    })
  }
  onAddItem = ()=>{
      const s = this.state;
      const isSale = this.props.isSale;
      const permissions = this.props.user.user && this.props.user.user.permissions?this.props.user.user.permissions:{};
      let itemSelectMode = permissions.employees === "Service" && isSale?true:false;
      let e_amount = Check_Positive_Number_Error(s.amount,"Amount");
      let e_qty =Check_Positive_Number_Error(s.qty,"Quantity");
      let e_item = itemSelectMode? Check_OBJ_Required_Error(s.service,"id","Service"):get_error_string(s.item,"Name",1);
      if(e_amount || e_item ||e_qty ){
        this.setState({e_item,e_amount,e_qty});
      }else{
          let item = {
                item:itemSelectMode?s.service.name:s.item,
                item_id:itemSelectMode?s.service.id:0,
                amount:Number(s.amount),
                qty:Number(s.qty),
                total:Number(s.amount) * Number(s.qty),
                id:Math.random(),
                new_item:true
              }
            let total = this.state.total + (Number(s.amount) * Number(s.qty));
              let all_items = this.state.items;
              all_items.push(item);
              this.setState({items:all_items,amount:"",qty:"",item:"",e_item:"",e_amount:"",e_qty:"",total});
              this.focusItemName();
      }
    }

    onRemoveItem = (item)=>{
      this.setState({items:this.state.items.filter(li => li.id !== item.id),total:this.state.total - Number(item.total)});
    }

    onSelectPicker = (value,field,stateField,list)=>{
      let item = list.find(li => li[field] === Number(value));
      console.log(item)
      this.setState({[stateField]:item});
    }
    
   
  
    render(){
      let itemsfileds = [{title:"SL NO",key:"slno"},{title:"Item",key:"item"},{title:"Amount",key:"amount"},{title:"Quantity",key:"qty"},{title:"Total",key:"total"},{title:"Actions",key:"Actions"}];
      const s = this.state;
      const isSale = this.props.isSale;
  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
           
              <div className='fl' style={{marginBottom:16}} >
              <h4  class="card-title mg-b-2 mt-2 mb-4" style={{flex:1}}>{isSale?"Add Payment":"Add Purchase"}</h4>
                {/* <div aria-label="Basic example" class="btn-group" role="group">
		        	    <button onClick={()=> this.onChangeText("expense_type","NORMAL")} class={"btn btn-secondary pd-x-25 " + (this.state.expense_type === "NORMAL"?"active":"")}  style={{height:36}} type="button">Normal</button> 
                  <button onClick={()=> this.onChangeText("expense_type","PURCHASE")} class={"btn btn-secondary pd-x-25 " + (this.state.expense_type === "PURCHASE"?"active":"")} type="button" style={{height:36}}>Purchase</button>
		          </div> */}
              </div>
            <div>
            <div className='fl'>
                {isSale?
                 <SearchPicker
                 title="Customer"
                 onAddClick={this.showAddCustomer}
                 list={this.props.customer.customers.data}
                 onChange={(a)=> this.onChangeText("party",a)}
                 err={this.state.e_party}
                 onEnterPress={this.focusDate}
                 value={this.state.party}
                 err={s.e_party}
                 fl
               />:
              <SearchPicker
                title="Party"
                onAddClick={this.showAddParty}
                list={this.props.party.parties.data}
                onChange={(a)=> this.onChangeText("party",a)}
                err={this.state.e_party}
                onEnterPress={this.focusDate}
                value={this.state.party}
                err={s.e_party}
                fl
              />}
              <CInput
                title="Date"
                fl
                date
                ml={8}
                value={this.state.date}
                onChange={(a) => this.onChangeText("date",a)}
                focus={call => this.focusDate = call}
                onEnterPress={this.focusProject}
              />
              {this.props.user.permissions.project_view?
               <SearchPicker
                title="Project"
                list={this.props.work.works.data}
                onChange={(a)=> this.onChangeText("project",a)}
                fl
                AddSelect
                err={this.state.e_project}
                ml={8}
                focus={call => this.focusProject = call}
                onEnterPress={this.focusItemName}
                value={this.state.project}
              />:<div style={{flex:1,marginLeft:8}} />}
    {this.props.user.permissions.project === "Service" && !isSale?
               <SearchPicker
                  title="Service"
                  list={this.props.item.list.data}
                  onChange={(a)=> this.onChangeText("service",a)}
                  fl
                  AddSelect
                  ml={8}
                  value={this.state.service}
              />:null}

            </div>
            <div className='fl'>
            {this.props.user.permissions.project === "Service" && isSale?
               <SearchPicker
                  title="Service"
                  list={this.props.item.list.data}
                  onChange={(a)=>{
                    this.setState({service:a,amount:a.rate?String(a.rate):""});
                  }}
                  fl
                  AddSelect
                  err={s.e_item}
                  value={this.state.service}
              />:
            <CInput
                title="Item Name"
                fl
                onChange={(a) => this.onChangeText("item",a)}
                value={this.state.item}
                err={this.state.e_item}
                focus={call => this.focusItemName = call}
                onEnterPress={this.focusUnitPrice}
              />}
               <CInput
                title="Amount"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("amount",a)}
                value={this.state.amount}
                err={this.state.e_amount}
                focus={call => this.focusUnitPrice = call}
                onEnterPress={this.focusQTY}

              />
               <CInput
                title="Quantity"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("qty",a)}
                value={this.state.qty}
                err={this.state.e_qty}
                focus={call => this.focusQTY = call}
                onEnterPress={this.onAddItem}

              />
              <div style={{flex:1}}>
                <Btn
                  wi={100}
                  ml={8}
                  mt={25}
                  title="ADD"
                  style={{height:38}}
                  onClick={this.onAddItem}
                />
              </div>
              
            </div>
          </div>

          </div>
        </div>

			<CTable 
                fields= {itemsfileds}
                list={this.state.items.length?[...this.state.items,{item:"Total",total:this.state.total,totalRow:true}]:[]}
                title=  {"ITEMS"}
                hide_Search
                hide_pagination
                custome={{
                  "slno":(item,index)=> <th  scope="row">{item.totalRow?"":(index + 1)}</th>,
                  "item":(item,index)=> <th style={{fontWeight:item.totalRow?"bold":"normal"}}  scope="row">{item.item}</th>,
                  "amount":(item,index)=> <th style={{fontWeight:item.totalRow?"bold":"normal"}}  scope="row">{item.amount}</th>,
                  "date":(item,index)=> <th  scope="row">{item.totalRow?"":get_date(item.date)}</th>,
                  "party":(item,index)=> <th  scope="row">{item.party?.name}</th>,
                  "Actions":(item)=>  <td>
                  {item.amount?
                  <Edit_Delete_Btns 
                     onEditPress={()=> this.showEditItem(item)}
                     onDeletePress={()=> this.onRemoveItem(item)}
                  />:null}
                </td>,
                }}
			/>
        <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
            <div className='fl'>
              <div style={{flex:1}}>
                {s.id?null:
                  <CheckBox onChange={() => this.onPayedTick(s.payed)} value={s.payed} title="Payed" />}
                  {this.state.payed?
            <div className='fl' style={{marginTop:16}}>
              <SearchPicker
                title="Account"
                list={[HAND_ACCOUNT,...this.props.account.list]}
                AddSelect
                onChange={(a)=> this.onChangeText("account",a)}
                onEnterPress={this.focusPayedAmount}
                value={this.state.account}
                fl
              />
              <CInput
                title="Payed Amount"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("payed_amount",a)}
                value={this.state.payed_amount}
                focus={call => this.focusPayedAmount = call}
              />
                    <div style={{flex:1}} />
            </div>:null}
                <Btn
                  wi={100}
                  mt={s.payed?0:16}
                  title="SUBMIT"
                  style={{height:38}}
                  onClick={this.onSubmit}
                />
              </div>
              
            </div>
          </div>
        </div>
        </div>
        <AddParty 
            show={call => this.showAddParty = call}
            onSuccess={()=> this.props.Get_Parties({},()=>{})}
        />
        <AddCustomer 
            show={call => this.showAddCustomer = call}
            onSuccess={()=> this.props.Get_Customers({},()=>{})}
        />
        <EditSaleItem 
         show={call => this.showEditItem = call}
         onSubmit={this.onEditItem}
        />
     
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      user:state.user,
      customer:state.customer,
      item:state.item,
      party:state.party,
      work:state.work,
      account:state.account
    }
  }
export default connect(mapStateToProps,{Get_Parties,Get_Accounts,Get_Works,Get_Customers})(Page);
