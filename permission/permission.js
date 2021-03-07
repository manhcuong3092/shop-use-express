module.exports.checkPermission = function(permissions, requirePemission){
  var check = permissions.find(function(permission){
    return permission === requirePemission;
  });
  return check;
}