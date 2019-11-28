const axios = require('axios');
import ROUTER from "router";

export default {
    user: null,
    registeredUser: [],
    courses: [],
    setUser(user) {
        this.user = user
    },

    register(username, email, password) {
        var data = {
            username: username,
            email: email,
            password: password
        }
        axios.post('http://localhost:3000/users', data)
            .then(function (response) {
                localStorage.setItem("user", username)
                ROUTER.push('/dashboard')
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    login(email, password) {
        var data = {
            email: email,
            password: password
        }
        axios.post('http://localhost:3000/login', data)
            .then(function (response) {
                localStorage.setItem("user", email)
                console.log(response.data.part.partneredId)
                if(response.data.user == null && response.data.part.partneredId != null){
                    ROUTER.push('/dashboardPartneredUser');
                }else if(response.data.user != null){
                    ROUTER.push('/dashboard');
                }
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        return null
    },
    logout() {
        this.user = null
        ROUTER.push('/login')
    },
    addCourse(course, year, schedule, room, teacher) {
        this.courses.push({
            course: course,
            year: year,
            schedule: schedule,
            room: room,
            teacher: teacher,
        });
        // var p = JSON.parse(JSON.stringify(this.courses))
        // console.log(p)
    },
    save(username, email, password) {
        for (let i = 0; i < this.registeredUser.length; i++) {
            this.registeredUser[i].username = username,
                this.registeredUser[i].email = email,
                this.registeredUser[i].password = password
        }
        // alert('Update Succesfully!')
        // var p = JSON.parse(JSON.stringify(this.registeredUser))
        // console.log(p)
        ROUTER.push('/personalInformation')
    },
    // removeCourse(course, year, schedule, room, teacher){

    // }

}