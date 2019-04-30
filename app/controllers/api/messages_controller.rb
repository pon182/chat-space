class Api::MessagesController < ApplicationController
  before_action :get_group
  
  def index
    respond_to do |format| 
      format.json { @messages = @group.messages.where('id > ?',params[:id]) }
    end 
  end

  private
  def get_group
    @group = Group.find(params[:group_id])
  end
end