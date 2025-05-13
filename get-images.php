<?php
header('Content-Type: application/json');

// Set the directory path
$directory = 'images/';

// Get all image files
$images = array_filter(scandir($directory), function($file) {
    // Check if file is an image
    $imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    return in_array($extension, $imageExtensions);
});

// Remove . and .. from the array
$images = array_values(array_filter($images, function($file) {
    return $file !== '.' && $file !== '..';
}));

// Return the list of images
echo json_encode($images);
?> 