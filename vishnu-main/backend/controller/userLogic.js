import nodeMailer from "nodemailer";
import AddBooking from "../db/requestService.js";
import ServiceList from "../db/serviceSchema.js";
import UserBooking from "../db/userBookingdetails.js";
import Login from "../db/userLoginschema.js";
import generateToken from "../utils/createToken.js";
import Register from "../db/userRegister.js";
import feedback from "../db/feedbackModels.js";

// const userMain = async(req, res) => {
//     res.render('user/index')
// }

// Importing List of Services

const serviceList = async (req, res) => {
  try {
    const serviceName = await ServiceList.find();
    
    
    console.log("user dashboard main:", res.locals.user)
    if (!serviceName) {
      console.log("No service added");
    }

    res.render("user/index", { serviceName, user: res.locals.user || ''});
  } catch (error) {
    console.log(error)
  }
};
const loggedIndashboard = async(req, res) => {
  try {
    const serviceName = await ServiceList.find();
    
    console.log("user dashboard:", res.locals.user)
    if (!serviceName) {
      console.log("No service added");
    }

    res.render("user/loggedIndashboard", { serviceName, user: res.locals.user});
  } catch (error) {
    console.log(error)
  }
}

const requestService = async (req, res) => {
  try {
    let success = ''
    const { name, email, service, specialRequest } = req.body;
    
    console.log(name, email, service, specialRequest);
    console.log("locals user name :", res.locals.user._id)
    if (!req.body) {
      alert("Enter all the details");
    }

    const Booking = new AddBooking({
      user_id : res.locals.user._id,
      name: name,
      email: email,
      service: service,
      specialRequest: specialRequest,
    });
    await Booking.save();

    if (!Booking) {
      alert("Details couldn't added");
    }
    let user = res.locals.user
    console.log("user locals :",   user)

    res.render("user/booking-page", { Booking, user});
  } catch (error) {
    console.log("Service couldn't added", error);
  }
};

const confirmBooking = async (req, res) => {
  const { email, name, service, regno, brand, model, phone } = req.body;
  console.log(email, name, service, regno, brand, model, phone);
 
  try {
    const booking = new UserBooking({
      user_id : res.locals.user._id,
      userName: name,
      regno: regno,
      brand: brand,
      model: model,
      userPhoneNumber: phone,
      status: "pending",
      email : email
    });

    await booking.save();

    console.log("Booking Details :\n", booking);

    let transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: `yogesh.5prog@gmail.com`,
        pass: `ovuz qrwq tmjd qqrq`,
      },
    });
    let mailOptions = {
      from: "yogesh.5prog@gmail.com",
      to: email,
      subject: `Bike Service Confirmation`,
      html: `
            
                <div>
                    Dear ${name},<br>
                    I hope this email find you well! <br>
                    Your bike service has been successfully booked  <br>
                    <h2>BIKE DETAILS</h2> <br>
                    <br>
                    Brand : ${brand}<br>
                    Model : ${model}<br>
                    Reg. No : ${regno}<br>
    
                    Our agent will reach you at your doorstep :) <br>
                    <br>
                    Thankyou for choosing our service :)
                </div>
            `,
    };
    mailOptions.contentType = "txt/html";

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("email sent :", info.response);
        res.render("user/booking-confirm", {user : res.locals.user});
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const totalBookings = async(req, res) => {
    const { userId } = req.body
    console.log("User id :", userId)

    try {
      const  bookingDetails = await UserBooking.find({
        user_id : userId
      })
      
    if (!bookingDetails || bookingDetails.length === 0) {
      console.log("No booking details found");
    } else {
      console.log('bookingDetails :', bookingDetails[0]);
    }
     

    res.render('user/bookings', {details : bookingDetails, user : res.locals.user})
    } catch (error) {
      console.log(error)
    }
}

const loginUser = async(req, res) => {
  const { email , password } = req.body


  try {
    const existingUser = await Register.findOne({
      email
    })
    if(existingUser && existingUser.password === password){
      generateToken(res, existingUser._id)
      res.status(200).redirect('/')
    }else{
      res.render('auth/userLogin')
    }

  } catch (error) {
    console.error('Error during login process:', error.message);
    return res.status(500).send('Error during login process');
  }
}

const logout = async(req, res) => {
  res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
  })

  res.status(200).redirect('/')
};


const registerUser = async(req, res) => {
    const {userName, email, password } = req.body
    try {
      
      const existingUser = await Register.findOne({email})
      if(existingUser){
        return res.render('auth/userLogin', { error : "User email already exists"})
      }
  
  
      const newUser = new Register({
        userName,
        email,
        password
      })
      
      await newUser.save()
      if(newUser){
        console.log("User registered successfully")
        return res.render('auth/userLogin', {success : "user registered successfully"})
      }else{
        return res.send("Error Login Process")
      }
   
    } catch (error) {
      console.error('Error during login process:', error.message);
      return res.status(500).send('Error during login process');
    }

}

const LoginPage = async(req, res) => {
  res.render("auth/userLogin")
}

import Rating from '../db/feedbackModels.js'; // Correct path based on your structure (db folder)

const rateMechanic = async (req, res) => {
  try {
    const { mechanicPhone, rating, review } = req.body;
    const userId = res.locals.user._id; // Assuming authenticate middleware sets res.locals.user

    console.log("Rating mechanic:", mechanicPhone, "Rating:", rating, "Review:", review);

    // Validate inputs
    if (!mechanicPhone || !rating) {
      return res.status(400).send("Mechanic phone number and rating are required.");
    }

    // Create new rating entry
    const newRating = new Rating({
      user_id: userId,
      mechanicPhone: mechanicPhone,
      rating: parseInt(rating), // Ensure rating is number
      review: review || "" // Default to empty string if no review given
    });

    // Save the new rating to MongoDB
    await newRating.save();

    // Render success page
    res.render("user/rating-success", { mechanicPhone, rating });

  } catch (error) {
    console.error("Error submitting mechanic rating:", error);
    res.status(500).send("Error rating the mechanic");
  }
};




export { serviceList, requestService, confirmBooking, loginUser, logout, registerUser, LoginPage, loggedIndashboard, totalBookings, rateMechanic };
