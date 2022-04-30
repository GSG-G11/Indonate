import checkUser from './auth/checkAuth';
import signUp from './auth/signUp';
import login from './auth/login';
import logout from './auth/logout';
import campaigns from './compaignRouter/campaignes';
import getAllCategories from './categories/getAllCategories';
import reports from './reportsRouter/reports';
import getCampaignById from './compaignRouter/getCampaignById';
import addDonation from './donations/addDonation';
import statistics from './compaignRouter/statistics';

export {
  login,
  signUp,
  logout,
  campaigns,
  getAllCategories,
  reports,
  getCampaignById,
  checkUser,
  addDonation,
  statistics,
};
