import { http } from 'winston';
import sequelize, { DataTypes } from '../config/database';
import HttpStatus from 'http-status-codes';
import { where } from 'sequelize';
const User = require('../models/user')(sequelize, DataTypes);

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

//create new user
export const newUser = async (body) => {
  const checkUser = await User.findOne({
    where:{
      email : body.email
    }
  })
console.log(checkUser);
  if (checkUser == null) {
    // console.log("not found");
    const data = await User.create(body);
    return {
      code: HttpStatus.CREATED,
      data : data, 
      message : "User created Successfully!"
    }
  }
  return {
    code: HttpStatus.CREATED,
    data : [], 
    message : "User Already exists"
  }
};

//update single user
export const updateUser = async(id, body) => {
  const checkUser = await User.findOne({
    where : {
      id : id
    }
  })
  if(checkUser == null){
    return{
      code : HttpStatus.NOT_FOUND,
      data : [],
      message : "User not found"
    }
  }

  await User.update (body,{
    where : {
      id : id
    }
  })

  const updatedUser = await User.findOne({
    where : {
      id : id
    }
  })
  return {
    code : HttpStatus.OK,
    data : updatedUser,
    message : "User got updated Successfully!!"
  }
}

//delete single user
export const deleteUser  = async(id) => {
  const checkUser = await User.findOne({
    where : {
      id : id
    }
  })
  console.log(checkUser);
  if(checkUser== null){
    return{
      code: HttpStatus.NOT_FOUND,
      data: [],
      message: "No User Found"
    }
  }
  await User.destroy({
    where : {
      id : id
    }
  })
  return {
    code : HttpStatus.OK,
    data : [],
    message : "User deleted Successfully!"

  }
}

//get single user
export const getUser = async (id) => {
  const data = await User.findOne({
    where : {
      id : id
    }
  })
  if(data == null){
    return {
      code : HttpStatus.NOT_FOUND,
      data : [],
      message : "No User found"
    }
  }
  return {
    code : HttpStatus.OK,
    data : data,
    message : "User details fetched successfully"
  }
};
