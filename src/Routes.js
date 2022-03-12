import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./user/SignIn";
import DepartmentList from "./admin/department/DepartmentList";
import DepartmentFormAdd from "./admin/department/Form/DepartmentFormAdd";
import DepartmentFormEdit from "./admin/department/Form/DepartmentFormEdit";
import UserList from "./admin/user/UserList";
import NotFound from "./pages/NotFound";
import UserAddForm from "./admin/user/Form/UserAddForm";
import UserEditForm from "./admin/user/Form/UserEditForm";
import DepartmentDetail from "./admin/department/DepartmentDetail";
import Invoice from "./admin/department/_printf/Invoice";
import BillModal from "./admin/department/BillModal";
import BillEditForm from "./admin/department/BillEditForm";
import ServiceList from "./admin/service/ServiceList";
import ServiceFormAdd from "./admin/service/Form/ServiceFormAdd";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Switch>
          <PrivateRoute>
            <Route exact path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/admin/department">
              <DepartmentList />
            </Route>
            <Route exact path="/admin/department/add">
              <DepartmentFormAdd />
            </Route>
            <Route exact path="/admin/department/edit/:id">
              <DepartmentFormEdit />
            </Route>
            <Route exact path="/admin/user">
              <UserList />
            </Route>
            <Route exact path="/admin/user/add">
              <UserAddForm />
            </Route>
            <Route exact path="/admin/user/edit/:id">
              <UserEditForm />
            </Route>
            <Route exact path="/admin/department/detail/:id">
              <DepartmentDetail />
            </Route>
            <Route exact path="/admin/department/modal/:id">
              <BillModal />
            </Route>
            <Route exact path="/admin/department/modaledit/:id">
              <BillEditForm />
            </Route>
            <Route exact path="/admin/department/invoice">
              <Invoice />
            </Route>
            {/* Service */}
            <Route exact path="/admin/service">
              <ServiceList />
            </Route>
            <Route exact path="/admin/service/add">
              <ServiceFormAdd />
            </Route>
            
          </PrivateRoute>

        </Switch>
        <Route exact path="*" component={NotFound} />
      </Switch>

    </Router>
  );
};

export default Routes;
