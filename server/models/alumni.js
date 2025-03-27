
const AlumniSchema =new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
        },
        email:
        {
            type:String,
            required:true,
            unique:true

        },
        password:
        {
            type: String, 
            required: true 
        },
        yoe:
        {
            type:Number,
            
        },
        currentJobProfile:
        {
            type:String,
        },
        currentCompany:
        {
            type:String,
            required:true

        },
        linkedinUrl: {
            type: String,
            required: true,
            unique: true, // Ensures no duplicate LinkedIn URLs
            validate: {
              validator: function (value) {
                return /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(value);
              },
              message: "Please enter a valid LinkedIn profile URL",
            },
        },
        graduationYear:
        {
            type: Number,
            required: true,
        },
        higherEduDegree:
        {
            type:String
        },
        higherEduUniversity:
        {
            type:String
        },
        internshipCompany:
        {
            type:String,
            required: true,
        },
        internshipRole:
        {
            type:String,
            required: true,
        }
    }
  )
  const Alumni=new mongoose.Schema("Alumni",AlumniSchema);

  export default Alumni;