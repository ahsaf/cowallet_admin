import logo from './logo.svg';
// import './App.css';
import {get_user,Post} from './services/services';
import { Update_user } from './actions/user';
import LayoutScreen from './pages/layout/layoutscreen';
import "./HTML/assets/css/icons.css";
import "./HTML/assets/css/style.css"
import "./HTML/assets/css/skin-modes.css"
import "./HTML/assets/css/sidemenu.css"
import "./HTML/assets/css/animate.css"
import "./HTML/assets/plugins/mscrollbar/jquery.mCustomScrollbar.css"
import "./HTML/assets/plugins/sidebar/sidebar.css";
import "./HTML/assets/plugins/owl-carousel/owl.carousel.css";
import "./HTML/assets/plugins/multislider/multislider.css";
import "./HTML/assets/plugins/select2/css/select2.min.css";
import "./HTML/assets/plugins/amazeui-datetimepicker/css/amazeui.datetimepicker.css";
import "./HTML/assets/plugins/jquery-simple-datetimepicker/jquery.simple-dtpicker.css";
import "./HTML/assets/plugins/pickerjs/picker.min.css";
import "./HTML/assets/plugins/spectrum-colorpicker/spectrum.css";
import "./styles/commonStyles.css";
import 'react-toastify/dist/ReactToastify.css';


import { useState ,useEffect} from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Switch ,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import './pages/css/style.css'

//routes
import Login from './pages/login/loginscreen';
import Home from './pages/home/homescreen';
import ProjectList from './pages/project/projectlist';
import EmployeeList from './pages/employees/employeeslist';
import PartyList from './pages/party/partylist';
import AddProject from './pages/project/addproject';
import SingleProject from './pages/project/singleproject';
import SingleEmployee from './pages/employees/singleemployee';
import SingleParty from './pages/party/singleparty';
import SingleExpense from './pages/party/singleexpense';
import AccountsList from './pages/accounts/accountslist';
import SingleAccount from './pages/accounts/singleAccount';
// import ExpenseList from './pages/expenses/expenselist';
import AddExpense from './pages/expenses/addExpense';
import Attendencelist from './pages/attandence/attendencelist';
import AddAttendence from './pages/attandence/addattendece';
import Dashboard from './pages/dashboard/dashboard';
import UserList from './pages/administration/userslist';
import AdminsList from './pages/superadmin/adminslist';
import Addadmin from './pages/superadmin/addAdmin';
import Paymentslist from './pages/payments/paymentslist';
import Payout from './pages/payments/payout';
import Payin from './pages/payments/payin';
import CustomersList from './pages/customers/customerslist';
import SingleCustomer from './pages/customers/singlecustomer';
import SingleSale from './pages/customers/singlesale';
import CommonListPage from './pages/common/listPage';
import NotFoundPage from './pages/common/NotFound';
import ToolsList from './pages/tools/toolsList';
import PaymentReceit from './pages/payments/paymentReceit';
import InventoryList from './pages/inventory/inventorylist';
import AddInventory from './pages/inventory/addinventory';
import Depositlist from './pages/deposit/depositlist';
import SingleDeposit from './pages/deposit/singleDeposit';
import ReportsList from './pages/reports/reportsList';
import LabourWorkReport from './pages/reports/labourWorkReport';
import ExpenseReport from './pages/reports/expenseReport';
import AddsingleAttendance from './pages/attandence/addsingleAttendance';
import AddsaleNew from './pages/sales/addsaleNew';
import AddSingleExpense from './pages/expense/addsingleExpense';
import SingleExpenseNew from './pages/expense/singleExpenseNew';
import PaymentOutNew from './pages/payments/paymentOutNew';
import CashInNew from './pages/payments/cashinNew';
import ProfilePage from './pages/profile/profilePage';
import EditTransaction from './pages/payments/editTransaction';
import EditExpense from './pages/expense/updateExpense';
import ExpenseList from './pages/expense/expenseList';
import SalesList from './pages/sales/salesList';
import PurchaseList from './pages/expense/purchaseList';
import WorkOrderList from './pages/work_order/workOrderList';
import AddWorkOrder from './pages/work_order/addWorkOrder';
import PrivacyPolicy from './pages/administration/privacyPolicy';



