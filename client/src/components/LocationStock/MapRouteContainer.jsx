import React from 'react'
import Iframe from 'react-iframe'

export default function MapRouteContainer() {
    let origin = `KR+83+65C+18,Bogota,Colombia`
    let destination = `KR+101+70+14,Bogota,Colombia`
    let waypoints = `Kr91+100`
    return (
        <div>
            <Iframe url={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAWvV27eRWz99D9ILk_vL8ETJWj6LB0e-I&language=es&origin=${origin}&destination=${destination}&waypoints=${waypoints}`}
            width="450px"
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"/>        
        </div>
    )
}
