import signUp from './auth/signUp';
import login from './auth/login';
import logout from './auth/logout';
import campaigns from './compaignRouter/campaignes';
import getAllCategories from './categories/getAllCategories';
import reports from './reportsRouter/reports';
import getCampaignById from './compaignRouter/getCampaignById';

export {
  login,
  signUp,
  logout,
  campaigns,
  getAllCategories,
  reports,
  getCampaignById,
};
