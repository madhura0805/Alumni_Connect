const router = express.Router();

//alumni signup and login
router.post("alumni/register", registerAlumni);

router.post("alumni/login", loginAlumni);

//to fetch alumni data
router.get("alumni/search", protect, searchAlumni);

router.get("alumni/:id",protect,getAlumniById);

router.get("alumni/", protect, getAllAlumni);

//alumni delets profile
router.delete("/:id", protect, deleteAlumni);

// Alumni profile updates
router.put("/:id", protect, updateAlumniProfile);


