// Public Controllers
import checkUser from './auth/checkAuth';
import signup from './auth/signup';
import login from './auth/login';
import logout from './auth/logout';
import getFilteredCampaigns from './public/campaigns/getFilteredCampaigns';
import getAllCategories from './public/categories/getAllCategories';
import createReport from './public/reports/createReport';
import getCampaignById from './public/campaigns/getCampaignById';
import addDonation from './public/donations/addDonation';
import getStatistics from './public/statistics/getStatistics';

// Admin Controllers
import createCampaign from './admin/campaigns/createCampaign';
import deleteCampaign from './admin/campaigns/deleteCampaign';
import updateCampaign from './admin/campaigns/updateCampaign';
import getAllCampaigns from './admin/campaigns/getAllCampaigns';
import addFamiliesForCampaign from './admin/campaigns/addFamiliesForCampaign';
import getDonorsForCampaign from './admin/campaigns/getDonorsForCampaign';

import deleteDonor from './admin/donors/deleteDonor';
import updateDonor from './admin/donors/updateDonor';
import getAllDonors from './admin/donors/getAllDonors';
import getCampaignsForDonor from './admin/donors/getCampaignsForDonor';

import createFamily from './admin/families/createFamily';
import deleteFamily from './admin/families/deleteFamily';
import updateFamily from './admin/families/updateFamily';
import getAllFamilies from './admin/families/getAllFamilies';
import getCampaignsForFamily from './admin/families/getCampaignsForFamily';
import getFamiliesForCampaign from './admin/campaigns/getFamiliesForCampaign';

import deleteReport from './admin/reports/deleteReport';
import getAllReports from './admin/reports/getAllReports';

export {
  login,
  signup,
  logout,
  getFilteredCampaigns,
  getAllCategories,
  createReport,
  getCampaignById,
  checkUser,
  addDonation,
  deleteFamily,
  deleteDonor,
  updateDonor,
  createFamily,
  getDonorsForCampaign,
  deleteCampaign,
  getAllFamilies,
  createCampaign,
  updateFamily,
  addFamiliesForCampaign,
  getCampaignsForDonor,
  getAllDonors,
  deleteReport,
  updateCampaign,
  getCampaignsForFamily,
  getFamiliesForCampaign,
  getAllCampaigns,
  getAllReports,
  getStatistics,
};
