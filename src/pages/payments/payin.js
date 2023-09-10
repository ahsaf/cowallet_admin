

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Get_Expenses } from '../../actions/party';
import { Get_Customers } from '../../actions/customer';
import { Get_Accounts } from '../../actions/accounts';
import { Get_Works } from '../../actions/work';
import CTable from '../../components/Ctable';
import { Btn, CInput, Picker, Txt,HAND_ACCOUNT, get_error_string, CheckBox, get_date  } from '../../components/general';
import { Post } from '../../services/services';
import SearchPicker from '../../components/SearchPicker';
import { CLRS } from '../../components/constants';


class Page extends Component {
    constructor(){
      super();
      this.state = {
        party:{},
        new_party:false,
        expense_type:"NORMAL",
        party_name:"",
        settlement:false,
        e_party:"",
        amount:"",
        e_amount:"",
        project:{},
        e_project:"",
        qty:"",
        e_qty:"",
        item:"",
        e_item:"",
        items:[ ],
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
        this.props.Get_Customers({},()=>{});
        // this.props.Get_Accounts({},()=>{});
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

  onNormalSubmit = ()=>{
    const s = this.state;
    if(s.items.length === 0){
      alert("At least one item required.")
    }else{
    
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
    onNormalAdd = ()=>{
      const s = this.state;
      let e_amount = s.amount && Number(s.amount) > 0?false:"Enter a valid amount";
      let e_item = get_error_string(s.item,"Description",1);
      if(e_amount || e_item ){
        this.setState({e_item,e_amount});
      }else{
        this.setState({loading:true});
          let item = {
              item:s.item,
              amount:Number(s.amount),
              date:this.state.date?new Date(this.state.date):new Date(),
              id:Math.random(),
              party:s.new_party?s.party_name?{name:s.party_name}:{}:s.party&&s.party.id &&s.party.id !== "Select"?s.party:{},
              settlement:s.settlement
              }
              Post("/expense/payreceived",item,(st,res)=>{
                if(st){
                  this.setState({loading:false,amount:"",qty:"",item:"",e_item:"",e_amount:"",e_qty:""});
                  // Tost("Expense Saved Successfully");
                  if(s.new_party){
                    this.focusPartyInput();
                  }else{
                    this.focusPartyPicker();
                  }
                }else{
                  // Tost(Tost_Massages.wrong);
                }
              })
             
      }
    }


    onSelectPicker = (value,field,stateField,list)=>{
      let item = list.find(li => li[field] === Number(value));
      console.log(item)
      this.setState({[stateField]:item});
    }
    
    
   
  
    render(){
    //   let itemsfileds = [{title:"SL NO",key:"slno"},{title:"Item",key:"item"},{title:"Amount",key:"amount"},{title:"Quantity",key:"qty"},{title:"Total",key:"total"}];
    //   if(this.state.expense_type === "NORMAL"){
    //     itemsfileds = [{title:"SL NO",key:"slno"},{title:"Date",key:"date"},{title:"Party",key:"party"},{title:"Description",key:"item"},{title:"Amount",key:"amount"}];
    //   }
  return (
     <>
        <div style={{}}>
          <div className='col-xl-12'>
          <div className='card' style={{}}>
           
              <div className='fl' style={{marginBottom:16,backgroundColor:CLRS.GREEN,overflow:"hidden",alignItems:"center",borderRadius:"6px 6px 0px 0px"}} >
              <h4  class="card-title mg-b-2 mt-3 ml-3 mb-3" style={{flex:1,color:"#FFFFFF"}}>Received</h4>
               
              </div>
           
       
          <div style={{padding:16}}>
          
            <div className='fl' style={{alignItems:"flex-end"}} >
                <div style={{flex:1}}>
                    <div className='fl'>
                    <CheckBox 
                            onChange={()=> this.onChangeText("new_party",!this.state.new_party)}
                            value={this.state.new_party}
                            mb={8}
                            mt={-8}
                            title="New Customer"
                            /> 
                            {(this.state.new_party && this.state.party_name) || (!this.state.new_party && this.state.party.id && this.state.party.id !== "Select") ?
                    <CheckBox 
                            onChange={()=> this.onChangeText("settlement",!this.state.settlement)}
                            value={this.state.settlement}
                            mb={8}
                            mt={-8}
                            ml={16}
                            title="Settlement"
                    />:null}
                    </div>
                    {this.state.new_party?
              <CInput 
                title="Customer Name"
                onChange={(a) => this.onChangeText("party_name",a)}
                value={this.state.party_name}
                onEnterPress={this.focusItemItemname2}
                focus={call => this.focusPartyInput = call}
              />:
              <SearchPicker
                title="Customer"
                list={this.props.customer.customers.data}
                AddSelect
                onChange={(a)=> this.onChangeText("party",a)}
                err={this.state.e_party}
                onEnterPress={this.focusItemItemname2}
                value={this.state.party}
                focus={call => this.focusPartyPicker = call}
                fl

              />}
                </div>
             
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
                title="Amount Received"
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
                  title="SUBMIT"
                  style={{height:38}}
                  onClick={this.onNormalAdd}
                
                />
              </div>
          </div>
          </div>
          </div>
        </div>


			{/* <CTable 
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
			/> */}
        {/* <div className='col-xl-12'>
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
        </div> */}
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
export default connect(mapStateToProps,{Get_Customers,Get_Accounts,Get_Works})(Page);
