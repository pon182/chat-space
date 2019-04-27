$(document).on('turbolinks:load',function(){


$(function(){
  function appendUser(user){
    var  search_list = $("#user-search-result");

    var html =`
    <div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>
      `
  search_list.append(html)
  }

  // ユーザー検索
  $('#user-search-field').on("keyup", function(){
    // 検索で打ち込まれた要素
    var input = $('#user-search-field').val();
   
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {key_word: input},
      dataType: 'json'
    })


    .done(function(users){
      // 検索した要素を削除
      $("#user-search-result").empty()
      // 検索したユーザー該当が０でなければ下記,else(alert)
        // 打ち込んだ文字が０でなければ,ユーザー取り出し
      if(users.length !==0){
        if(input.length !==0){
          users.forEach(function(user){
            appendUser(user);
          })
          }else{
            ""
          }
        }
        else{
          alert("ユーザー検索に失敗しました")
        }
        })
      
    .fail(function(){
      alert("ユーザー検索に失敗しました")
    })


  
    });


// 追加ボタン
    $(".chat-group-form__search").on("click",'.user-search-add',function(){
// ユーザー追加したら検索欄から削除
      $(this).parent().remove();
    

      var user_id = $(this).data("user-id")
      var user_name = $(this).attr("data-user-name")


      var userAddHtml = `<div class='chat-group-user clearfix js-chat-member' id="${user_id}">
                          <input name="group[user_ids][]" type='hidden' value="${user_id}">
                          <p class='chat-group-user__name'>${user_name}</p>
                          <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                        </div>`
                        $(".chat-group-users").append(userAddHtml)
                        });




// 削除ボタン
    $(".chat-group-users").on("click",".user-search-remove",function(){
      $(this).parent().remove();
    })

});
});