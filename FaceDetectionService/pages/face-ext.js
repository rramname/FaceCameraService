
var gotImage = false;

function login1(){
  
  alert("login 1")

//  window.parent.Getin();
  //window.parent.getElementsByClassName("js-username-field")[0].value="rramname"; 
  //chrome.runtime.sendMessage("cbjbamaladllbhkpcldjbonemjnijcbb", { action: "new message" });
  //chrome.runtime.sendMessage("lifbcibllhkdhoafpjfnlhfpfgnpldfl",{sendBack:true, data:"hello"});
  var data = { type: "FD"};
  window.postMessage(data,"*")
//  window.parent.document.postMessage("hello","http://localhost:3000")
}

function login() {
  
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function (event) {

    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function (rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, 200, 200);
      canvas.toBlob((blb => { this.Detect(blb) }))

    });

    //tracker.stop();
  });

  //  var gui = new dat.GUI();
  //   gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
  //   gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
  //   gui.add(tracker, 'stepSize', 1, 5).step(0.1);
};

function Detect(file) {

  if (gotImage==false) {
    console.log("getting")

    var xmlHttp = new XMLHttpRequest();
    var url = "https://tagtheface.herokuapp.com/getFaceData";
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/octet-stream");
    xmlHttp.send(file);
    xmlHttp.onreadystatechange = function (response) {
      if (this.readyState == 4 && this.status == 200) {
        let face = JSON.parse(this.responseText)
        console.log(face[0])
        if(face[0])
        gotImage=true;

        var xmlHttp = new XMLHttpRequest();
        var url = "https://tagtheface.herokuapp.com/verifyrohit/"+face[0].faceId;
        xmlHttp.open("GET", url, true);
        xmlHttp.setRequestHeader("Content-Type", "application/octet-stream");
        xmlHttp.send();
        xmlHttp.onreadystatechange = function (response) {
          if (this.readyState == 4 && this.status == 200) {
            let identity = JSON.parse(this.responseText)
            console.log(identity)
            var data = { type: "FD"};
            window.postMessage(data,"*")
          }
        }


      }
    }

   // gotImage = true;
  }
}