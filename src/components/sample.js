

import React, { Component } from 'react';

class Page extends Component {
    constructor(){
      super();
      this.state = {
   
      }
    }
    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value,msg:''});
      }
    render(){

  return (
     <>
        <div>

        </div>
    </>
  )
}
}

export default Page;
