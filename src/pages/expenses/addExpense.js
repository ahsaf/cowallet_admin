

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Expenses } from '../../actions/party';
import { Get_Parties } from '../../actions/party';
import { Get_Accounts } from '../../actions/accounts';
import { Get_Works } from '../../actions/work';
import CTable from '../../components/Ctable';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string, CheckBox, get_date  } from '../../components/general';
import { Post } from '../../services/services';
import SearchPicker from '../../components/SearchPicker';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        party:{},
        new_party:false,
        expense_type:"PURCHASE",
        party_name:"",
        e_party:"",
        amount:"",
        e_amount:"",
        project:{},
        e_project:"",
        qty:"",
        e_qty:"",
        item:"",
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
        select_party:true,
        date:get_date(new Date(),"YYYY-MM-DD"),
        bill_no:"",
        id:0
      }
    }
    componentDidMount(){
        this.props.Get_Parties({},()=>{});
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
    if(s.expense_type === "NORMAL"){
      this.onNormalSubmit();
    }else{
    let e_party = !s.new_party?s.party.id?false:"Choose Party":s.party_name?false:"Enter party name";
    // let e_project = s.project.id?false:"Choose Project";
    let e_project = false;
   
    if(e_party || e_project){
      this.setState({e_party,e_project});
    }else
    if(s.items.length === 0){
      alert("At least one item required.")
      this.setState({e_party});
    }else{
      this.setState({loading:true,e_party,e_project});
      Post("/expense/create",{
        items:s.items,
        party_name:s.party_name,
        select_party:!s.new_party,
        party:s.party,
        project:s.project,
        payed:s.payed,
        payed_amount:s.payed_amount,
        account:s.account,
        date:s.date,
        bill_no:s.bill_no,
      },(st,res)=>{
        console.log("HEREEEEE: ", res)
        if(st){
          this.setState({loading:false});
          // Tost("Expense Saved Successfully");
          this.clear_state();
        }else{
          // Tost(Tost_Massages.wrong);
        }
      })
    }
  }
  }
  onNormalSubmit = ()=>{
    const s = this.state;
    if(s.items.length === 0){
      alert("At least one item required.")
    }else{
      this.setState({loading:true});
      Post("/expense/normalcreate",{
        items:s.items
      },(st,res)=>{
        console.log("HEREEEEE: ", res)
        if(st){
          this.setState({loading:false});
          // Tost("Expense Saved Successfully");
          this.clear_state();
        }else{
          // Tost(Tost_Massages.wrong);
        }
      })
    }
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
      let e_amount = s.amount && Number(s.amount) > 0?false:"Enter a valid amount";
      let e_qty = s.qty && Number(s.qty) > 0?false:"Enter a valid quantity";
      let e_item = get_error_string(s.item,"Name",1);
      if(e_amount || e_item ||e_qty ){
        this.setState({e_item,e_amount,e_qty});
      }else{
          let item = {
              item:s.item,
              amount:Number(s.amount),
              qty:Number(s.qty),
              total:Number(s.amount) * Number(s.qty),
              id:Math.random()
              }
            let total = this.state.total + (Number(s.amount) * Number(s.qty));
              let all_items = this.state.items;
              all_items.push(item);
              this.setState({items:all_items,amount:"",qty:"",item:"",e_item:"",e_amount:"",e_qty:"",total});
              this.focusItemName();
      }
    }
    onNormalAdd = ()=>{
      const s = this.state;
      let e_amount = s.amount && Number(s.amount) > 0?false:"Enter a valid amount";
      let e_item = get_error_string(s.item,"Description",1);
      if(e_amount || e_item ){
        this.setState({e_item,e_amount});
      }else{
          let item = {
              item:s.item,
              amount:Number(s.amount),
              date:this.state.date?new Date(this.state.date):new Date(),
              id:Math.random(),
              party:s.new_party?s.party_name?{name:s.party_name}:{}:s.party&&s.party.id &&s.party.id !== "Select"?s.party:{}
              }
            let total = this.state.total + Number(s.amount);
              let all_items = this.state.items;
              all_items.push(item);
              this.setState({items:all_items,amount:"",qty:"",item:"",e_item:"",e_amount:"",e_qty:"",total});
              if(s.new_party){
                this.focusPartyInput();
              }else{
                this.focusPartyPicker();
              }
      }
    }

    onRemoveItem = (item)=>{
      this.setState({items:this.state.items.filter(li => li.id !== item.id),total:this.state.total - Number(item.amount)});
    }

    onSelectPicker = (value,field,stateField,list)=>{
      let item = list.find(li => li[field] === Number(value));
      console.log(item)
      this.setState({[stateField]:item});
    }
    
    
   
  
    render(){
      let itemsfileds = [{title:"SL NO",key:"slno"},{title:"Item",key:"item"},{title:"Amount",key:"amount"},{title:"Quantity",key:"qty"},{title:"Total",key:"total"}];
      if(this.state.expense_type === "NORMAL"){
        itemsfileds = [{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Party",key:"party"},{title:"Description",key:"item"},{title:"Amount",key:"amount"}];
      }
  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
           
              <div className='fl' style={{marginBottom:16}} >
              <h4  class="card-title mg-b-2 mt-2 mb-4" style={{flex:1}}>Add Expense</h4>
                {/* <div aria-label="Basic example" class="btn-group" role="group">
		        	    <button onClick={()=> this.onChangeText("expense_type","NORMAL")} class={"btn btn-secondary pd-x-25 " + (this.state.expense_type === "NORMAL"?"active":"")}  style={{height:36}} type="button">Normal</button> 
                  <button onClick={()=> this.onChangeText("expense_type","PURCHASE")} class={"btn btn-secondary pd-x-25 " + (this.state.expense_type === "PURCHASE"?"active":"")} type="button" style={{height:36}}>Purchase</button>
		          </div> */}
              </div>
              {this.state.expense_type === "PURCHASE"?
            <div>
            <CheckBox 
            onChange={()=> this.onChangeText("new_party",!this.state.new_party)}
            value={this.state.new_party}
            mb={8}
            title="New Party"
            />
            <div className='fl'>
              {this.state.new_party?
              <CInput 
                title="Party Name"
                fl
                onChange={(a) => this.onChangeText("party_name",a)}
                value={this.state.party_name}
                onEnterPress={this.focusProject}
              
              />:
              <SearchPicker
                title="Party"
                list={this.props.party.parties.data}
                onChange={(a)=> this.onChangeText("party",a)}
                err={this.state.e_party}
                onEnterPress={this.focusProject}
                value={this.state.party}
             
                fl

              />}
            
              <CInput
                title="Bill Number"
                fl
                ml={8}
                onChange={(a) => this.onChangeText("bill_no",a)}
                value={this.state.bill_no}
                focus={call => this.focusBillNumber = call}
                onEnterPress={this.focusDate}
              />
              <CInput
                title="Date"
                fl
                date
                ml={8}
                value={this.state.date}
                onChange={(a) => this.onChangeText("date",a)}
                focus={call => this.focusDate = call}
                onEnterPress={this.focusItemName}


              />
              {this.props.user.permissions.project_view?
               <SearchPicker
                title="Project"
                list={this.props.work.works.data}
                onChange={(a)=> this.onChangeText("project",a)}
                fl
                err={this.state.e_project}
                ml={8}
                focus={call => this.focusProject = call}
                onEnterPress={this.focusBillNumber}
                value={this.state.project}
              />:<div style={{flex:1,marginLeft:8}} />}
            </div>
            <div className='fl'>
            <CInput
                title="Item Name"
                fl
                onChange={(a) => this.onChangeText("item",a)}
                value={this.state.item}
                err={this.state.e_item}
                focus={call => this.focusItemName = call}
                onEnterPress={this.focusUnitPrice}
              />
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
          </div>:null}
          {this.state.expense_type === "NORMAL"?
          <div>
            <CheckBox 
            onChange={()=> this.onChangeText("new_party",!this.state.new_party)}
            value={this.state.new_party}
            mb={8}
            mt={-8}
            title="New Party"
            />
            <div className='fl'>
              {this.state.new_party?
              <CInput 
                title="Party Name"
                fl
                onChange={(a) => this.onChangeText("party_name",a)}
                value={this.state.party_name}
                onEnterPress={this.focusItemItemname2}
                focus={call => this.focusPartyInput = call}
              />:
              <SearchPicker
                title="Party"
                list={this.props.party.parties.data}
                AddSelect
                onChange={(a)=> this.onChangeText("party",a)}
                err={this.state.e_party}
                onEnterPress={this.focusItemItemname2}
                value={this.state.party}
                focus={call => this.focusPartyPicker = call}
                fl

              />}
              <CInput
                title="Date"
                fl
                onChange={(a) => this.onChangeText("date",a)}
                value={this.state.date}
                date
                ml={8}
                onEnterPress={this.focusItemItemname2}
              />
              <div style={{flex:1}} />
              </div>
          <div className='fl'>
            
                <CInput
                title="Description"
                fl
                onChange={(a) => this.onChangeText("item",a)}
                value={this.state.item}
                err={this.state.e_item}
                focus={call => this.focusItemItemname2 = call}
                onEnterPress={this.focusAmount}

              />
               <CInput
                title="Amount"
                number
                fl
                ml={8}
                onChange={(a) => this.onChangeText("amount",a)}
                value={this.state.amount}
                err={this.state.e_amount}
                focus={call => this.focusAmount = call}
                onEnterPress={this.onNormalAdd}
              />
             
              <div style={{flex:1}}>
                <Btn
                  wi={100}
                  ml={8}
                  mt={25}
                  title="ADD"
                  style={{height:38}}
                  onClick={this.onNormalAdd}
                
                />
              </div>
          </div>
          </div>
          :null}

          </div>
        </div>


			<CTable 
                fields= {itemsfileds}
                list={this.state.items.length?[...this.state.items,{item:"Total",amount:this.state.total,totalRow:true}]:[]}
                title=  {this.state.expense_type === "NORMAL"?"":"ITEMS"}
                hide_Search
                hide_pagination
                custome={{
                  "slno":(item,index)=> <th  scope="row">{item.totalRow?"":(index + 1)}</th>,
                  "item":(item,index)=> <th style={{fontWeight:item.totalRow?"bold":"normal"}}  scope="row">{item.item}</th>,
                  "amount":(item,index)=> <th style={{fontWeight:item.totalRow?"bold":"normal"}}  scope="row">{item.amount}</th>,
                  "date":(item,index)=> <th  scope="row">{item.totalRow?"":get_date(item.date)}</th>,
                  "party":(item,index)=> <th  scope="row">{item.party?.name}</th>,
                  
                }}
			/>
        <div className='col-xl-12'>
          <div className='card' style={{padding:16}}>
            <div className='fl'>
              <div style={{flex:1}}>
                <Btn
                  wi={100}
                  ml={8}
                  title="SUBMIT"
                  style={{height:38}}
                  onClick={this.onSubmit}
                
                />
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
export default connect(mapStateToProps,{Get_Parties,Get_Accounts,Get_Works})(Page);
