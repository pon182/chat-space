$(document).on('turbolinks:load',function(){
$(function (){
  function buildHTML(message){
    var addImage = message.image_url == null ?  "" : `<img src= "${message.image_url}"  class = "lower-message__image" data-message-img="${message.id}" alt="">` 

    var html =`<div class ="group__comment">
                <strong>
                  ${message.user_name}
                </strong>
                <div class="comment__date">
                   ${message.date}
                </div>
                <div class="comment__text">
                  <p data-message-comment="${message.id}">${message.content}</p>
                </div>
                <div class="comment__image">
                  ${addImage}
                </div
              </div>`
    return html;

  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    $('.body-right--main').animate({scrollTop: $('.body-right--main')[0].scrollHeight}, 'fast');
   
    var formData = new FormData(this);
    var href = window.location.href;
    

    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType:'json',
      processData: false,
      contentType: false,
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.new_message')[0].reset();
      $('.upper-info').append(html);
      $('.form__submit').removeAttr('disabled');
    })

    .fail(function(){
      $('.form__submit').attr('disabled', false);
      alert('テキスト入力')
    })
  });
  



  var reloadMessages = function() {

    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id =$('p:last').data("message-comment")

    var group_id = location.pathname.split('/')[2];
    console.log(group_id)

    
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    
    

    .done(function(messages) {
      messages.forEach(function(message){
        var insertHTML = buildHTML(message);
      $(".upper-info").append(insertHTML);
      $('.body-right--main').animate({scrollTop: $('.body-right--main')[0].scrollHeight}, 'fast');
      })   
    }) 

    .fail(function() {
          console.log('error');
     });
  };
  
  setInterval(reloadMessages, 3000);
});
});