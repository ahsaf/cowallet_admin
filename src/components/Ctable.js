

import React, { Component } from 'react';
import { CircularProgress } from "@material-ui/core";
import { CInput, get_date, Picker, setNumberFormat } from './general';
let timer;
class Page extends Component {
    constructor(){
      super();
      this.state = {
		searchText:"",
		currentLimt:"10"
      }
    }
	onSearchType = (tx)=>{
		this.setState({searchText:tx});
		clearTimeout(timer);
		timer = setTimeout(()=>{
			this.props.onFetch({
				limit:this.state.currentLimt,
				search_text:this.state.searchText
			});
		},500)
	}
	onSelectLimt = (e)=>{
		this.setState({currentLimt:e.target.value});
		this.props.onFetch({
			limit:e.target.value,
			search_text:this.state.searchText
		});
	}
	onPaginate = (tx)=>{
		
		const data = this.props.data?this.props.data:{};
		let pagenumber = 0;
		if(tx === "NEXT"){
			if(data.next_page_number){
				pagenumber = data.next_page_number;
			}
		}else if(tx === "PREVIOUS"){
			if(data.previous_page_number){
				pagenumber = data.previous_page_number;
			}
		}else if(tx){
			pagenumber = tx;
		}
		if(pagenumber){
			this.props.onFetch({
				limit:this.state.currentLimt,
				page_number:Number(pagenumber),
				search_text:this.state.searchText
			});
		}
	}

    render(){

        const p = this.props;
		const s = this.state;

		const data = this.props.data?this.props.data:{};
		const dataStartCount =data.total_count?((data.page_number - 1) * Number(this.state.currentLimt)) + 1:1;
		const paginationArray = [];
		for(var i = 0; i < data.last_page_number ; i++ ){
			paginationArray.push(i+1)
		};
  return (
     <>
              <div class="col-xl-12" style={p.con_style}>
						<div class="card">
							<div class="card-header pb-0">
							{p.headerComponent?<p.headerComponent />:null}
								<div class="d-flex justify-content-between">
									<h4  class="card-title mg-b-2 mt-2" style={{flex:1}}>{p.title}</h4>
								
									<i  class="mdi mdi-dots-horizontal text-gray"></i>
									{p.filter_list?
									<Picker 
									list={p.filter_list}
									onSelect={p.onFilter}
									hide_error
									/>
									:null}
									{p.addBtn?
									<button 
									onClick={p.onAddClick} 
									style={{width:150	}}
									class="btn btn-secondary btn-block">
										{s.loading?<CircularProgress 
										size={16} style={{ color: "#fff" }}
										/>:p.addBtn}
								</button>
								
									:null}
									{p.on_view_all_press?
									<label className='point viewAllLabel' onClick={p.on_view_all_press}>View All {">"}</label>
									:null}
									
								</div>
							</div>
							{p.headerComponent2?<p.headerComponent2 />:null}
			{/* Header 2 */}
			{p.hide_Search?null:
							<div class="card-header pb-0">
								<div class="d-flex justify-content-between" style={{alignItems:"center"}}>
									
									
									<CInput 
										value={s.searchText}
										onChange={this.onSearchType}
										placeholder="Search"
									
									/>

									<select value={this.state.currentLimt} onChange={this.onSelectLimt} class="form-control select2" style={{width:150,marginTop:-16}}>
										<option>5</option>
										<option>10</option>
										<option>50</option>
										<option>100</option>
										<option>500</option>
										<option>1000</option>
									</select>
									
								</div>
							</div>}


							<div class="card-body" >
								<div class="table-responsive">
									<table class="table mg-b-0 text-md-nowrap " style={{border:p.boxBorder?"1px rgba(0,0,200,0.2) solid":null}}>
										<thead  >
											<tr >
												{p.fields && p.fields.length?p.fields.map(it =>{
													return(
														<th className={`paddingTop16 ${p.verticalBorder?"leftborder":""}`} key={it.key}>{it.title}</th>
													)
												}):null}
											</tr>
										</thead>
										<tbody>
												{p.list && p.list.length?p.list.map((itd,i) =>{
													let retunrRow = <tr key={itd.id}  
                                                        onClick={() => {
                                                            if(p.onData_CLick){
                                                                p.onData_CLick(itd)
                                                            }}}
                                                        style={{
                                                           cursor:p.onData_CLick?"pointer":"auto" 
                                                        }}
                                                        >
															{p.fields && p.fields.length?p.fields.map(it =>{
                                                             	if(p.custome && p.custome[it.key]){
                                                                    return p.custome[it.key](itd,i);
                                                                }else{
																	let returnCMP = <></>
																if(it.key === "slno"){
																		returnCMP =	<th  scope="row">{itd.tt?"":dataStartCount+i}</th>
																}else if(it.key === "date" || it.date){
																		returnCMP = <td className={`${itd.boldText?"tableBold":""} ${p.verticalBorder?"leftborder":""}`} key={it.key}>{get_date(itd.date)}</td>
																}else if(it.money){
																		returnCMP = <td className={`${itd.boldText?"tableBold":""} ${p.verticalBorder?"leftborder":""}`} key={it.key}>{setNumberFormat(itd[it.key])}</td>
																}
																else{
																	returnCMP =	<td className={`${itd.boldText?"tableBold":""} ${p.verticalBorder?"leftborder":""}`} key={it.key}>{itd[it.key]}</td>
																}
																return returnCMP;
                                                            }
															
															}):null}
														</tr>;
														if(itd.add_blank_top){
															retunrRow = <>
																<tr style={{height:36}}>
																{p.fields && p.fields.length?p.fields.map(it =>{
																	return (
																		<td></td>
																	)
																}):null}
																</tr>
																{retunrRow}
															</>	
														}
														return retunrRow;

												}):<label style={{marginTop:24,textAlign:"center"}}>No data found</label>}
										</tbody>
									</table>
								</div>
								{p.hide_pagination?null:
								<div className='fl' style={{alignItems:"flex-end",marginTop:24}}>
								<p style={{flex:1}}>Showing {dataStartCount} to { dataStartCount?(dataStartCount - 1 + data.current_count):0} of {data.total_count} entries</p>
									<ul className="pagination">
										<li className="page-item "><a className="page-link"   onClick={() => this.onPaginate("PREVIOUS")}><i className="icon ion-ios-arrow-back disabled"></i></a></li>
										{paginationArray.map(it =>{
											return(
												<li className={"page-item" + " " + (data.page_number === it?"active":"")}  ><a  onClick={() => this.onPaginate(it)}  className="page-link">{it}</a></li>
											)
										})}
										<li className="page-item"><a className="page-link" onClick={() => this.onPaginate("NEXT")} ><i className="icon ion-ios-arrow-forward"></i></a></li>
									</ul>
								</div>}
							</div>
												
						
							

						</div>
					</div>
    </>
  )
}
}

export default Page;
