const { verifyAccess } = require("./logic");
const students = require("./student");

function authenticate(request, response, next) {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(401).send("Authorization missing");
  }

  //To do Said in class
 try {
    const user_metadata = verifyAccess(token);

      console.log("Token:", token)
    console.log("Decoded:", user_metadata)
    console.log("Students:", students)

    console.log(`Authorizing user ${JSON.stringify(user_metadata)}`);

    if (request.originalUrl == "/admin/dashboard") {
      if (user_metadata.role == "admin") {
        next();
      } else {
        response.status(401).send("User with insufficient permissions");
      }
    } if (request.originalUrl == "/dashboard") {
        if ( user_metadata.role == "student") {
            next()
    //   const student = students.filter(
    //     (stu) => stu.email == user_metadata.email && stu.access == true
    //   );

    //   if (student.length > 0) {
    //     next();
    //   } else {
    //     response.status(401).send("User with insufficient permissions");
    //   }
    } else {
        response.status(401).send("User with insufficient permissions");
      }
  }} catch (error) {
    response.send(error);
  }

// Done in class
//   try {
//     const user_metadata = verifyAccess(token);

//       console.log("Token:", token)
//     console.log("Decoded:", user_metadata)
//     console.log("Students:", students)

//     console.log(`Authorizing user ${JSON.stringify(user_metadata)}`);

//     if (request.originalUrl == "/admin/dashboard") {
//       if (user_metadata.role == "admin") {
//         next();
//       } else {
//         response.status(401).send("User with insufficient permissions");
//       }
//     } else {
//       const student = students.filter(
//         (stu) => stu.email == user_metadata.email && stu.access == true
//       );

//       if (student.length > 0) {
//         next();
//       } else {
//         response.status(401).send("User with insufficient permissions");
//       }
//     }
//   } catch (error) {
//     response.send(error);
//   }
}

module.exports = { authenticate };