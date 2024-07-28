import React, {ChangeEvent, useState} from "react";
import "../assets/styles/card.css"

interface CardProps {
    avatar_url: string;
    id: string;
    login: string;
    editMode: boolean;
    selectedProfiles: string[]
    setSelectedProfiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const Card: React.FC<CardProps> = ({ avatar_url, id, login, editMode, selectedProfiles, setSelectedProfiles }) => {

    // handleSingleCheck updates the profiles selection state
    const handleSingleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedProfiles((prevSelection) => {
            if (prevSelection.find((profile) => profile === id)) {
                return prevSelection.filter((profile) => profile !== id)
            } else {
                return [...prevSelection, id]
            }
        })
        
        e.target.checked = !e.target.checked
    }

    return (
        <div className="profile-card">
            <div className="profile-content">
                <input 
                    type='checkbox' 
                    checked={selectedProfiles.includes(id)}
                    className={`${editMode ? "visible" : "unseen"}`} 
                    onChange={(e) => handleSingleCheck(e)}
                />
                
                <div>
                    <div className="profile-avatar">
                        <img src={avatar_url} alt={`${login}'s avatar`} />
                    </div>

                    <p className="profile-identity">
                        { id } <br/>
                        <span title={ login }>{ login }</span>
                    </p>

                    <button>View profile</button>
                </div>
            </div>
        </div>
    )
}

export default Card;