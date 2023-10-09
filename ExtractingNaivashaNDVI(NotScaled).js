// loading the dataset
var dataset =ee.FeatureCollection("FAO/GAUL/2015/level2");

// filtering the dataset based on our region of interest(Nairobi Region)
var Nakuru = dataset.filter(ee.Filter.eq('ADM2_NAME','Nakuru'));
Map.centerObject(Nakuru,10);

//print(Nakuru);

//Creating geometry location for our area of interest
var roi = ee.FeatureCollection(Nakuru).geometry();

//Loading our MODIS data
var collection = ee.ImageCollection("MODIS/061/MOD13A1");
//print(collection);

//Extracting the NDVI Band collection from the collection of MODIS data
var modisNDVI = collection.select('NDVI');

//checking the number of images in the NDVI Band from 2000 - 2023
print(modisNDVI.size());

//Filtering the data based on our year of interest
var filtered_data = modisNDVI.filterDate('2020-01-01','2021-01-01');
print(filtered_data.size());

//Average NDVI
var average_ndvi = filtered_data.reduce(ee.Reducer.mean()).clip(Nakuru);
print(average_ndvi);
var cols ={
  min:0.0,
  max: 8000,
  palette:['ffffff', 'ce7e45', 'df923d', 'f1b555', 'fcd163', '99b718', '74a901',
    '66a000', '529400', '3e8601', '207401', '056201', '004c00', '023b01',
    '012e01', '011d01', '011301']
};
Map.addLayer(average_ndvi,cols);

