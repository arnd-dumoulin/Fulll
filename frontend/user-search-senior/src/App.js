import React, { useEffect, useState } from 'react';
import './assets/styles/App.css';
import Card from "./components/Card"
import { FaRegTrashAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

function App() {
  const [editMode, setEditMode] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [rateLimitError, setRateLimitError] = useState("");
  const [selectedProfiles, setSelectedProfiles] = useState([])

  useEffect(() => {
    const fetchAvatar = async (value) => {
      if (value === '') {
        setProfiles([]);
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/search/users?q=${value}`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`
          }
        });

        if (response.status === 403) {
          const rateLimitReset = response.headers.get('X-RateLimit-Reset');
          setRateLimitError(`Rate limit exceeded. Try again at ${new Date(parseInt(rateLimitReset || '0') * 1000).toLocaleTimeString()}`);
          setProfiles([]);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setProfiles(data.items); // Update state with fetched profiles
          setRateLimitError("");
        } else {
          console.error("Failed to fetch");
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const checkbox = document.getElementById("select-partial");
    if (checkbox) {
        if (selectedProfiles.length > 0 && selectedProfiles.length < profiles.length) {
            checkbox.indeterminate = true;
        } else {
            checkbox.indeterminate = false;
            checkbox.checked = selectedProfiles.length === profiles.length && selectedProfiles.length > 0;
        }
    } else {
        console.error("Checkbox not found unexpectedly");
    }
  }, [selectedProfiles, profiles])

  const handleCheck = () => {
    // Determine the new state based on current selection
    if (selectedProfiles.length === 0) {
        setSelectedProfiles(profiles.map((profile) => profile.id));
    } else if (selectedProfiles.length < profiles.length) {
        setSelectedProfiles(profiles.map((profile) => profile.id));
    } else {
        setSelectedProfiles([]);
    }
  }

  return (
    <div id='main'>
      <div>
        <h3>Desktop</h3>
        <h3 onClick={() => setEditMode(!editMode)}>{`Edit mode: ${editMode}`}</h3>
      </div>

      <div className='container'>
        <div className='container-header'>
          <h2>Github Search</h2>
        </div>
        <div className='search-banner'>
          <input 
            type='search'
            placeholder='Search input'
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className={`actions ' + ${editMode ? "visible" : "unseen"}`}>
          <div className='check-all'>
            <input 
              id='select-partial'
              type="checkbox" 
              onClick={() => handleCheck()}
            />{selectedProfiles.length} element{selectedProfiles.length > 1 ? "s" : ""} selected
          </div>

          <div className='icons-actions'>
                <MdContentCopy onClick={() => setProfiles((prevProfiles) => [...prevProfiles, ...prevProfiles.filter((profile) => selectedProfiles.includes(profile.id) )])} />
                <FaRegTrashAlt onClick={() => {
                  setProfiles((prevProfiles) => prevProfiles.filter((profile) => !selectedProfiles.includes(profile.id) ))}
                  setSelectedProfiles((prevSelection) => profiles.map((profile) => ))
                } />
            </div>
        </div>
        
        <div className='page-content'>
          {rateLimitError.length > 0 
            ? <h2>{rateLimitError}</h2>
            : profiles.length > 0 
              ? profiles.map(
                (profile) => <Card 
                  key={`${profile.id}-${Math.floor(Math.random() * 999)}`}
                  {...profile}
                  editMode={editMode} 
                  selectedProfiles={selectedProfiles}
                  setSelectedProfiles={setSelectedProfiles} />
                ) 
              : <h2>0 profile was found</h2>  
          }
        </div>
      </div>
    </div>
  );
}

export default App;
