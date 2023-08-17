// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState, useEffect, useCallback } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import "./FindPlace.css";
import { SearchInput } from "../../components/SearchInput/SearchInput";

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
    photo_reference: string;
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
  const [googlePhotos, setGooglePhotos] = useState<Array<string>>([]);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState<null | string>(null);

  // Load the map
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  // handle requesting user location via browser prompt.
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

  // For Google Places Search
  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
        try {
          const url = `${apiUrl}/search/location/${query}`;

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
    const fetchPlacePhoto = async (photoRef: string) => {
      try {
        const url = `${apiUrl}/photo/location/${photoRef}`;

        const fetchConfig = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          // get response.text because no json, returns as string
          const photoData = await response.text();
          // remove double quotes from base64 encoded string
          const formattedData = photoData.replace(/"/g, "");
          return formattedData;
        } else {
          console.log("Error fetching place photo:", response.statusText);
          setError("Error fetching place photo");
        }
      } catch (error) {
        console.log("Error:", error);
        setError("Error fetching data");
      }
    };

    const fetchAllPhotos = async (photos: Array<Promise>) => {
      //TODO: add try catch
      const response = await Promise.all(photos);
      setGooglePhotos(response);
    };

    if (selectedPlaceDetails?.photos?.length > 0) {
      const allPhotos = selectedPlaceDetails.photos?.slice(0, 4);
      const photoPromises = allPhotos?.map((photo) => {
        return fetchPlacePhoto(photo.photo_reference);
      });

      fetchAllPhotos(photoPromises);
    }
  }, [selectedPlaceDetails?.photos, selectedPlaceDetails?.photos?.length]);

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

  // Select Place Details
  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const url = `${apiUrl}/details/location/${placeId}`;

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

  console.log("googleMap", googleMap);
  console.log("STATE", googlePhotos);
  const searchInputOnChange = (event) => {
    console.log("EVENTTTT", event);
    setQuery(event?.target.value);
    setSelectedPlace(null);
  };
  const getInputResultItemLabel = (item: GooglePlacesResponse) => {
    return item.description;
  };
  const inputResultItemClick = (item: GooglePlacesResponse) => {
    setSelectedPlace(item);
    setQuery("");
    setGoogleResults([]);
    fetchPlaceDetails(item.place_id);
  };

  return (
    <div className="find-places">
      <h1>Find Place Page</h1>
      {error}
      <SearchInput
        inputValue={query || selectedPlace?.description}
        inputLabel="Location:"
        inputPlaceholder="Type address..."
        searchInputOnChange={searchInputOnChange}
        getInputResultItemLabel={getInputResultItemLabel}
        inputResultItemClick={inputResultItemClick}
        inputResultItems={googleResults}
      />
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
          <div className="find-places__photos">
            {googlePhotos.map((photo, i) => {
              return <img key={i} src={`data:image/png;base64,${photo}`} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