// import "./HTML/assets/plugins/bootstrap/js/bootstrap.bundle.min.js";


function App() {
	const [initial,Setinitial] = useState("aa");
	// useEffect(()=>{
	//   get_user((user) => {
	// 	if (user) {
	// 	  console.log(user)
		//   Post("/user/checklogin",{
		// 	  id:user.uid,
		// 	  token:user.token
		//   },(st,res)=>{
		// 	if(st){
		// 	  if(res.status === "Success"){
		// 		store.dispatch(
		// 		  Update_user({...res,token:user.token}),
		// 		);
		// 		Setinitial('Bottom');
		// 	  }else{
		// 		 Setinitial('Loginstack');
		// 	  }
		// 	}else{
		// 	  Setinitial('Loginstack');
		// 	}
		//   })
	// 	} else {
	// 	  Setinitial('Loginstack');
	// 	  alert("sdas")
	// 	  console.log(props.history)
	// 	}
	//   })
	// });

  return (
	<Provider store={store}>

    <div className="App">
	{/* <body class="main-body bg-light"> */}
		{initial === "loading"?
		 <div id="global-loader"> 
			 <img src="./HTML/assets/img/loaders/loader-4.svg" className="loader-img" alt="Loader" />
		 </div>
		 :null}
		   		    <Switch >
						<Route exact path='/login'   render={(props) => <Login {...props} />}  />
						<Route exact path='/privacy-policy'  render={(prop) => <PrivacyPolicy {...prop} />} />
						<Route path='/' 
							render={(props) => {
								return (<LayoutScreen {...props}>
								<Switch>
								<Route exact path='/dashboard'  render={(prop) => <Dashboard {...prop} />} />
									<Route exact path='/projects' render={(prop) => <ProjectList {...prop} />} />
									<Route exact path='/employees' render={(prop) => <EmployeeList {...prop} />} />
									<Route exact path='/parties' render={(prop) => <PartyList {...prop} />} />
									<Route exact path='/add-project' render={(prop) => <AddProject {...prop} />} />
									<Route exact path='/project/:id'  render={(prop) => <SingleProject {...prop} />} />
									<Route exact path='/employee/:id'  render={(prop) => <SingleEmployee {...prop} />} />
									<Route exact path='/party/:id'  render={(prop) => <SingleParty {...prop} />} />
									<Route exact path='/customer/:id'  render={(prop) => <SingleCustomer {...prop} />} />
									<Route exact path='/purchase/:id'  render={(prop) => <SingleExpense {...prop} />} />
									<Route exact path='/sale/:id'  render={(prop) => <SingleExpense {...prop} />} />
									<Route exact path='/sale/:id'  render={(prop) => <SingleSale {...prop} />} />
									<Route exact path='/orders'  render={(prop) => <WorkOrderList {...prop} />} />
									<Route exact path='/accounts'  render={(prop) => <AccountsList {...prop} />} />
									<Route exact path='/account/:id'  render={(prop) => <SingleAccount {...prop} />} />
									<Route exact path='/expenses'  render={(prop) => <ExpenseList {...prop} />} />
									<Route exact path='/purchase'  render={(prop) => <PurchaseList {...prop} />} />
									<Route exact path='/add-purchase'  render={(prop) => <AddsaleNew  {...prop} isSale={false} />} />
									<Route exact path='/add-sale'  render={(prop) => <AddsaleNew  {...prop} isSale={true} />} />
									<Route exact path='/add-order'  render={(prop) => <AddWorkOrder  {...prop} isSale={true} />} />
									<Route exact path='/attendance'  render={(prop) => <Attendencelist {...prop} />} />
									<Route exact path='/add-attendance'  render={(prop) => <AddAttendence {...prop} />} />
									<Route exact path='/add-expense'  render={(prop) => <AddSingleExpense {...prop} />} />
									<Route exact path='/expense'  render={(prop) => <ExpenseList {...prop} />} />
									<Route exact path='/administration'  render={(prop) => <UserList {...prop} />} />
									<Route exact path='/admins'  render={(prop) => <AdminsList {...prop} />} />
									<Route path='/add-admin'  render={(prop) => <Addadmin {...prop} />} />
									<Route exact path='/entries'  render={(prop) => <Paymentslist {...prop} />} />
									<Route exact path='/out'  render={(prop) => <PaymentOutNew {...prop} />} />
									<Route exact path='/customers'  render={(prop) => <CustomersList {...prop} />} />
									<Route exact path='/in'  render={(prop) => <CashInNew {...prop} />} />
									<Route exact path='/tools'  render={(prop) => <ToolsList {...prop} />} />
									<Route exact path='/sales'  render={(prop) => <SalesList {...prop} />} />
									<Route exact path='/inventories'  render={(prop) => <InventoryList {...prop} />} />
									<Route exact path='/deposits'  render={(prop) => <Depositlist {...prop} />} />
									<Route exact path='/deposit/:id'  render={(prop) => <SingleDeposit {...prop} />} />
									<Route exact path='/add-inventory'  render={(prop) => <AddInventory {...prop} />} />
									<Route exact path='/reports'  render={(prop) => <ReportsList {...prop} />} />
									<Route  path='/AddSingleAttendance'  render={(prop) => <AddsingleAttendance {...prop} />} />
									<Route exact path='/labourWorkReport'  render={(prop) => <LabourWorkReport {...prop} />} />
									<Route exact path='/expenseReport'  render={(prop) => <ExpenseReport {...prop} />} />
									<Route exact path='/profile'  render={(prop) => <ProfilePage {...prop} />} />
									<Route exact path='/edit-transaction'  render={(prop) => <EditTransaction {...prop} />} />
									<Route exact path='/edit-expense'  render={(prop) => <EditExpense {...prop} />} />
									<Route exact path='/paymentReceit/:id'  render={(prop) => <PaymentReceit {...prop} />} />
									<Route exact path='/expense/:id'  render={(prop) => <SingleExpenseNew {...prop} />} />
									<Route exact path='/project/:id/expenses'  render={(prop) => <CommonListPage {...prop} />} />
									<Route exact path='/project/:id/purchases'  render={(prop) => <CommonListPage {...prop} />} />
									<Route exact path='/project/:id/sales'  render={(prop) => <CommonListPage {...prop} />} />
									<Route exact path='/project/:id/labour'  render={(prop) => <CommonListPage {...prop} />} />
								
									<Route exact path='*'   render={(props) => <NotFoundPage {...props} />}  />
							   </Switch>
						   </LayoutScreen>)	
							} } />
						<Route exact path='*'   render={(props) => <NotFoundPage {...props} />}  />
		 			</Switch>
      
	
	
		<script src="./HTML/assets/plugins/jquery/jquery.min.js"></script>
		<script src="./HTML/assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
		<script src="./HTML/assets/plugins/ionicons/ionicons.js"></script>
		<script src="./HTML/assets/plugins/jquery-sparkline/jquery.sparkline.min.js"></script>
		<script src="./HTML/assets/plugins/moment/moment.js"></script>
		<script src="./HTML/assets/js/eva-icons.min.js"></script>
		<script src="./HTML/assets/plugins/rating/jquery.rating-stars.js"></script>
		<script src="./HTML/assets/plugins/rating/jquery.barrating.js"></script>
		<script src="./HTML/assets/js/custom.js"></script>
		<script src="./HTML/assets/plugins/jquery-ui/ui/widgets/datepicker.js"></script>
		<script src="./HTML/assets/plugins/jquery.maskedinput/jquery.maskedinput.js"></script>
		<script src="./HTML/assets/plugins/spectrum-colorpicker/spectrum.js"></script>
		<script src="./HTML/assets/plugins/select2/js/select2.min.js"></script>
		<script src="./HTML/assets/plugins/pickerjs/picker.min.js"></script>
		<script src="./HTML/assets/js/form-elements.js"></script>
		<script src="./HTML/assets/js/script.js"></script>




	{/* </body> */}
    </div>
	<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
        
        />
	</Provider>
  );
}

export default App;
