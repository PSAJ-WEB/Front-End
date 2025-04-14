import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';
import { Router, Routes, Route } from 'solid-app-router';
import LandingPage from './pages/landingpage';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import BlogPage from './pages/blogpage';
import Admin from './pages/adminpage';
import BlogPage25Fashion1 from './pages/blogpage25fashion(1)';
import BlogPage25Fashion2 from './pages/blogpage25fashion(2)';
import BlogPage25Fashion3 from './pages/blogpage25fashion(3)';
import BlogPage25Fashion4 from './pages/blogpage25fashion(4)';
import BlogPage25Fashion5 from './pages/blogpage25fashion(5)';
import BlogPageMixnMatch1 from './pages/blogpagemixnmatch(1)';
import BlogPageMixnMatch2 from './pages/blogpagemixnmatch(2)';
import BlogPageMixnMatch3 from './pages/blogpagemixnmatch(3)';
import BlogPageBehindtheDesign1 from './pages/blogpagebehindthedesign(1)';
import BlogPageBehindtheDesign2 from './pages/blogpagebehindthedesign(2)';
import BlogPageBehindtheDesign3 from './pages/blogpagebehindthedesign(3)';
import BlogPageBehindtheDesign4 from './pages/blogpagebehindthedesign(4)';
import BlogpageEffortlessChic1 from './pages/blogpageeffortlesschic(1)';
import BlogpageEffortlessChic2 from './pages/blogpageeffortlesschic(2)';
import BlogpagePowerAccesories1 from './pages/blogpagepoweraccessories(1)';
import BlogpagePowerAccesories2 from './pages/blogpagepoweraccessories(2)';
import BlogpagePowerAccesories3 from './pages/blogpagepoweraccessories(3)';
import BlogpagePowerAccesories4 from './pages/blogpagepoweraccessories(4)';
import VerificationPage from './pages/verify';
import ProductPage from './pages/productpage';
import Account from './pages/account';
import Address from './pages/address';
import AboutUs from './pages/aboutus';
import Clothes from './pages/clothes';
import Accessories from './pages/accessories';
import History from './pages/history';
import Handbags from './pages/handbags';
import cart from './pages/cart';
import FavoritePage from './pages/FavoritePage';
import Checkout from './pages/CheckoutPage';
import PendingPayment from './pages/PendingPayment';
import SuccesPayment from './pages/SuccesPayment';
import ForgotPassword1 from './pages/forgotpassword1';
import ForgotVerify from './pages/forgotpasswordverify';
import NewPassword from './pages/NewPassword';
import ProductPageDetail from './pages/productpagedetail';
import AddressEmpty from './pages/addressempty';
import HistoryEmpty from './pages/historyempty';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/blogpage',
    component: BlogPage,
  },
  {
    path: '/products',
    component: ProductPage,
  },
  {
    path: '/blogpage/25-fashion-tips-to-instantly-elevate-your-look/1',
    component: BlogPage25Fashion1,
  },
  {
    path: '/blogpage/25-fashion-tips-to-instantly-elevate-your-look/2',
    component: BlogPage25Fashion2,
  },
  {
    path: '/blogpage/25-fashion-tips-to-instantly-elevate-your-look/3',
    component: BlogPage25Fashion3,
  },
  {
    path: '/blogpage/25-fashion-tips-to-instantly-elevate-your-look/4',
    component: BlogPage25Fashion4,
  },
  {
    path: '/blogpage/25-fashion-tips-to-instantly-elevate-your-look/5',
    component: BlogPage25Fashion5,
  },
  {
    path: '/blogpage/mix-n-match-bags-outfits/1',
    component: BlogPageMixnMatch1,
  },
  {
    path: '/blogpage/mix-n-match-bags-outfits/2',
    component: BlogPageMixnMatch2,
  },
  {
    path: '/blogpage/mix-n-match-bags-outfits/3',
    component: BlogPageMixnMatch3,
  },
  {
    path: '/blogpage/behind-the-design/1',
    component: BlogPageBehindtheDesign1,
  },
  {
    path: '/blogpage/behind-the-design/2',
    component: BlogPageBehindtheDesign2,
  },
  {
    path: '/blogpage/behind-the-design/3',
    component: BlogPageBehindtheDesign3,
  },
  {
    path: '/blogpage/behind-the-design/4',
    component: BlogPageBehindtheDesign4,
  },
  {
    path: '/blogpage/effortless-chic/1',
    component: BlogpageEffortlessChic1,
  },
  {
    path: '/blogpage/effortless-chic/2',
    component: BlogpageEffortlessChic2,
  },
  {
    path: '/blogpage/power-of-accessories/1',
    component: BlogpagePowerAccesories1,
  },
  {
    path: '/blogpage/power-of-accessories/2',
    component: BlogpagePowerAccesories2,
  },
  {
    path: '/blogpage/power-of-accessories/3',
    component: BlogpagePowerAccesories3,
  },
  {
    path: '/blogpage/power-of-accessories/4',
    component: BlogpagePowerAccesories4,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/verifyotp',
    component: VerificationPage,
  },
  {
    path: '/clothes',
    component: Clothes,
  },
  {
    path: '/bags',
    component: Handbags,
  },
  {
    path: '/accessories',
    component: Accessories,
  },
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/address',
    component: Address,
  },
  {
    path: '/address/empty',
    component: AddressEmpty,
  },
  {
    path: '/about-us',
    component: AboutUs,
  },
  {
    path: '/history',
    component: History,
  },
  {
    path: '/history/empty',
    component: HistoryEmpty,
  },
  {
    path: '/cart',
    component: cart,
  },
  {
    path: '/favorite',
    component: FavoritePage,
  },
  {
    path: '/checkout/:userId',
    component: Checkout,
  },
  {
    path: '/PendingPayment',
    component: PendingPayment,
  },
  {
    path: '/SuccesPayment',
    component: SuccesPayment,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword1,
  },
  {
    path: '/forgot-password/verify',
    component: ForgotVerify,
  },
  {
    path: '/newpassword',
    component: NewPassword,
  },
  {
    path: '/products/detail/:id',
    component: ProductPageDetail,
  },
  {
    path: '/admin',
    component: Admin,
  }
];
