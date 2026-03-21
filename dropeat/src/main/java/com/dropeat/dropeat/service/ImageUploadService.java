package com.dropeat.dropeat.service;

import com.dropeat.dropeat.io.FoodRequest;
import com.dropeat.dropeat.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageUploadService {

    String uploadImage(MultipartFile file);

    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFoods(String id);

    boolean deleteFiles(String filename);

    void deleteFood(String id);
}