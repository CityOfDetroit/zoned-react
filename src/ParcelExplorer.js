import "./css/app.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddressSearch from "./components/AddressSearch.js";
import Details from "./components/Details";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Map from "./components/Map";
import StreetView from "./components/StreetView";

const SidebarFooter = () => {
  return (
    <div className="absolute">
      Hey
    </div>
  )
}

const ParcelExplorer = () => {
  // get the parcel ID from the URL
  let { pid } = useParams();

  // screen size hooks: we need to change behavior for mobile/etc
  const breakpoint = 640;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [mobile, setMobile] = useState(width < breakpoint);

  // app state
  const [parcel, setParcel] = useState(pid ? pid : null);
  const [coords, setCoords] = useState(null);
  const [map, setMap] = useState(true);
  const [showSv, setSv] = useState(false);
  const [svCoords, setSvCoords] = useState(null);
  const [svBearing, setSvBearing] = useState(null);
  const [showInfo, setInfo] = useState(mobile ? false : true)
  const [showSearch, setSearch] = useState(mobile ? false : true)
  const [showSatellite, setSatellite] = useState(false)

  // Roll our own media-query hook:
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className={!mobile ? "App" : "MobileApp"}>
      <Header {...{setSearch, showSearch, showInfo, setInfo, setParcel, showSv, setSv, showSatellite, setSatellite, mobile}}>
        {showInfo && <Introduction {...{setInfo, showInfo}}/>}
        {showSearch && <AddressSearch {...{ parcel, setParcel, setCoords, setSearch, showSearch }} />}
      </Header>
      <div id="sidebar">
      {showSv && (
        <StreetView {...{ coords, width, height, setSvBearing, setSvCoords }} />
        )}
        {parcel && <Details {...{ parcel, setCoords, mobile }} />}
        <SidebarFooter />
      </div>
      <div className="map-view">

      {((mobile && map) || !mobile) && (
        <Map {...{ parcel, setParcel, width, coords, svCoords, svBearing, showSv, showSatellite }} />
        )}

      </div>
    </div>
  );
};

export default ParcelExplorer;
