'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: "MONGOHQ_URL=mongodb://heroku:_9bpy9OwAL6qumP6cGHgDU5CkDMk8aOCP2cjCKvzDpXBt2-jyvat2jjYuuhX-JV3i4-mxtFlO2fxR6c5DD-5uA@kahana.mongohq.com:10037/app27193061" ||
      process.env.MONGOHQ_URL ||
      'mongodb://localhost/todo'
  }
};