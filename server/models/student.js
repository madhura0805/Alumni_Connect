
  const StudentSchema =new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,

        },
        email:
        {
            type:String,
            required:true

        },
        password:
        {
            type: String, 
            required: true 
        },
        reg_no:
        {
            type:String,
            required:true,
            unique:true
        },
        department:
        {
            type:String,
            required:true
        }
    }
  )
  const Student=new mongoose.Schema("Student",StudentSchema);

  export default Student;