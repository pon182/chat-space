$(function (){
  function buildHTML(message){
    var addImage = message.image_url == null ?  "" : `<img src= "${message.image_url}"  class = "lower-message__image" alt="">` 
    console.log(message.image)

    var html =`<div class ="group__comment">
                <strong>
                  ${message.user_name}
                </strong>
                <div class="comment__date">
                   ${message.date}
                </div>
                <div class="comment__text">
                  <p>${message.content}</p>
                  ${addImage}
                </div>
              </div>`
    return html;

  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    $('.body-right--main').animate({scrollTop: $('.body-right--main')[0].scrollHeight}, 'fast');
   
    var formData = new FormData(this);
    var href = window.location.href
    

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
});