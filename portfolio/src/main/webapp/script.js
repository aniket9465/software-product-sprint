// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
comments = [];

updateComments = ()=>{
    var commentsDiv = document.querySelector('#comments');
    commentsDiv.innerHTML =comments.map(function (commentText) {
        return '<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\"><h2 class=\"aboutme\">'+commentText+'</h2></div></div><div class="col-xs-8 line" ><hr></div>';
    }).join('');
}

fetch('/comment')
  .then(response => response.json())
  .then(data =>{ comments = data.map((obj)=>obj.commentText); updateComments()});

$(function() {
    $('#commentForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'comment',
            data:$('#commentForm').serialize(),
        });
        comments = [$('#commentBox')[0].value,...comments];
        updateComments();
        $('#commentForm')[0].reset();
        return false;
    }); 
})