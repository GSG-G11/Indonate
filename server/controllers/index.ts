import checkUser from './auth/checkAuth';
import signUp from './auth/signUp';
import login from './auth/login';
import logout from './auth/logout';
import getAllCategories from './categories/getAllCategories';
import reports from './reportsRouter/reports';
import getCampaignById from './compaignRouter/getCampaignById';

export {
  login,
  signUp,
  logout,
  getAllCategories,
  reports,
  getCampaignById,
  checkUser,
};
