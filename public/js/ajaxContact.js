function saveContact() {
  // javascript object.
  var data = {};
  data["email"] = $("#email").val();
  data["name"] = $("#name").val();
  data["content"] = $("#content").val();
  $.ajax({
    url: "/contact",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(data),
    
    dataType: "json",
    success: function(jsonResult) {
      alert("Send Message Successfully!");
    },
    error: function (jqXhr, textStatus, errorMessage) { // error callback 
          
    }
  });
}