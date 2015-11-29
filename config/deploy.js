module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'repulator',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
