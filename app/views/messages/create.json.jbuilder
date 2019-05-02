json.content        @message.content
json.user_name      @message.user.name
json.image          @message.image
json.image_url      @message.image.url
json.date           @message.created_at.strftime('%Y-%m-%d %H:%M:%S')
json.group_id       @group.id
json.user_id        @message.user.id

# json.(@message, :content, :image)
# json.date format_posted_time(@message.created_at)
# json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id