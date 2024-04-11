const mongoose = require('mongoose');

async function connect (){
try {
    await mongoose.connect('mongodb+srv://thaops:0933243805Asus@appshop.rasnfgy.mongodb.net/ASM02');
    console.log("ket noi thanh cong")
} catch (error) {
    console.log("ket noi khong thanh cong")
}
}
module.exports ={connect}
