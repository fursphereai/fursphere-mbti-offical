import { supabase } from '@/app/lib/supabase';
import React, { useRef, useState } from 'react';
import { SurveyData } from '@/app/types/survey';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';

interface ImageUploadProps {
  updateAnswer: (category: keyof SurveyData, subCategory: any | null, field: string, value: string | File) => void;
  surveyData: SurveyData;
}


const ImageUpload: React.FC<ImageUploadProps> = ({ updateAnswer, surveyData }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

 
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
    
      
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
        // Create a safe filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        // Upload to Supabase storage
        const { data, error: uploadError } = await supabase.storage
        .from('pet-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });


        console.log('fileName', fileName);
  

        if (uploadError) {
          throw uploadError;
        }

        if (!data?.path) {
          throw new Error('Upload failed - no path returned');
        }

        // Get public URL
        // const { data: { publicUrl } } = supabase.storage
        //   .from('pet-photos')
        //   .getPublicUrl(fileName);
        const {data: { publicUrl } } = supabase.storage
          .from('pet-photos')
          .getPublicUrl(fileName);

        if (!publicUrl) {
          throw new Error('Failed to get public URL');
        }

        // Update state with the public URL
        updateAnswer('pet_info', null, 'PetPhoto', URL.createObjectURL(file));
        updateAnswer('pet_info', null, 'PetPublicUrl', publicUrl);
        console.log('publicUrl', publicUrl);


      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error appropriately
      }
    }
  };



  return (
    <div className="flex flex-col">
      <label
        className=" relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] flex items-center justify-center cursor-pointer
        border border-[1px] border-[#717680] rounded-[20px] bg-white
        font-[Inter] text-[#27355D] hover:border-[#FFC542] hover:bg-[#F9F9F9]
        transition-all duration-200 ease-in-out"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded-[15px]"
          />
        ) : (
          <div className="text-center">
            <span className="text-3xl text-[#717680]">+</span>
            <p className="text-[#717680] mt-2 text-sm">Add image</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          style={{ width: '50px', height: '50px' }} 
        />
        {imageUrl && (
        <div className="absolute top-[5px] left-[160px] w-[32px] h-[32px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M15.9996 1.77783C13.1867 1.77783 10.437 2.61195 8.09813 4.17471C5.7593 5.73747 3.9364 7.95867 2.85995 10.5574C1.78351 13.1562 1.50186 16.0158 2.05063 18.7747C2.59939 21.5335 3.95393 24.0677 5.94294 26.0567C7.93196 28.0457 10.4661 29.4002 13.225 29.949C15.9838 30.4978 18.8434 30.2161 21.4422 29.1397C24.041 28.0632 26.2622 26.2403 27.8249 23.9015C29.3877 21.5627 30.2218 18.8129 30.2218 16.0001C30.2218 12.2281 28.7234 8.61061 26.0562 5.94342C23.389 3.27624 19.7715 1.77783 15.9996 1.77783Z" fill="#5777D0"/>
        <path d="M22.8614 21.8152C22.8614 21.5079 22.7399 21.2132 22.5236 20.996L17.6309 16.064L22.6622 11.0255C22.7693 10.9179 22.8543 10.7902 22.9122 10.6496C22.9702 10.509 23 10.3584 23 10.2062C23 10.0541 22.9702 9.90339 22.9122 9.76282C22.8543 9.62225 22.7693 9.49452 22.6622 9.38694C22.5551 9.27935 22.428 9.194 22.2881 9.13578C22.1482 9.07755 21.9982 9.04758 21.8468 9.04758C21.6953 9.04758 21.5454 9.07755 21.4055 9.13578C21.2655 9.194 21.1384 9.27935 21.0313 9.38694L16 14.4418L10.9687 9.32959C10.7524 9.1123 10.4591 8.99023 10.1532 8.99023C9.84737 8.99023 9.55404 9.1123 9.33777 9.32959C9.1215 9.54687 9 9.84157 9 10.1489C9 10.4561 9.1215 10.7508 9.33777 10.9681L14.3691 16.064L9.4764 21.0123C9.36931 21.1199 9.28436 21.2477 9.22641 21.3882C9.16845 21.5288 9.13863 21.6795 9.13863 21.8316C9.13863 21.9838 9.16845 22.1344 9.22641 22.275C9.28436 22.4156 9.36931 22.5433 9.4764 22.6509C9.58348 22.7585 9.71061 22.8438 9.85053 22.902C9.99044 22.9603 10.1404 22.9902 10.2918 22.9902C10.4433 22.9902 10.5933 22.9603 10.7332 22.902C10.8731 22.8438 11.0002 22.7585 11.1073 22.6509L16 17.7189L20.8927 22.6345C21.109 22.8518 21.4023 22.9738 21.7082 22.9738C22.014 22.9738 22.3073 22.8518 22.5236 22.6345C22.7399 22.4172 22.8614 22.1225 22.8614 21.8152Z" fill="white"/>
        </svg>
       </div>
       )}
      </label>
      
    </div>
  );
};

export default ImageUpload;
