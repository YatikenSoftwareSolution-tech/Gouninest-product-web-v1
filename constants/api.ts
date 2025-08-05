import { fetchApi } from "@/utils/fetchApi";

export const fetchLocationCountInCountries = async () => {
    try {
        const response = await fetchApi("/properties/countries");
        if (response) {
            return response;
        }
    } catch (err) {
        console.error("Failed to fetch location count in countries:", err);
        return [];
    }
};

export const fetchPropertiesCountInLocations = async () => {
    try {
        const response = await fetchApi("/properties/all-cities");
        return response;
    } catch (err) {
        console.error("Failed to fetch cities:", err);
        return [];
    }
};

export const fetchTopProperties = async () => {
    try {
        const response = await fetchApi("/properties/top-by-country");
        return response;
    } catch (err) {
        console.error("Error in fetchTopProperties:", err);
        return [];
    }
};

export const fetchImages = async () => {
    try {
        const response = await fetchApi('/city-images');
        return response;
    } catch (err) {
        console.error("Failed to fetch properties:", err);
        return [];
    }
}

export const fetchUniversities = async () => {
    try {
        const response = await fetchApi('/university')
        return response;
    } catch (err) {
        console.log(err)
        return [];
    }
}

export const fetchPropertyById = async (id: string) => {
    try {
        const response = await fetchApi(`/properties/${id}`);
        return response;
    } catch (err) {
        console.error("Failed to fetch property by ID:", err);
        return null;
    }
};
