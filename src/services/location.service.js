import LocationModel from '../models/Location.js';


export const createLocationService = async (data) => {
    try{

        const location = new LocationModel(data);
        await location.save();
        return location.toJSON();
    }catch(error){
        throw new Error(`Error Creating Location: ${error.message}`);
    }
}


export const getLocationService = async () => { 
  try {
    const locations = await LocationModel.find();

    // Check empty result
    if (locations.length === 0) {
      throw new Error("No locations found");
    }

    // Convert mongoose documents to plain JSON
    const locationList = locations.map(loc => loc.toJSON());

    return locationList;

  } catch (error) {
    throw new Error(`Error Getting Locations: ${error.message}`);
  }
};
