class UsersController < ApplicationController
    def index
      @users = User.where('name LIKE(?)', "%#{params[:key_word]}%").where.not(id: current_user)

      respond_to do |format|
        format.html 
        format.json
      end      
    end

    def edit
    end

    def update
        if current_user.update(users_params)
            redirect_to root_path
          else
            render :edit
          end
    end

    private

    def users_params
        params.require(:user).permit(:name,:email)
    end


end
