package com.dropeat.dropeat.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dropeat.dropeat.entity.FoodEntity;
import com.dropeat.dropeat.io.FoodRequest;
import com.dropeat.dropeat.io.FoodResponse;
import com.dropeat.dropeat.repository.FoodRepository;
import com.dropeat.dropeat.service.ImageUploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ImageUploadServiceImpl implements ImageUploadService {

    private final FoodRepository foodRepository;
    private final Cloudinary cloudinary;

    public ImageUploadServiceImpl(FoodRepository foodRepository, Cloudinary cloudinary) {
        this.foodRepository = foodRepository;
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadImage(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of());
            return uploadResult.get("secure_url").toString(); // use secure_url for HTTPS

        } catch (Exception e) {
            // Include original exception so you can see the root cause
            throw new RuntimeException("Image upload failed: " + e.getMessage(), e);
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {

        FoodEntity newFoodEntity = convertToEntity(request);

        String imageUrl = uploadImage(file);
        newFoodEntity.setImageUrl(imageUrl);

        newFoodEntity = foodRepository.save(newFoodEntity);

        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();
        return databaseEntries.stream().map(object  -> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFoods(String id) {
        FoodEntity foodEntity = foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food Not Found for this id"+ id));
        return convertToResponse(foodEntity);
    }

    @Override
    public boolean deleteFiles(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils .emptyMap());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFoods(id);
        String imageUrl =response.getImageUrl();
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        boolean ifFileDeleted = deleteFiles(filename);
        if(ifFileDeleted){
            foodRepository.deleteById(response.getId());
        }
    }

    private FoodEntity convertToEntity(FoodRequest request){
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity){
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .price(entity.getPrice())
                .category(entity.getCategory())
                .build();
    }
}