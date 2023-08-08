import { useState, useEffect, useCallback } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

import "./FindPlace.css";

interface GooglePlacesResponse {
  description: string
  place_id: string
  reference: string
}

export const FindPlace = () => {
  const [googleResults, setGoogleResults] = useState<Array<GooglePlacesResponse>>([])
  const [selectedPlace, setSelectedPlace] = useState<GooglePlacesResponse | null>(null)
  // This will need to be typed, and set after hitting the Place Details API.
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState({})
  const [query, setQuery] = useState<string>('')
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({lat: 0, lng: 0})
  const [error, setError] = useState<null | string>(null);

  // Load the map
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
  })

  // For Google Places Search
  useEffect (() => {
    if (query.length > 2) {
      const fetchData = async () => {
        try {
          const url = `http://localhost:8000/search/location/${query}`

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
            console.log('Error fetching data:', response.statusText);
            setError('Error fetching data');
          }
        } catch (error) {
          console.log('Error:', error);
          setError('Error fetching data');
        }
      };

      fetchData()
    }
  }, [query])


  useEffect(() => {
    const handleGeolocationSuccess = (position: GeolocationPosition) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleGeolocationError = () => {
      setError('Geolocation not supported or permission denied');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      setError('Geolocation not supported');
    }
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setGoogleMap(map);
  }, [center]);

  const onUnmount = useCallback(() => {
    setGoogleMap(null);
  }, []);
  console.log("SELECTED PLACE", selectedPlace)
  return (
    <div className="find-places">
      <h1>Find Place Page</h1>
      <div className="find-places__search">
        <label>Location:</label>
        <input
          type='text'
          className='form-control'
          id="search-input"
          placeholder='Type address...'
          onChange={(event) => setQuery(event.target.value)}
          value={query || selectedPlace?.description}
        />
      </div>
      <div className="find-places__results">
        {
          googleResults?.map((result, i) => {
            return <p className="find-places__results--item" key={i} onClick={() => {
              setSelectedPlace(result)
              setQuery("")
              setGoogleResults([])
            }}>{result.description}</p>
          })
        }
      </div>
      {
        isLoaded ? (
            <GoogleMap
              mapContainerClassName="find-places__map"
              mapContainerStyle={{
                width: '600px',
                height: '600px'
              }}
              center={center}
              zoom={2}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              { /* Child components, such as markers, info windows, etc. */ }
              <></>
            </GoogleMap>
        ) : <></>
      }
    </div>
  );
};
