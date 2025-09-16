//= require signature_pad

const signaturePads = {};

document.addEventListener('DOMContentLoaded', function(){
  var canvas_collection = document.getElementsByClassName("JohnHancock-canvas");
  if (canvas_collection.length >= 1 ){   
    var parent_form = document.getElementById(canvas_collection[0].id).closest("form");

    for (let i = 0; i < canvas_collection.length; i++) {
      var element_id = canvas_collection[i].id;
      var canvas = document.getElementById(element_id);
      var hidden_field = document.getElementById(element_id + "-hidden");
      if (canvas && hidden_field) {
        var signaturePad = new SignaturePad(canvas);
        signaturePads[element_id] = signaturePad;
        function resizeCanvas() {
          let ratio = Math.max(1, 1);
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext("2d").scale(ratio, ratio);
          signaturePad.clear();
        }
        // window.addEventListener("resize", resizeCanvas, true);
        // resizeCanvas();
      }
    }

    parent_form.onsubmit = function () {
      for (let i = 0; i < canvas_collection.length; i++) {
        var element_id = canvas_collection[i].id;
        var canvas = document.getElementById(element_id);
        var hidden_field = document.getElementById(element_id + "-hidden");
        hidden_field.value = signaturePads[element_id].isEmpty()
            ? ""
            : signaturePads[element_id].toDataURL();
      }
    };
  }
}, false);

function signatureClear(element_id) {
  var canvas = document.getElementById(element_id);
  if (canvas && signaturePads[element_id]) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    signaturePads[element_id].clear();
  }
}
