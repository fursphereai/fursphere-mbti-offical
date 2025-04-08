export interface SurveyData {
  user_info: {
    name: string;
    email: string;
    ip: string;
    mbti: string;
    test_times: number;
    test_date: string;
    signup: boolean;
    email_signup_time: string;
  };
  pet_info: {
    PetSpecies: string;
    PetBreed: string;
    PetBreedCustom: string;
    PetGender: string;
    PetAge: string;
    PetName: string;
    PetPhoto: string;
    PetPublicUrl: string;
  };
  personality_and_behavior: {
    Energy_Socialization: {
    seek_attention: string;
    friend_visit_behaviors: string;
    react_new_friend: string;
    };
    Routin_Curiosity: {
    interact_with_toys: string;
    fur_care_7days: string;
    react_new_environment: string;   
    };
    Decision_Making: {
    stranger_enter_territory: string;
    react_when_sad: string;
    respond_to_scold: string;   
    };
    Structure_Spontaneity: {
    prefer_routine: string;
    toy_out_of_reach: string;
    follow_commands: string;
    };
  };
} 