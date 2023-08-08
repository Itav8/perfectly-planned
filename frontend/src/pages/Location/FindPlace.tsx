import { useState, useEffect, useCallback } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

export const FindPlace = () => {
  const [googleResults, setGoogleResults] = useState([])
  const [query, setQuery] = useState('')
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({lat: 0, lng: 0})

  // For Google Maps Search
  useEffect (() => {
    console.log("INSIDE USEEFFECT")
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
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };

      fetchData()
    }
  }, [query])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
  })
  console.log(import.meta.env)
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log("HUH", location)
    }, () => {
      console.log("ERROR MESSAGE")
    });
  } else {
    console.log("Geolocation not supported");
  }

  return (
    <div>
      <h1>Find Place Page</h1>
      <div>
        <label>Location:</label>
        <input
          type='text'
          className='form-control'
          id="search-input"
          placeholder='Type address...'
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div>
        <h2>Places Found:</h2>
        {
          googleResults?.map((result, i) => {
            return <p key={i}>{result.description}</p>
          })
        }
      </div>
      {
        isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                width: '400px',
                height: '400px'
              }}
              center={center}
              zoom={10}
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
