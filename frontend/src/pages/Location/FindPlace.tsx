import { useState, useEffect, useCallback } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

import "./FindPlace.css";

interface GooglePlacesResponse {
  description: string;
  place_id: string;
  reference: string;
}

interface GooglePlaceDetails {
  current_opening_hours: Record<string, boolean | Array<string | object>>;
  formatted_address: string;
  formatted_phone_number: string;
  name: string;
  price_level: number;
  rating: number;
  photos: Array<{
    height: number;
    width: number;
    html_attributions: Array<string>;
  }>;
  website: string;
  user_rating_total: number;
  wheelchair_accessible_entrance: boolean;
  reviews: Array<{
    author_name: string;
    author_url: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }>;
  geometry: {
    location: { lat: number; lng: number };
  };
}

export const FindPlace = () => {
  const [googleResults, setGoogleResults] = useState<
    Array<GooglePlacesResponse>
  >([]);
  const [selectedPlace, setSelectedPlace] =
    useState<GooglePlacesResponse | null>(null);
  // This will need to be typed, and set after hitting the Place Details API.
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<
    Partial<GooglePlaceDetails>
  >({});
  const [query, setQuery] = useState<string>("");
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState<null | string>(null);

  // Load the map
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
  });

  // For Google Places Search
  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
        try {
          const url = `http://localhost:8000/search/location/${query}`;

          const fetchConfig = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
          const response = await fetch(url, fetchConfig);

          if (response.ok) {
            const data = await response.json();
            setGoogleResults(data.predictions);
          } else {
            console.log("Error fetching data:", response.statusText);
            setError("Error fetching data");
          }
        } catch (error) {
          console.log("Error:", error);
          setError("Error fetching data");
        }
      };
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const handleGeolocationSuccess = (position: GeolocationPosition) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleGeolocationError = () => {
      setError("Geolocation not supported or permission denied");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setGoogleMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(() => {
    setGoogleMap(null);
  }, []);

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const url = `http://localhost:8000/details/location/${placeId}`;

      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const placeDetails = await response.json();
        setSelectedPlaceDetails(placeDetails.result);
        setCenter({
          lat: placeDetails.result.geometry.location.lat,
          lng: placeDetails.result.geometry.location.lng,
        });
      } else {
        console.log("Error fetching place details:", response.statusText);
        setError("Error fetching place details");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Error fetching data");
    }
  };

  return (
    <div className="find-places">
      <h1>Find Place Page</h1>
      <div className="find-places__search">
        <label>Location:</label>
        <input
          type="text"
          className="form-control"
          id="search-input"
          placeholder="Type address..."
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectedPlace(null);
          }}
          value={query || selectedPlace?.description}
        />
      </div>
      <div className="find-places__results">
        {googleResults?.map((result, i) => {
          return (
            <p
              className="find-places__results--item"
              key={i}
              onClick={() => {
                setSelectedPlace(result);
                setQuery("");
                setGoogleResults([]);
                fetchPlaceDetails(result.place_id);
              }}
            >
              {result.description}
            </p>
          );
        })}
      </div>
      <div className="find-places__dashboard">
        {isLoaded ? (
          <GoogleMap
            mapContainerClassName="find-places__map"
            mapContainerStyle={{
              width: "600px",
              height: "600px",
            }}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
        <div>
          <p>{selectedPlaceDetails?.name}</p>
          <p>{selectedPlaceDetails?.formatted_address}</p>
          <p>{selectedPlaceDetails?.formatted_phone_number}</p>
          <p>{selectedPlaceDetails?.rating}</p>
          <p>{selectedPlaceDetails?.user_rating_total}</p>
          <a href={selectedPlaceDetails?.website} target="_blank">
            {selectedPlaceDetails?.website}
          </a>
        </div>
      </div>
    </div>
  );
};
