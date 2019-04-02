
var activeTabUrl; 

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  activeTabUrl = tabs[0].url;
});

function findSimilarDomain(){
  var matches = activeTabUrl.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];
 
  var url = "https://api2.dofo.com/domain/similar/" + domain;
  var myDiv = document.getElementById("app");

 fetch(url).then(function (response){
    response.json().then(function(post){
      var output;
      for(var i = 0; i < post.length; i++){

         output += `<li class="list-group-item d-flex justify-content-between align-items-center"> ${post[i].domain}
                  <span class="badge badge-primary badge-pill"><a style="color: #fff; padding: 4px;" href="${post[i].affiliate}" target="_blank">Buy Now</a></span>
         </li>`;

      }

      myDiv.innerHTML = output;
  })
}).catch(function (err){
  alert("err");
}) 
}

document.addEventListener('DOMContentLoaded', function() {
  var findSimilar = document.getElementById('findSimilar');
  findSimilar.addEventListener('click', function() {
    findSimilarDomain();
  });
});