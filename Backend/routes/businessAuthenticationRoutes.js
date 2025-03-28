const express = require('express');
const { 
    handleBusinessPersonSignup, 
    handleBusinessPersonSignin, 
    handleBusinessPersonforgotPassword, 
    handlebusinessPersonResetPassword,
    selectBusiness,
    updateBusinessProfile,
    updateBusinessSocialLinks,
    updateProfilePicture,
    updateBusinessStats,
    addTeamMember,
    removeTeamMember,
    followBusinessPerson,
    unfollowBusinessPerson,
    sendConnectionRequest,
    removeConnection,
    getFollowers,
    getConnections
} = require('../controllers/businessControllers');

const { authenticateUser } = require('../middlewares/authentication'); // Middleware to authenticate users

const router = express.Router();

// Authentication routes
router.post('/signup', handleBusinessPersonSignup);
router.post('/signin', handleBusinessPersonSignin);
router.post('/forgot-password', handleBusinessPersonforgotPassword);
router.post('/reset-password/:id/:token', handlebusinessPersonResetPassword);

// Business profile and selection
router.post('/select-business', authenticateUser, selectBusiness);
router.put('/update-profile', authenticateUser, updateBusinessProfile);
router.put('/update-social-links', authenticateUser, updateBusinessSocialLinks);
router.put('/update-profile-picture', authenticateUser, updateProfilePicture);
router.put('/update-business-stats', authenticateUser, updateBusinessStats);

// Team management
router.post('/add-team-member', authenticateUser, addTeamMember);
router.delete('/remove-team-member', authenticateUser, removeTeamMember);

// Follow & Unfollow routes
router.post('/follow', authenticateUser, followBusinessPerson);
router.post('/unfollow', authenticateUser, unfollowBusinessPerson);

// Connection management
router.post('/connect', authenticateUser, sendConnectionRequest);
router.delete('/disconnect', authenticateUser, removeConnection);
router.get('/followers/:userId', authenticateUser, getFollowers);
router.get('/connections/:userId', authenticateUser, getConnections);

module.exports = router;
