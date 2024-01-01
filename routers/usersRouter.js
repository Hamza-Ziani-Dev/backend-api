const express = require("express");
const { 
  getAllUsersCtrl,
  getOneUserCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  profilePhotoUploadCtrl
} = require("../controllers/userController");
const {verifyToken,verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization} = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const router = express.Router();


// /api/users/profile/
router.route("/profile").get(getAllUsersCtrl);

// /api/users/profile/profile-photo-upload
// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(getOneUserCtrl)
  .put(validateObjectId,verifyTokenAndOnlyUser,updateUserCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization,deleteUserCtrl);


module.exports = router;
