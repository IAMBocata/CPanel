import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/LoginComponent'
import Menu from '@/components/MenuComponent'
import NewProduct from '@/components/NewProductComponent'
import NewUser from '@/components/NewUserComponent'
import UserModificationComponent from '@/components/UserModificationComponent'
import NewCategory from '@/components/NewCategoryComponent'
import ProductListComponent from '@/components/ProductListComponent'
import CategoryListComponent from '@/components/CategoryListComponent'
import UserListComponent from '@/components/UserListComponent'
import BuyListComponent from '@/components/BuyListComponent'
import ChangePasswordComponent from '@/components/ChangePasswordComponent'
import ParametersComponent from '@/components/ParametersComponent'
import BIItemsComponent from '@/components/bi/BIItemsComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginComponent',
      component: Login
    },
    {
      path: '/Home',
      name: 'Menu',
      component: Menu
    }, 
    {
      path: '/NewProduct',
      name: 'New Product',
      component: NewProduct
    },
    {
      path: '/Products',
      name: 'Products',
      component: ProductListComponent
    },
    {
      path: '/NewUser',
      name: 'New User',
      component: NewUser
    },
    {
      path: '/Users',
      name: 'Users',
      component: UserListComponent
    },
    {
      path: '/NewCategory',
      name: 'New Category',
      component: NewCategory
    },
    {
      path: '/Categories',
      name: 'Categories',
      component: CategoryListComponent
    },
    {
      path: '/Buys',
      name: 'Buys',
      component: BuyListComponent
    },
    {
      path: '/ChangePassword',
      name: 'Change Password',
      component: ChangePasswordComponent
    },
    {
      path: '/ModifyUser',
      name: 'Modify User',
      component: UserModificationComponent
    },
    {
      path: '/Parameters',
      name: 'Parameters',
      component: ParametersComponent
    },
    {
      path: '/BI',
      name: 'Business Intelligence',
      component: BIItemsComponent
    }
  ]
})
