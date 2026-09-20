const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
const nodemailer = require("nodemailer");

const app = express()
const PORT = process.env.PORT || 5000

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}_${file.originalname}`
      cb(null, fileName)
    }
  })
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const mongoUrl = 'mongodb://Jerlingoldrina:1234@ac-on2yun0-shard-00-00.wylqmmp.mongodb.net:27017,ac-on2yun0-shard-00-01.wylqmmp.mongodb.net:27017,ac-on2yun0-shard-00-02.wylqmmp.mongodb.net:27017/University?ssl=true&replicaSet=atlas-1463wx-shard-0&authSource=admin&appName=Cluster0'

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('MongoDB Connected Successfully')
  })
  .catch((error) => {
    console.log('MongoDB Connection Error:', error)
  })


const studentSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  gender: String,
  dob: String,
  email: String,
  password: String,
  course: String,
  city: String,
  phone: String,
  profileImage: String
})

const Student = mongoose.model('Student', studentSchema)

app.post('/api/students', upload.single('profileImage'), async (req, res) => {
    try{
    console.log('[POST /api/students] headers:', req.headers)
    console.log('[POST /api/students] body:', req.body)
    console.log('[POST /api/students] file:', req.file)

    const { firstname,lastname,gender,dob, email,password, course, city, phone } = req.body

    if (!firstname ||!lastname || !gender|| !dob || !email || !password ||!course || !city || !phone) {
      return res.status(400).json({
        message: 'Please fill all fields'
      })
    }

    const student = new Student({
      firstname,
      lastname,
      gender,
      dob,
      email,
      password,
      course,
      city,
      phone,
      profileImage: req.file ? `/uploads/${req.file.filename}` : ''
    })
    console.log('Student object:',Student)
    await student.save()

     const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jerlingoldrinaj3@gmail.com",
        pass: "xhzn mfxa qbro tqyh"
      }
    });

    const mailOptions = {
      from: "jerlingoldrinaj3@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
      text: `Registration Successful

      Name : ${req.body.name}
      Email : ${req.body.email}
      Password : ${req.body.password}
      `
    };

    await transporter.sendMail(mailOptions);

     
    res.status(201).json({
      message: 'Student Saved Successfully',
      student
    })
  } catch (error) {
    console.error('[POST /api/students] error:', error)

    res.status(500).json({
      message: 'Server Error While Saving Student',
      error: error.message
    })
  }
})

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find()

    res.status(200).json(students)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Error Fetching Students'
    })
  }
})

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

    if (!student) {
      return res.status(404).json({
        message: 'Student Not Found'
      })
    }

    res.status(200).json(student)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Error Fetching Student'
    })
  }
})

app.put('/api/students/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const { firstname,lastname,gender,dob, email,password, course, city, phone } = req.body

    const updateData = {
      firstname,
      lastname,
      gender,
      dob,
      email,
      password,
      course,
      city,
      phone
    }

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true
      }
    )

    if (!updatedStudent) {
      return res.status(404).json({
        message: 'Student Not Found'
      })
    }

    res.status(200).json({
      message: 'Student Updated Successfully',
      updatedStudent
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Error Updating Student'
    })
  }
})

app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)

    if (!deletedStudent) {
      return res.status(404).json({
        message: 'Student Not Found'
      })
    }

    res.status(200).json({
      message: 'Student Deleted Successfully'
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Error Deleting Student'
    })
  }
})


app.get('/', (req, res) => {
  res.send('Student Management Backend Running')
})


app.listen(PORT, () => {
  console.log(
    `Server Running On http://localhost:${PORT}`
  )
})

