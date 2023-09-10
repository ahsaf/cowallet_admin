

import React, { Component } from 'react';
import { CircularProgress } from "@material-ui/core";
import { get_date, Picker } from './general';

class Page extends Component {
    constructor(){
      super();
      this.state = {
	    
      }
    }
   
    render(){
        const p = this.props;
		const s = this.state;
  return (
     <>
              <div class="col-xl-12">
						<div class="card">
							<div class="card-header pb-0">
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
									
								</div>
							</div>
							<div class="card-body">
								<div class="table-responsive">
									<table class="table mg-b-0 text-md-nowrap">
										<thead>
											<tr>
												{p.fields && p.fields.length?p.fields.map(it =>{
													return(
														<th key={it.key}>{it.title}</th>
													)
												}):null}
											
											</tr>
										</thead>
										<tbody>
												{p.list && p.list.length?p.list.map((itd,i) =>{
													return(
														<tr key={itd.id}  
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
																if(it.key === "slno"){
																	
																	return(
																		<th  scope="row">{itd.tt?"":i+1}</th>
																	)
																}else if(it.key === "date"){
																	return(
																		<td key={it.key}>{get_date(itd.date)}</td>
																	)
																}else{
																	return(
																		<td key={it.key}>{itd[it.key]}</td>
																	)
																}
                                                            }
															
															}):null}
														</tr>
													)
												}):null}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
                  
    </>
  )
}
}

export default Page;
