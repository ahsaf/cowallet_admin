

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Get_Works } from '../../actions/work';
import { Btn, get_date, setNumberFormat, Txt } from '../../components/general';
import ChangePassword from './changePassword';
class Page extends Component {
    constructor(){
      super();
      this.state = {
        work:{},
      }
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = ()=>{
        // let url = this.props.location.pathname;
        // url = url.split('/');
        // if(url && url.length > 1){
        //     Post('/account/singleTransaction',{
        //         id:url[2]
        //     },(st,res)=>{
        //         this.setState({work:res.data,loading:false});
        //     })
        // }
    }
	
 
    render(){
      const s = this.state;
      const user = this.props.user.user?this.props.user.user:{};
      const permissions = this.props.user.permissions;
  return (
     <>
        <div style={{}}>
            <div 
                 ref={ref => this.print_ref = ref}
            className='card' style={{padding:16,marginRight:16}}>
                <div style={{padding:16}}>
                    <div className='fl'>
                        <div className=''>
                            <img style={{width:140,height:140}} src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' />
                        </div>
                        <div className='fldc' style={{flex:1,marginLeft:16}}>
                            <Txt s={24} w="500">{user.name}</Txt>
                            <Txt c="thrd">{permissions.user_role}</Txt>
                            <Txt c="thrd">User Name: {user.username}</Txt>
                            <Txt c="thrd">Cash Balance:  {setNumberFormat(user.balance)}</Txt>
                            <Txt mt={8}>Company Details</Txt>
                            <Txt>{permissions.company_name}</Txt>
                        </div>
                    </div>
                    <Txt c="b" onClick={()=> this.showChangePassword()} underline point  mt={12}>Change Password</Txt>
                </div>
            </div>
        </div>
        <ChangePassword 
          show={call => this.showChangePassword = call}
        />
    </>
  )
}
}
const mapStateToProps =(state) =>{
    return{
      work:state.work,
      user:state.user
    }
  }
export default connect(mapStateToProps,{Get_Works})(Page);
