'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  //process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/kadai2_phase1',
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/secret_board',
  {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: Sequelize.TEXT
  },
  postedBy: {
    type: Sequelize.STRING
  },
  trackingCookie: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.TEXT
  }
}, {
    freezeTableName: true,
    timestamps: true
  });

const BadReport = sequelize.define('BadReport', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  postId: {
    type: Sequelize.INTEGER
  },
  reportedBy: {
    type: Sequelize.STRING
  }
}, {
    freezeTableName: true,
    timestamps: true
  });
  

Post.sync().then(() => {
  BadReport.belongsTo(Post, {foreignKey: 'postId'});
  BadReport.sync();
});



module.exports = Post, BadReport;