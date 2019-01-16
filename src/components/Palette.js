import React, { Component } from 'react';
import './Palette.css';

const Color = ({ color, active, onClick}) => {
    return (
        <div className={`color ${active && 'active'}`} style={{background: color}} onClick={onClick}></div>
    )
}
const Palette=({colors,selected,onColorChange}) => {
    const colorList=colors.map(x => (<Color color={x} active={selected===x} onClick={()=>onColorChange(x)} key={x}/>));
    return( 
        <div className="palette">
            {colorList}
        </div>
    );
};

export default Palette;