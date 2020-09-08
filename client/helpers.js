//const client = require('./client');

module.exports = {
    isNotEmpty: function (inputs) {
    for (const inputFieldName in inputs) {
        if (inputs[inputFieldName].toString().trim() === "") {
          //alert(`${inputFieldName} must be filled out`);
          return false;
        }
      } 
      return true;
    }
} 

