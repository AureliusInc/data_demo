class TalentManagementApplicantsController < ApplicationController
    require 'csv'

    def index
        @data = ''
        @data += File.read('lib/assets/data/fake_hr_data.csv')
        gon.applicants = @data
    end
end
