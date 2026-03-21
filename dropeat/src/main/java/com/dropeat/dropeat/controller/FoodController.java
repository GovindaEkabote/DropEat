package com.dropeat.dropeat.controller;

import com.dropeat.dropeat.io.FoodRequest;
import com.dropeat.dropeat.io.FoodResponse;
import com.dropeat.dropeat.service.ImageUploadService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    private final ImageUploadService imageUploadService;

    public FoodController(ImageUploadService imageUploadService) {
        this.imageUploadService = imageUploadService;
    }

    @PostMapping
    public ResponseEntity<FoodResponse> addFood(@RequestPart("food") String foodString,
                                                @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request;
        try {
            request = objectMapper.readValue(foodString, FoodRequest.class);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(null);
        }

        FoodResponse response = imageUploadService.addFood(request, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public List<FoodResponse> readFoods(){
        return imageUploadService.readFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse readFod(@PathVariable String id){
        return imageUploadService.readFoods(id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String id){
        imageUploadService.deleteFood(id);
    }

}
