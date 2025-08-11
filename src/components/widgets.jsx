import React from 'react';
import './Widgets.scss';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import ScoreboardTwoToneIcon from '@mui/icons-material/ScoreboardTwoTone';
import AnnouncementTwoToneIcon from '@mui/icons-material/AnnouncementTwoTone';
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone';

const Widgetsv = ({ type = "user", value = 0 }) => {
    let data;
    
    // Define widget data based on type
    switch(type) {
        case "Total Teams":
            data = {
                title: "Total Teams",
                icon: <PersonOutlineTwoToneIcon className="icon" />,
            };
            break;
        case "Current Round":
            data = {
                title: "Current Round",
                icon: <ScoreboardTwoToneIcon className="icon" style={{ backgroundColor: 'rgb(101, 39, 71)', color: "white" }} />,
            };
            break;
        case "Active Teams":
            data = {
                title: "Active Teams",
                icon: <QuizTwoToneIcon className="icon" style={{ backgroundColor: 'rgb(27, 26, 94)', color: "white" }} />,
            };
            break;
        case "Feedback":
            data = {
                title: "Feedback",
                icon: <AnnouncementTwoToneIcon className="icon" style={{ backgroundColor: 'rgb(102, 22, 125)', color: "white" }} />,
            };
            break;
        default:
            console.warn(`Unrecognized widget type: ${type}`);
            data = {
                title: "Unknown",
                icon: <div className="icon">?</div>,
            };
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{value}</span>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
};

export default Widgetsv;
