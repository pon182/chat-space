$(function (){
  function buildHTML(message){
    var addContent = message.content !== true ? message.content : null
    var addImage = message.image !== null ?  `<img src= "${message.image_url}"  class = "lower-message__image" alt="">` : ""


    var html =`<div class ="group__comment">
                <strong>
                  ${message.user_name}
                </strong>
                <div class="comment__date">
                   ${message.date}
                </div>
                <div class="comment__text">
                  <p>${addContent}</p>
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
      $('.form__message').val('');
      $(message_image).val('');
      $('.upper-info').append(html);
      $('.form__submit').removeAttr('disabled');
    })

    .fail(function(){
      $('.form__message').val('')
      $('.form__submit').attr('disabled', false);
      alert('テキスト入力')
    })

  });
});